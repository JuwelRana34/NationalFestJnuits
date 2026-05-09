// // actions/payment.ts
// "use server";

// import { redirect } from "next/navigation";
// import { initiateSSLCommerzPayment } from "@/lib/sslcommerz";
// import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
// import { getCloudflareContext } from "@opennextjs/cloudflare";
// import { PaymentPayload } from "./types";
// import { getSegmentById } from "../Events/actions";

// export async function processPaymentAction(payload: PaymentPayload) {
//   const { env } = getCloudflareContext();
//    const {data} = await getSegmentById(payload.segmentId);

//    if(!data){
//     throw new Error("Segment not found");
//    }

//   let amount = Number(data.fee);

//    if(payload.coupon){
//     const couponResult = await verifyCouponAction(payload.coupon);
//     if (!couponResult.success) {
//       throw new Error(couponResult.message);
//     }
//    }

//   // বেসিক ভ্যালিডেশন
//   if (!amount || amount <= 0) {
//     throw new Error("Invalid payment amount");
//   }

//   const transactionId = generateUniqueCode("TNX");
//   const baseUrl = env.BETTER_AUTH_URL!;

//   // ২. ডাইনামিক ডেটাগুলো SSLCommerz-এ পাঠানো
//   const payment = await initiateSSLCommerzPayment({
//     tran_id: transactionId,
//     currency: "BDT",
//     total_amount: amount,
//     cus_name: payload.customerName,
//     cus_email: payload.customerEmail,
//     cus_phone: payload.customerPhone,
//     product_name: data?.title || "Event Registration",
//     product_category: data?.type || "Event",
//     ipn_url: `${baseUrl}/api/payment/ipn?tran_id=${transactionId}`,
//     success_url: `${baseUrl}/api/payment/success?tran_id=${transactionId}`,
//     fail_url: `${baseUrl}/api/payment/fail?tran_id=${transactionId}`,
//     cancel_url: `${baseUrl}/api/payment/cancel?tran_id=${transactionId}`,
//   });

//   // console.log("Payment Initiation Result:", paymentResult);

//   if (payment.status === "SUCCESS" && payment.GatewayPageURL) {
//     // ইউজারকে SSLCommerz গেটওয়ে পেইজে রিডাইরেক্ট করা হচ্ছে
//     return Response.redirect(payment.GatewayPageURL, 303);
//   } else {
//     // এরর হ্যান্ডেলিং
//     console.error("Payment initiation failed:", payment.failedreason);
//   }
// }

// // =========================================
// // Cupon code for payments
// // ==========================================

// // আপনার স্কিমার টাইপ অনুযায়ী একটি ফেক ডেটাবেস তৈরি করলাম
// const MOCK_DATABASE = [
//   {
//     id: "1",
//     code: "JNUITS10", // ১০% ডিসকাউন্ট
//     discountPercentage: 10,
//     isActive: true,
//     maxUses: null, // আনলিমিটেড
//     usedCount: 50,
//     expiresAt: new Date("2026-12-31").getTime(), // ভবিষ্যতে এক্সপায়ার হবে
//     createdAt: Date.now(),
//   },
//   {
//     id: "2",
//     code: "EXPIRED5", // ৫% ডিসকাউন্ট (কিন্তু মেয়াদ শেষ)
//     discountPercentage: 5,
//     isActive: true,
//     maxUses: null,
//     usedCount: 10,
//     expiresAt: new Date("2026-01-01").getTime(), // মেয়াদ শেষ
//     createdAt: Date.now(),
//   },
//   {
//     id: "3",
//     code: "LIMIT20", // ২০% ডিসকাউন্ট (কিন্তু লিমিট শেষ)
//     discountPercentage: 20,
//     isActive: true,
//     maxUses: 5,
//     usedCount: 5, // ৫ বারের মধ্যে ৫ বারই ব্যবহার হয়ে গেছে
//     expiresAt: null,
//     createdAt: Date.now(),
//   },
//   {
//     id: "4",
//     code: "OFF15", // ১৫% ডিসকাউন্ট (কিন্তু বন্ধ করা আছে)
//     discountPercentage: 15,
//     isActive: false, // Inactive
//     maxUses: null,
//     usedCount: 0,
//     expiresAt: null,
//     createdAt: Date.now(),
//   },
// ];

// export async function verifyCouponAction(code: string) {
//   // আর্টিফিশিয়াল ডিলে (যেন মনে হয় রিয়েল API কল হচ্ছে)
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   const couponCode = code.trim().toUpperCase();
//   const coupon = MOCK_DATABASE.find((c) => c.code === couponCode);

//   // ১. কুপন আছে কিনা চেক
//   if (!coupon) {
//     return { success: false, message: "Invalid coupon code." };
//   }

//   // ২. কুপন অ্যাক্টিভ কিনা চেক
//   if (!coupon.isActive) {
//     return { success: false, message: "This coupon is no longer active." };
//   }

//   // ৩. এক্সপায়ার ডেট চেক (mode: "timestamp_ms" অনুযায়ী)
//   if (coupon.expiresAt !== null && coupon.expiresAt < Date.now()) {
//     return { success: false, message: "This coupon has expired." };
//   }

//   // ৪. ব্যবহারের লিমিট চেক
//   if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
//     return { success: false, message: "Coupon usage limit reached." };
//   }

//   // সব ঠিক থাকলে ডিসকাউন্ট পার্সেন্টেজ পাঠিয়ে দিন
//   return {
//     success: true,
//     message: `Coupon applied! You got ${coupon.discountPercentage}% off.`,
//     discountPercentage: coupon.discountPercentage
//   };
// }

// actions/payment.ts

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
    institution: CureentUser.institution || "",
  };

  let amount = Number(segmentData.fee);

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
    // TODO:category ta dynamic korte hobe, karon segment er category onujayi hobe, ekhn demo hisabe university set kora hoyeche
    category: "UNIVERSITY" as const,
    metadata: [teamLeader, ...(payload.teamMembers ?? [])],
  };

  const { data: registrationData } = await createRegistration(
    saveRegData,
    CureentUser.id,
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

const MOCK_DATABASE = [
  {
    id: "1",
    code: "JNUITS10",
    discountPercentage: 10,
    isActive: true,
    maxUses: null,
    usedCount: 50,
    expiresAt: new Date("2026-12-31").getTime(),
    createdAt: Date.now(),
  },
  {
    id: "2",
    code: "EXPIRED5",
    discountPercentage: 5,
    isActive: true,
    maxUses: null,
    usedCount: 10,
    expiresAt: new Date("2026-01-01").getTime(),
    createdAt: Date.now(),
  },
  {
    id: "3",
    code: "LIMIT20",
    discountPercentage: 20,
    isActive: true,
    maxUses: 5,
    usedCount: 4,
    expiresAt: null,
    createdAt: Date.now(),
  },
  {
    id: "4",
    code: "OFF15",
    discountPercentage: 15,
    isActive: false,
    maxUses: null,
    usedCount: 0,
    expiresAt: null,
    createdAt: Date.now(),
  },
];

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
