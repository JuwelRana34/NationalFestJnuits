"use server";

import { getDb } from "@/core/db/db";
import * as schema from "@/core/db/schema";
import { getCurrentUser } from "@/lib/UserSession";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { cacheLife } from "next/cache";

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

// export async function getUserRegistrations() {
//   try {
//     const db = getDb();
//      const currentUser = await getCurrentUser();

//     if (!currentUser?.id) {
//       return { success: false, error: "User ID is required" };
//     }

//     const userRegistrations = await db.query.registration.findMany({
//       where: eq(schema.registration.userId, currentUser.id),
//       with: {
//         segment: {
//           columns: {
//             title: true,
//             date: true,
//             time: true,
//             venue: true,
//             fee: true,
//           },
//         },
//         team: {
//           with: {
//             members: true, // 👈 এখন কাজ করবে
//             creator:true,
//           },
//         },
//         user: {
//           columns: {
//             name: true,
//             email: true,
//             phone: true,
//             institution: true,
//           },
//         },
//         coupon: {
//           columns: {
//             code: true,
//             discountAmount: true,
//           },
//         },
//         payments: true,
//       },
//       // নতুন রেজিস্ট্রেশন আগে দেখানোর জন্য
//       orderBy: (registration, { desc }) => [desc(registration.createdAt)],
//     });

//     const formattedData = userRegistrations.map((reg) => {
//       const successPayment =
//         reg.payments.find((p) => p.status === "SUCCESS") || reg.payments[0];

//       return {
//         registrationId: reg.id,
//         trackingNumber: reg.trackingNumber,
//         status: reg.selectionStatus,
//         event: {
//           title: reg.segment?.title,
//           date: reg.segment?.date,
//           venue: reg.segment?.venue,
//         },
//         // যদি টিম ইভেন্ট হয় তবে মেম্বারদের লিস্ট দেখাবে
//         team: reg.team
//           ? {
//               name: reg.team.teamName,
//               code: reg.team.teamCode,
//               teamLead: reg.team.creatorId,
//               members: reg.team.members || [],
//             }
//           : null,
//         paymentStatus: successPayment?.status || "UNPAID",
//         paidAmount: successPayment?.paidAmount || 0,
//       };
//     });

//     return { success: true, data: formattedData };
//   } catch (error) {
//     console.error("User Registration Fetch Error:", error);
//     return { success: false, error: "Failed to fetch your registrations" };
//   }
// }


export async function getUserRegistrations() {
  try {
    const db = getDb();
    const currentUser = await getCurrentUser();

    // 1. Authentication Check
    if (!currentUser?.id) {
      return { success: false, error: "Unauthorized: User ID is required" };
    }

    // 2. Fetch Data with Drizzle Relational Queries
    const userRegistrations = await db.query.registration.findMany({
      where: eq(schema.registration.userId, currentUser.id),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
            institution: true,
          },
        },
        // ইভেন্টের বিস্তারিত
        segment: {
          columns: {
            id: true,
            title: true,
            date: true,
            time: true,
            venue: true,
            fee: true,
            isTeamEvent: true,
          },
        },
        // টিমের বিস্তারিত (মেম্বার + লিডারের ইনফো)
        team: {
          with: {
            members: true,
            creator: {
              // 👈 Team Lead এর বিস্তারিত ইনফো
              columns: {
                id: true,
                name: true,
                email: true,
                phone: true,
                institution: true,
              },
            },
          },
        },
        // পেমেন্ট হিস্ট্রি
        payments: true,
        // কুপন ইনফো (যদি থাকে)
        coupon: {
          columns: {
            code: true,
            discountPercentage: true,
          },
        },
      },
      // একদম নতুন রেজিস্ট্রেশনটি আগে দেখানোর জন্য
      orderBy: (registration, { desc }) => [desc(registration.createdAt)],
    });

    // 3. Data Transformation (Formatting for Frontend)
    const formattedData = userRegistrations.map((reg) => {
      // সফল পেমেন্ট বের করা (যদি একাধিক ট্রাই করে থাকে)
      const successPayment =
        reg.payments.find((p) => p.status === "SUCCESS") || reg.payments[0];

      return {
        registrationId: reg.id,
        trackingNumber: reg.trackingNumber,
        status: reg.selectionStatus, // "PENDING" | "SELECTED" | "REJECTED"
        category: reg.category, // "UNIVERSITY" | "SCHOOL_COLLEGE"

        participant: reg.user
          ? {
              id: reg.user.id,
              name: reg.user.name,
              email: reg.user.email,
              phone: reg.user.phone,
              institution: reg.user.institution,
            }
          : null,

        event: {
          id: reg.segment?.id,
          title: reg.segment?.title,
          date: reg.segment?.date,
          time: reg.segment?.time,
          venue: reg.segment?.venue,
          baseFee: reg.segment?.fee,
        },

        // 👈 টিম থাকলে ডিটেইলড টিম অবজেক্ট, না থাকলে null
        team: reg.team
          ? {
              id: reg.team.id,
              name: reg.team.teamName,
              code: reg.team.teamCode,
              // লিডারের সম্পূর্ণ ডাটা
              teamLead: reg.team.creator
                ? {
                    id: reg.team.creator.id,
                    name: reg.team.creator.name,
                    email: reg.team.creator.email,
                    phone: reg.team.creator.phone,
                    institution: reg.team.creator.institution,
                  }
                : null,
              // অন্যান্য মেম্বারদের ডাটা
              members: reg.team.members || [],
            }
          : null,

        // ফাইন্যান্স ও পেমেন্ট ডাটা
        finance: {
          paymentStatus: successPayment?.status || "PENDING",
          paidAmount: successPayment?.paidAmount || 0,
          baseAmount: successPayment?.baseAmount || reg.segment?.fee || 0,
          paymentMethod: successPayment?.paymentMethod || null,
          transactionId: successPayment?.transactionId || null,
          couponApplied: reg.coupon ? reg.coupon.code : null,
          discountPercentage: reg.coupon ? reg.coupon.discountPercentage : 0,
        },
      };
    });

    // 4. Return standard API response
    return { success: true, data: formattedData };

  } catch (error) {
    console.error("[GET_USER_REGISTRATIONS_ERROR]:", error);
    return { 
      success: false, 
      error: "Internal Server Error: Failed to fetch registrations" 
    };
  }
}
