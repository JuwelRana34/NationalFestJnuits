"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { getDb } from "@/core/db/db";

export async function getUserProfile({ id }: { id: string }) {
  "use cache";
  cacheLife("seconds");
  try {
    const { env } = getCloudflareContext();
    const db = drizzle(env.jnu_it_fest_db, { schema });

    if (!id) {
      return { success: false, error: "user not found!" };
    }

    // ৩. DB থেকে ইউজার ডেটা ফেচ
    const userData = await db.query.user.findFirst({
      where: eq(schema.user.id, id),
    });

    if (!userData) {
      return { success: false, error: "User not found in database" };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return { success: false, error: "Failed to fetch data from database" };
  }
}

export async function allRegistrations() {
  try {
    const db = getDb();

    const registrations = await db.query.registration.findMany({
      with: {
        user: {
          columns: {
            name: true,
            email: true,
            phone: true,
            institution: true,
          },
        },
        segment: {
          columns: {
            title: true,
            fee: true,
          },
        },
        team: true,
        payments: true,
      },
    });

    const formattedData = registrations.map((reg) => {
      // পেমেন্ট লিস্ট থেকে সফল পেমেন্টটি খুঁজে বের করা
      const successPayment =
        reg.payments.find((p) => p.status === "SUCCESS") || reg.payments[0];

      return {
        id: reg.id,
        trackingNumber: reg.trackingNumber,
        selectionStatus: reg.selectionStatus,
        category: reg.category,
        createdAt: reg.createdAt,

        // সেগমেন্ট বা ইভেন্টের তথ্য
        eventTitle: reg.segment?.title,
        eventFee: reg.segment?.fee,

        // ইউজারের তথ্য (ইন্ডিভিজুয়াল ইভেন্টের জন্য)
        userInfo: reg.user
          ? {
              name: reg.user.name,
              email: reg.user.email,
              phone: reg.user.phone,
              institution: reg.user.institution,
            }
          : null,

        // টিমের তথ্য (টিম ইভেন্টের জন্য)
        teamInfo: reg.team
          ? {
              teamName: reg.team.teamName,
              teamCode: reg.team.teamCode,
              teamLead: reg.team.creatorId,
            }
          : null,

        // পেমেন্ট তথ্য (Array থেকে Object এ রূপান্তর)
        payment: successPayment
          ? {
              transactionId: successPayment.transactionId,
              amount: successPayment.paidAmount,
              method: successPayment.paymentMethod,
              status: successPayment.status,
            }
          : null,
      };
    });

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "Failed to load registrations" };
  }
}

export async function getUserRegistrations(userId: string) {
  try {
    const db = getDb();

    if (!userId) {
      return { success: false, error: "User ID is required" };
    }

    const userRegistrations = await db.query.registration.findMany({
      where: eq(schema.registration.userId, userId),
      with: {
        segment: {
          columns: {
            title: true,
            date: true,
            time: true,
            venue: true,
            fee: true,
          },
        },
        team: true,
        payments: true,
      },
      // নতুন রেজিস্ট্রেশন আগে দেখানোর জন্য
      orderBy: (registration, { desc }) => [desc(registration.createdAt)],
    });

    const formattedData = userRegistrations.map((reg) => {
      const successPayment =
        reg.payments.find((p) => p.status === "SUCCESS") || reg.payments[0];

      return {
        registrationId: reg.id,
        trackingNumber: reg.trackingNumber,
        status: reg.selectionStatus,
        event: {
          title: reg.segment?.title,
          date: reg.segment?.date,
          venue: reg.segment?.venue,
        },
        // যদি টিম ইভেন্ট হয় তবে মেম্বারদের লিস্ট দেখাবে
        team: reg.team
          ? {
              name: reg.team.teamName,
              code: reg.team.teamCode,
              teamLead: reg.team.creatorId,
            }
          : null,
        paymentStatus: successPayment?.status || "UNPAID",
        paidAmount: successPayment?.paidAmount || 0,
      };
    });

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("User Registration Fetch Error:", error);
    return { success: false, error: "Failed to fetch your registrations" };
  }
}