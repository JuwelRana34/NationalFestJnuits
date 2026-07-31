"use server";

import { revalidateTag } from "next/cache";

export async function revalidateEvents(slug?: string) {
  revalidateTag("events", "max");
  if (slug) {
    revalidateTag(`event-${slug}`, "max");
  }
}
