"use server";

import { GetEventValues } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";
import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";

export async function getEvents() {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  let eventData: GetEventValues[] = [];

  try {
    const { status, response } = await honoFetch<{
      success: boolean;
      data: GetEventValues[];
    }>("/api/events");

    if (status === 200 && response) {
      eventData = response.data;
    }
    return eventData;
  } catch (error) {
    console.error("Error fetching events data:", error);
    return [];
  }
}

export async function revalidateEvents(slug?: string) {
  updateTag("events");
  revalidatePath("/events");
  if (slug) {
    updateTag(`event-${slug}`);
  }
}
