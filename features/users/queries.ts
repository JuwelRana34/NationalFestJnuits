"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { createAuth } from "@/core/auth/auth";
import { headers } from "next/headers";

export async function getUserProfile() {
  try {
    const { env } = getCloudflareContext();
    const db = drizzle(env.jnu_it_fest_db, { schema });

    // ২. সার্ভার সাইড থেকে ইউজারের বর্তমান সেশন চেক করা
    const auth = createAuth();
    const sessionHeaders = await headers();
    const session = await auth.api.getSession({
      headers: sessionHeaders,
    });

    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in" };
    }

    // ৩. Drizzle দিয়ে ডাটাবেস থেকে ইউজারের সব ইনফরমেশন বের করা
    const userData = await db.query.user.findFirst({
      where: eq(schema.user.id, session.user.id),
    });

    if (!userData) {
      return { success: false, error: "User not found in database" };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return { success: false, error: "Failed to fetch data from database" };
  }
}
