"use server";

import { updateTag } from "next/cache";

export async function revalidateEvents(slug?: string) {
  updateTag("events");
  if (slug) {
    updateTag(`event-${slug}`);
  }
}
