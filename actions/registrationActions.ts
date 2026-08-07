"use server";

import { honoFetch } from "@/lib/hono-client";
import { revalidateTag } from "next/cache";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  studentId?: string;
}

interface RegisterPayload {
  eventId: string;
  couponCode: string | null;
  metadata: {
    commonDetails: Record<string, string>;
    teamInfo: {
      baseMembers: TeamMember[];
      extraMembers: TeamMember[];
    } | null;
  };

  paymentInfo: {
    transactionId?: string;
    senderNumber?: string;
    baseAmount: number;
    paidAmount: number;
  } | null;
}

interface RegistrationResponseData {
  id: string;
  trackingNumber: string; // 👈 টাইপস্ক্রিপ্ট এখন এটা চিনতে পারবে
  eventId: string;
  selectionStatus: string;
  createdAt: string;
  [key: string]: string; // অন্যান্য ফিল্ডের জন্য
}

export async function submitEventRegistration(payload: RegisterPayload) {
  try {
    const { status, response } = await honoFetch("/api/registrations/event", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const responseData = response as {
      message?: string;
      success?: boolean;
      data?: RegistrationResponseData;
    };

    if (status !== 200 || !responseData.success) {
      return {
        success: false,
        message:
          responseData?.message ||
          "Registration failed. Please check your details and try again.",
      };
    }

    // 🎯 সফল হলে ড্যাশবোর্ড বা ইভেন্ট পেজের ক্যাশ রিভ্যালিডেট করে দিতে পারেন
    revalidateTag("dashboard-data", "max");
    // revalidatePath(`/events`);

    return {
      success: true,
      message: "Registration successful!",
      data: responseData.data as RegistrationResponseData,
    };
  } catch (error) {
    console.error("Registration Server Action Error:", error);
    return {
      success: false,
      message: "Something went wrong! Please try again.",
    };
  }
}

export async function revalidationAdminDashboard() {
  revalidateTag("dashboard-data", "max");
}
