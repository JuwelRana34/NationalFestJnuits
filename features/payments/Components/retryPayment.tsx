"use client";

import { useState } from "react";
import { retryPaymentAction } from "../action";

type RetryPaymentProps = {
  eventId: string | number;
  title?: string;
};

export default function RetryPayment({ eventId, title }: RetryPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    setError(null);
    setLoading(true);
    try {
      const {success , PayUrl, message } = await retryPaymentAction({
        registrationId: String(eventId),
        title,
      });

       console.log("Retry payment action result:", { success, PayUrl, message });
      if (success && PayUrl) {
        window.location.assign(PayUrl);
      }
         else {
            throw new Error(message || "Failed to retry payment.");
         }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleRetry}
        disabled={loading}
        className=" bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Redirecting..." : `pay now`}
      </button>
      {error && (
        <div role="status" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
}
