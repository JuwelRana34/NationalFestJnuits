// import { getCloudflareContext } from "@opennextjs/cloudflare";

// export const initiateSSLCommerzPayment = async (paymentData: {
//   tran_id: string;
//   currency: "BDT";
//   ipn_url: string;
//   total_amount: number;
//   cus_name: string;
//   cus_email: string;
//   cus_phone: string;
//   success_url: string;
//   fail_url: string;
//   cancel_url: string;
//   product_name: string;
//   product_category: string;
// }) => {
//   const { env } = getCloudflareContext();
//   const storeId = env.SSL_STORE_ID!;
//   const storePassword = env.SSL_STORE_PASSWORD!;
//   const refer = env.SSL_IS_REFER ;
//   const isSandbox = env.SSL_IS_SANDBOX === "true";

//   const apiUrl = isSandbox
//     ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
//     : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

//   // URLSearchParams ব্যবহার করা হচ্ছে যাতে Edge Runtime-এ কোনো সমস্যা না হয়
//   const formData = new URLSearchParams();
//   formData.append("store_id", storeId);
//   formData.append("store_passwd", storePassword);
//   formData.append("total_amount", paymentData.total_amount.toString());
//   formData.append("refer", refer);
//   formData.append("acct_no", refer);
//   formData.append("currency", "BDT");
//   formData.append("tran_id", paymentData.tran_id);
//   formData.append("success_url", paymentData.success_url);
//   formData.append("fail_url", paymentData.fail_url);
//   formData.append("cancel_url", paymentData.cancel_url);
//   formData.append("emi_option", "0");
//   formData.append("cus_name", paymentData.cus_name);
//   formData.append("cus_email", paymentData.cus_email);
//   formData.append("cus_phone", paymentData.cus_phone);
//   formData.append("cus_add1", "N/A");
//   formData.append("cus_city", "N/A");
//   formData.append("cus_state", "N/A");
//   formData.append("cus_postcode", "N/A");
//   formData.append("cus_country", "Bangladesh");

//   formData.append("shipping_method", "NO");
//   formData.append("num_of_item", "1");
//   formData.append("product_name", paymentData.product_name);
//   formData.append("product_category", paymentData.product_category);
//   formData.append("product_profile", "general");

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formData.toString(),
//     });

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("SSLCommerz Init Error:", error);
//     throw new Error("Failed to initiate payment");
//   }
// };

import { getCloudflareContext } from "@opennextjs/cloudflare";

// ১. ইনপুট প্যারামিটারগুলোর জন্য strict type ডিফাইন করা হলো
export interface SSLCommerzPaymentData {
  tran_id: string;
  currency: "BDT" | "USD" | "EUR" | "SGD" | "INR" | "MYR";
  total_amount: number;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url?: string;
  product_name: string;
  product_category: string;
}

// ২. SSLCommerz v4 থেকে যে রেসপন্স আসবে তার টাইপ ডিফাইন করা হলো
export interface SSLCommerzInitResponse {
  status: "SUCCESS" | "FAILED";
  failedreason?: string;
  sessionkey?: string;
  gw?: {
    redirectGatewayURL: string;
  };
  redirectGatewayURL?: string;
  GatewayPageURL?: string; // এই ইউআরএলেই ইউজারকে রিডাইরেক্ট করতে হবে
  storeBanner?: string;
  storeLogo?: string;
  desc?: unknown[];
  is_direct_pay_enable?: string;
  [key: string]: unknown;
}

export const initiateSSLCommerzPayment = async (
  paymentData: SSLCommerzPaymentData,
): Promise<SSLCommerzInitResponse> => {
  const { env } = getCloudflareContext();
  const storeId = env.SSL_STORE_ID!;
  const storePassword = env.SSL_STORE_PASSWORD!;
  const isSandbox = env.SSL_IS_SANDBOX === "true";

  const apiUrl = isSandbox
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

  const formData = new URLSearchParams();

  // স্টোর এবং ট্রানজেকশন ইনফরমেশন
  formData.append("store_id", storeId);
  formData.append("store_passwd", storePassword);
  formData.append("total_amount", paymentData.total_amount.toString());
  formData.append("currency", paymentData.currency);
  formData.append("tran_id", paymentData.tran_id);

  // এন্ডপয়েন্ট ইউআরএল
  formData.append("success_url", paymentData.success_url);
  formData.append("fail_url", paymentData.fail_url);
  formData.append("cancel_url", paymentData.cancel_url);

  // ফিক্স: ipn_url থাকলে তবেই append করা হবে
  if (paymentData.ipn_url) {
    formData.append("ipn_url", paymentData.ipn_url);
  }

  // কাস্টমার ইনফরমেশন
  formData.append("cus_name", paymentData.cus_name);
  formData.append("cus_email", paymentData.cus_email);
  formData.append("cus_phone", paymentData.cus_phone);
  // নোট: ডিজিটাল প্রোডাক্টের জন্য "N/A" ঠিক আছে, তবে ফিজিক্যাল প্রোডাক্টের ক্ষেত্রে আসল ঠিকানা দেওয়া উচিত।
  formData.append("cus_add1", "N/A");
  formData.append("cus_city", "N/A");
  formData.append("cus_state", "N/A");
  formData.append("cus_postcode", "N/A");
  formData.append("cus_country", "Bangladesh");

  // প্রোডাক্ট এবং শিপিং ইনফরমেশন
  formData.append("shipping_method", "NO");
  formData.append("num_of_item", "1");
  formData.append("product_name", paymentData.product_name);
  formData.append("product_category", paymentData.product_category);
  formData.append("product_profile", "general");
  formData.append("emi_option", "0");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = (await response.json()) as SSLCommerzInitResponse;
    return result;
  } catch (error) {
    console.error("SSLCommerz Init Error:", error);
    throw new Error("Failed to initiate payment");
  }
};