"use server";

import { revalidatePath, updateTag } from "next/cache";

export async function revalidateEvents(slug?: string) {
  updateTag("events");
  revalidatePath("/events");
  if (slug) {
    updateTag(`event-${slug}`);
  }
}
