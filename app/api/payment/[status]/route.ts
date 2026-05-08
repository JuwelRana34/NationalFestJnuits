import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ status: string }> },
) {
  const { status } = await params; // success, fail, or cancel
  const { env } = getCloudflareContext();
  // SSLCommerz POST request হিসেবে ডেটা পাঠায়, তাই formData রিড করতে হবে
  const formData = await request.formData();
  const tran_id = formData.get("tran_id") as string;
  const val_id = formData.get("val_id") as string; // Success হলে Validation ID আসবে

  console.log("Received Payment Callback:", params);

  if (status === "success" && val_id) {
    // Cloudflare Edge-compatible Validation
    const isSandbox = env.SSL_IS_SANDBOX === "true";
    const validationUrl = isSandbox
      ? `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${env.SSL_STORE_ID}&store_passwd=${env.SSL_STORE_PASSWORD}&v=1&format=json`
      : `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${env.SSL_STORE_ID}&store_passwd=${env.SSL_STORE_PASSWORD}&v=1&format=json`;

    try {
      const validateResponse = await fetch(validationUrl);
      const validationData = (await validateResponse.json()) as {
        status?: string;
      };

      if (
        validationData.status === "VALID" ||
        validationData.status === "VALIDATED"
      ) {
        // এখানে Drizzle ORM দিয়ে ডেটাবেসে পেমেন্ট স্ট্যাটাস 'Paid' করে দিন
        // await db.update(segment).set({ paymentStatus: 'Paid' }).where(eq(segment.tranId, tran_id));

        return NextResponse.redirect(
          new URL(`/payment/success?tran_id=${tran_id}`, request.url),
          303,
        );
      }
    } catch (error) {
      console.error("Validation Error:", error);
    }
  }

  // যদি fail বা cancel হয়, অথবা ভ্যালিডেশন ফেইল করে
  // ডেটাবেসে স্ট্যাটাস 'Failed' করে দিন
  return NextResponse.redirect(
    new URL(`/failed?tran_id=${tran_id}`, request.url),
    303,
  );
}
