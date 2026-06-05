"use server";

import { honoFetch } from "@/lib/hono-client";
import { revalidatePath, revalidateTag } from "next/cache";
import { SegmentFormOutput } from "./Types";

type ApiResponse = {
  message?: string;
  data?: unknown;
};

export async function createSegmentAction(data: SegmentFormOutput) {
  try {
    const { status, response } = await honoFetch("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const parsedResponse =
      typeof response === "object" && response !== null
        ? (response as ApiResponse)
        : {};

    if (status !== 200 || !parsedResponse.message) {
      return {
        success: false,
        message: parsedResponse.message || "Failed to create segment",
      };
    }

    revalidateTag("events", "max");
    return { success: true, data: parsedResponse.data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Action Error:", message);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function updateSegmentAction(id: string, data: SegmentFormOutput) {
  try {
    const { status, response } = await honoFetch(`/api/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    revalidateTag("events", "max");
     console.log("Update Response:", { status, response });
    const parsedResponse =
      typeof response === "object" && response !== null
        ? (response as ApiResponse)
        : {};

    if (status !== 200 || !parsedResponse.message) {
      return {
        success: false,
        message: parsedResponse.message || "Failed to update segment",
      };
    }

    revalidateTag("events", "max");
    revalidatePath(`/events/${id}`);
    return { success: true, data: parsedResponse.data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Update Action Error:", message);
    return { success: false, message: "Internal Server Error" };
  }
}
