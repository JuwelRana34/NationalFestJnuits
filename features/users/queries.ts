"use server";

import { honoFetch } from "@/lib/hono-client";

export async function getUserDataFromHono() {
  try {

   const data = await honoFetch("/api/users/dashboard");

    console.log("Data from Hono Service Binding:", data);
    return data;
  } catch (error) {
    console.error("Service Binding Error:", error);
    return null;
  }
}
