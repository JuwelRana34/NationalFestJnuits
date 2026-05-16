"use server";

import { honoFetch } from "@/lib/hono-client";
import { SegmentFormOutput } from "./Types";

export async function createSegmentAction(data: SegmentFormOutput) {
  try {
    const { status, response } = await honoFetch("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("API Response:", { status, response });
    const parsedResponse =
      typeof response === "object" && response !== null
        ? (response as { message?: string; data?: unknown })
        : {};

    if (status !== 200 || !parsedResponse.message) {
      return {
        success: false,
        message: parsedResponse.message || "Failed to create segment",
      };
    }

    // সব ঠিক থাকলে success রিটার্ন করুন
    return { success: true, data: parsedResponse.data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Action Error:", message);
    return { success: false, message: "Internal Server Error" };
  }
}
