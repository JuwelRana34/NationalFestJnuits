"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/core/db/schema";
import { eq } from "drizzle-orm";


export async function getUserProfile({id}:{id:string}) {
  try {
    const { env } = getCloudflareContext();
    const db = drizzle(env.jnu_it_fest_db, { schema });


    if (!id) {
      return { success: false, error: "user not found!" };
    }

    // ৩. DB থেকে ইউজার ডেটা ফেচ 
    const userData = await db.query.user.findFirst({
      where: eq(schema.user.id, id),
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
