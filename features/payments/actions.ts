"use server";

import { initiateSSLCommerzPayment } from "@/lib/sslcommerz";
import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { getCurrentUser } from "@/lib/UserSession";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { redirect } from "next/navigation";
import { getSegmentById } from "../Events/actions";
import { createPayment } from "../registration/paymentAction";
import { createRegistration } from "../registration/registrationAction";
import { PaymentPayload } from "./types";
import { getCouponByCode } from "../coupon/action";
import { getUserProfile } from "../users/queries";

export async function processPaymentAction(payload: PaymentPayload) {
  const { env } = getCloudflareContext();
  const { data: segmentData } = await getSegmentById(payload.segmentId);
  const CureentUser = await getCurrentUser();
  const { data: cureentUserInfo } = await getUserProfile({
    id: CureentUser?.id || "",
  });
  console.log("Current user info:", cureentUserInfo);
  if (!segmentData) {
    throw new Error("Segment not found");
  }

  if (!CureentUser || !cureentUserInfo) {
    throw new Error("User not authenticated");
  }
  const teamLeader = {
    name: CureentUser.name || "Unknown",
    email: CureentUser.email || "Unknown",
    phone: CureentUser.phone || "Unknown",
    institution: CureentUser.institution || undefined,
    department: cureentUserInfo?.department || undefined,
  };

  if (!segmentData || Array.isArray(segmentData)) {
    throw new Error("Invalid segment data or segment not found!");
  }

  let amount = Number(segmentData?.fee);

  const teamMembers = payload.teamMembers ?? [];

  // teamMember check

  if (segmentData.maxMembers && teamMembers.length > segmentData.maxMembers) {
    throw new Error(
      `Team member limit exceeded. Maximum allowed: ${segmentData.maxMembers}`,
    );
  }

  if (teamMembers.length > (segmentData?.minMembers ?? 0)) {
    const extraMembers = teamMembers.length - (segmentData?.minMembers ?? 0);

    if (extraMembers > 0) {
      amount += extraMembers * (segmentData?.extraMemberFee ?? 0);
    }
  }

   let couponid:string = "";
  // ১. কুপন চেক এবং ডিসকাউন্ট হিসাব করা
  if (payload.coupon) {
    const couponResult = await verifyCouponAction(payload.coupon);
    couponid = couponResult.coupon?.id || "";
    // শুধু কুপন ভ্যালিড (success: true) হলেই ডিসকাউন্ট হিসাব হবে
    if (couponResult.success && couponResult.discountPercentage) {
      const discountAmount = (amount * couponResult.discountPercentage) / 100;
      amount = amount - discountAmount;
      amount = Math.round(amount);
    } else {
      // কুপন ইনভ্যালিড হলে পেমেন্ট বাতিল না করে শুধু কনসোলে ওয়ার্নিং দিতে পারেন
      console.warn(
        `Invalid coupon applied: ${payload.coupon}. Proceeding with full amount.`,
      );
    }
  }

  // বেসিক ভ্যালিডেশন
  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount after discount");
  }

  const transactionId = generateUniqueCode("TNX");
  const baseUrl = env.BETTER_AUTH_URL!;

  // save db payment record with status pending and transactionId and registrationId and amount and coupon code if any

  const saveRegData = {
    segmentId: payload.segmentId,
    isTeamEvent: segmentData.isTeamEvent,
    ambassadorCode: payload.coupon || undefined,
    teamName: payload.teamName || undefined,
    couponId: couponid,
    leaderStudentIdScan: payload.leaderStudentIdScan,
    teamMembers: payload.teamMembers ?? [],
    category: payload.category,
    metadata: payload.segmentMeta ?? undefined,
  };

  const leaderInfo = {
    name: CureentUser.name || "Unknown",
    phone: CureentUser.phone || "Unknown",
    institution: CureentUser.institution || undefined,
    department: cureentUserInfo?.department || undefined,
  };


  const { data: registrationData } = await createRegistration(
    saveRegData,
    CureentUser.id,
    leaderInfo,
  );

  if (!registrationData?.id) {
    throw new Error("Registration creation failed");
  }

  const paymentData = {
    registrationId: registrationData.id,
    baseAmount: Number(segmentData.fee),
    paidAmount: amount,
    transactionId: transactionId,
    paymentMethod: "SSLCommerz",
  };

  await createPayment(paymentData);

  // ২. ডাইনামিক ডেটাগুলো SSLCommerz-এ পাঠানো
  const payment = await initiateSSLCommerzPayment({
    tran_id: transactionId,
    currency: "BDT",
    total_amount: amount,
    cus_name: teamLeader.name,
    cus_email: teamLeader.email,
    cus_phone: teamLeader.phone,
    product_name: segmentData?.title || "Event Registration",
    product_category: segmentData?.type || "Event",
    ipn_url: `${baseUrl}/api/payment/ipn?tran_id=${transactionId}`,
    success_url: `${baseUrl}/api/payment/success?tran_id=${transactionId}`,
    fail_url: `${baseUrl}/api/payment/fail?tran_id=${transactionId}`,
    cancel_url: `${baseUrl}/api/payment/cancel?tran_id=${transactionId}`,
  });

  // ৩. রিডাইরেক্ট হ্যান্ডেলিং (Server Action এর নিয়ম অনুযায়ী)
  if (payment.status === "SUCCESS" && payment.GatewayPageURL) {
    // Next.js Server Action-এ সরাসরি redirect() কল করতে হয়
    redirect(payment.GatewayPageURL);
  } else {
    console.error("Payment initiation failed:", payment.failedreason);
    throw new Error(
      "Payment initiation failed: " + (payment.failedreason || "Unknown error"),
    );
  }
}

// =========================================
// Coupon code for payments
// ==========================================


export async function verifyCouponAction(code: string) {

  const couponCode = code.trim().toUpperCase();
  const coupon = await getCouponByCode(couponCode);

  if (!coupon) {
    return {
      success: false,
      message: "Invalid coupon code.",
      discountPercentage: 0,
    };
  }

  if (!coupon.isActive) {
    return {
      success: false,
      message: "This coupon is no longer active.",
      discountPercentage: 0,
    };
  }

  if (coupon.expiresAt !== null && coupon.expiresAt.getTime() < Date.now()) {
    return {
      success: false,
      message: "This coupon has expired.",
      discountPercentage: 0,
    };
  }

  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return {
      success: false,
      message: "Coupon usage limit reached.",
      discountPercentage: 0,
    };
  }

  return {
    success: true,
    message: `Coupon applied! You got ${coupon.discountPercentage}% off.`,
    coupon,
    discountPercentage: coupon.discountPercentage,
  };
}
