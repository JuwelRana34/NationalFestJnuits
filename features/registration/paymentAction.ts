"use server";

import { getDb } from "@/core/db/db";
import { payments } from "@/core/db/schema";
import { eq } from "drizzle-orm";

interface PaymentData {
  registrationId: string;
  baseAmount: number;
  paidAmount: number;
  transactionId: string;
  paymentMethod: string;
}

// ১. পেমেন্ট রেকর্ড তৈরি করার ফাংশন
export async function createPayment(data: PaymentData) {
  try {
    const db = getDb();

    // পেমেন্ট টেবিলে ডেটা ইনসার্ট করা
    await db.insert(payments).values({
      id: crypto.randomUUID(),
      registrationId: data.registrationId,
      transactionId: data.transactionId,
      baseAmount: data.baseAmount,
      paidAmount: data.paidAmount,
      paymentMethod: data.paymentMethod,
      status: "PENDING",
    });

    return { success: true };
  } catch (error) {
    console.error("Payment creation failed:", error);
    return { success: false, error: "Failed to create payment record" };
  }
}

// ২. রেজিস্ট্রেশন আইডি দিয়ে পেমেন্ট ডেটা বের করার ফাংশন
export async function getPaymentByRegistrationId(registrationId: string) {
  try {
    const db = getDb();
    const paymentData = await db.query.payments.findFirst({
      where: eq(payments.registrationId, registrationId),
      // যদি আপনার registration টেবিলের সাথে রিলেশন করা থাকে, তাহলে নিচের অংশটুকু আনকমেন্ট করতে পারেন
      /*
      with: {
        registration: true,
      },
      */
    });

    return { success: true, data: paymentData };
  } catch (error) {
    console.error("Failed to fetch payment:", error);
    return { success: false, error: "Failed to fetch payment data" };
  }
}

// ৩. ট্রানজেকশন আইডি দিয়ে পেমেন্ট স্ট্যাটাস আপডেট করার ফাংশন (Webhook/IPN এর জন্য কাজে লাগবে)
export async function updatePaymentStatus(
  transactionId: string,
  status: "SUCCESS" | "FAILED",
  paymentMethod: string
) {
  try {
    const db = getDb();
    const updatedPayment = await db
      .update(payments)
      .set({ status: status, paymentMethod: paymentMethod })
      .where(eq(payments.transactionId, transactionId))
      .returning();
    return { success: true, data: updatedPayment[0] };
  } catch (error) {
    console.error("Payment status update failed:", error);
    return { success: false, error: "Failed to update payment status" };
  }
}
