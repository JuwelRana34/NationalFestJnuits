import { honoFetch } from "@/lib/hono-client";
import { GetEventValues } from "../types";
import { cacheLife, cacheTag } from "next/cache";

// আমাদের ফাংশন যেটা রিটার্ন করবে
interface Event {
  success: boolean;
  data: GetEventValues | null;
}

// 🎯 ব্যাকএন্ড ঠিক যেই ফরম্যাটে ডেটা দিচ্ছে, সেটার জন্য একটি টাইপ বানালাম
interface ApiResponse {
  success: boolean;
  message: string;
  data: GetEventValues;
}

export const fetchSingleEvent = async (slug: string): Promise<Event> => {

    "use cache";  
    cacheLife("hours");
    cacheTag(`event-${slug}`); 

  const { response, status } = await honoFetch<ApiResponse>(
    `/api/events/${slug}`,
    {
      method: "GET",
    },
  );

  // যদি স্ট্যাটাস ২০০ না হয় বা ব্যাকএন্ড ফলস পাঠায়
  if (status !== 200 || !response || !response.success) {
    console.error(
      `Failed to fetch event with slug: ${slug}. Status: ${status}`,
    );
    return { success: false, data: null };
  }

  // 🎯 এখন আর কোনো এরর দেবে না! ব্যাকএন্ডের response.data-কে আমরা পাঠিয়ে দিচ্ছি
  return { success: true, data: response.data };
};
