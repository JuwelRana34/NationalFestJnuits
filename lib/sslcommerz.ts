import { getCloudflareContext } from "@opennextjs/cloudflare";

export const initiateSSLCommerzPayment = async (paymentData: {
  tran_id: string;
  total_amount: number;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  product_name: string;
  product_category: string;
}) => {
     const { env } = getCloudflareContext();
  const storeId = env.SSL_STORE_ID!;
  const storePassword = env.SSL_STORE_PASSWORD!;
  const isSandbox = env.SSL_IS_SANDBOX === "true";

  const apiUrl = isSandbox
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

  // URLSearchParams ব্যবহার করা হচ্ছে যাতে Edge Runtime-এ কোনো সমস্যা না হয়
  const formData = new URLSearchParams();
  formData.append("store_id", storeId);
  formData.append("store_passwd", storePassword);
  formData.append("total_amount", paymentData.total_amount.toString());
  formData.append("currency", "BDT");
  formData.append("tran_id", paymentData.tran_id);
  formData.append("success_url", paymentData.success_url);
  formData.append("fail_url", paymentData.fail_url);
  formData.append("cancel_url", paymentData.cancel_url);
  formData.append("emi_option", "0");
  formData.append("cus_name", paymentData.cus_name);
  formData.append("cus_email", paymentData.cus_email);
  formData.append("cus_phone", paymentData.cus_phone);
  formData.append("shipping_method", "NO");
  formData.append("product_name", paymentData.product_name);
  formData.append("product_category", paymentData.product_category);
  formData.append("product_profile", "general");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    return result; 
  } catch (error) {
    console.error("SSLCommerz Init Error:", error);
    throw new Error("Failed to initiate payment");
  }
};
