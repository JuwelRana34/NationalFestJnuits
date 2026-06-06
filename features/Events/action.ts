"use server";

import { honoFetch } from "@/lib/hono-client";
import { cacheLife, revalidatePath, revalidateTag, updateTag } from "next/cache";
import { TrackingResult } from "./schema";
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
    revalidateTag("admin-events-data", "max");
    updateTag("events");
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
    updateTag("admin-events-data");

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

export async function eventTrackingAction(TrakingId: string) {
 "use cache";
 cacheLife("default");
 
  try {
    const cleanTrackingId = TrakingId.trim();
    const { status, response } = await honoFetch<TrackingResult>(
      `/api/events/tracking/${cleanTrackingId}`,
    );

    if (status !== 200) {
      return {
        success: false,
        message: "Failed to get segment data!",
      };
    }

    return { success: true, data: response?.data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Delete Action Error:", message);
    return { success: false, message: "Internal Server Error" };
  }
}
