"use server";
import { honoFetch } from "@/lib/hono-client";
import { PaymentPayload } from "./types";

export async function verifyCouponAction(couponCode: string) {
  try {
    const { status, response } = await honoFetch(
      `/api/coupons/verify/${couponCode}`,
    );
    console.log("Raw response from honoFetch:", response);
    if (status === 200 && response) {
      console.log("Coupon verification successful:", response);
      return { success: true, data: response, message: "Coupon applied!" };
    } else {
      return { success: false, message: "Invalid coupon code." };
    }
  } catch (error) {
    console.error("Error verifying coupon:", error);
    return {
      success: false,
      message: "An error occurred while verifying the coupon.",
    };
  }
}

interface SubmitPaymentResult {
  success: boolean;
  message: string;
  data: { gatewayPageURL: string } | null;
}

interface RetryPaymentPayload {
  registrationId: string;
  title?: string;
}

interface RetryPaymentResponse {
  success?: boolean;
  message?: string;
  GatewayPageURL?: string | null;

}

export async function retryPaymentAction(payload: RetryPaymentPayload) {
  try {
    const { status, response } = await honoFetch<RetryPaymentResponse>(
      "/api/registrations/payment/retry",
      {
        method: "POST",
        body: JSON.stringify(payload),
        requireAuth: true,
      },
    );

    console.log("retry payment:", response?.GatewayPageURL, status);

    if (status !== 200 || !response) {
      return {
        success: false,
        message: response?.message || "Failed to retry payment.",
      };
    }

    return {
      success: true,
      message: response?.message || "Payment retry started.",
      PayUrl: response?.GatewayPageURL,
    }

  } catch (error) {
    console.error("Error retrying payment:", error);
    return {
      success: false,
      message: "An error occurred while retrying payment.",
    };
  }
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
    console.log("Raw response from honoFetch:", response?.message);

    if (status === 409) {
      console.error("Conflict error occurred:", response);
      return {
        success: false,
        message: "you have already registered for this event",
      };
    }

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
