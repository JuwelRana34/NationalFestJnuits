"use server";
import { honoFetch } from "@/lib/hono-client";
import { PaymentPayload } from "./types";

export async function verifyCouponAction(couponCode: string){
    try {
        const {status , response} = await honoFetch(`/api/coupons/verify/${couponCode}`);
        console.log("Raw response from honoFetch:", response);
        if (status === 200 && response) {
             console.log("Coupon verification successful:", response);
            return{success: true, data: response , message: "Coupon applied!"};
        } else {
            return { success: false, message: "Invalid coupon code." };
        }
    }catch (error) {
        console.error("Error verifying coupon:", error);
        return { success: false, message: "An error occurred while verifying the coupon." };
    }
}



interface SubmitPaymentResult {
 success: boolean;
  message: string;
  data : { gatewayPageURL: string } | null;
}
export async function submitPaymentAction(payload: PaymentPayload) {
  try {
    const { status, response } = await honoFetch<SubmitPaymentResult>(
      `/api/registrations/init`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        requireAuth: true,
      },
    );
    console.log("Raw response from honoFetch:", response);
    if (status === 200 && response) {
      return {
        success: true,
        PayUrl: response.data?.gatewayPageURL,
        message: "Payment processed successfully.",
      };
    } else {
      return { success: false, message: "Payment failed." };
    }
  } catch (error) {
    console.error("Error submitting payment:", error);
    return {
      success: false,
      message: "An error occurred while processing the payment.",
    };
  }
}
