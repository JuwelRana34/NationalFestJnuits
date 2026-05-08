// actions/payment.ts
"use server";

import { redirect } from "next/navigation";
import { initiateSSLCommerzPayment } from "@/lib/sslcommerz";
import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function processPaymentAction(formData: FormData) {
     const { env } = getCloudflareContext();
  // ১. ফ্রন্টএন্ড থেকে পাঠানো সব ডেটা রিসিভ করা
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  // ডাইনামিক ফিল্ডগুলো (ফ্রন্টএন্ড থেকে আসবে)
  const amount = Number(formData.get("amount"));
  const segmentName = formData.get("segmentName") as string;
  const segmentCategory = formData.get("segmentCategory") as string;

  // বেসিক ভ্যালিডেশন
  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount");
  }

  const transactionId = generateUniqueCode("TNX");
  const baseUrl = env.BETTER_AUTH_URL!;

  // ২. ডাইনামিক ডেটাগুলো SSLCommerz-এ পাঠানো
  const paymentResult = (await initiateSSLCommerzPayment({
    tran_id: transactionId,
    total_amount: amount, // ডাইনামিক অ্যামাউন্ট
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    product_name: segmentName, // ডাইনামিক ইভেন্টের নাম
    product_category: segmentCategory, // ডাইনামিক ক্যাটাগরি
    success_url: `${baseUrl}/api/payment/success?tran_id=${transactionId}`,
    fail_url: `${baseUrl}/api/payment/fail?tran_id=${transactionId}`,
    cancel_url: `${baseUrl}/api/payment/cancel?tran_id=${transactionId}`,
  })) as { status?: string; GatewayPageURL?: string };

  // console.log("Payment Initiation Result:", paymentResult);

  if (paymentResult?.status === "SUCCESS" && paymentResult.GatewayPageURL) {
    redirect(paymentResult.GatewayPageURL);
  } else {
    throw new Error("Payment gateway configuration failed.");
  }
}
