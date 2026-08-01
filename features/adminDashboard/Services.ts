"use server";
import { DashboardData } from "@/features/adminDashboard/types";
import { honoFetch } from "@/lib/hono-client";
import { cacheLife, cacheTag } from "next/cache";

// unused/internal import টি বাদ দেওয়া হয়েছে

const FetchDashboardData = async (cookieString: string) => {
  "use cache";
  cacheLife("hours");
  cacheTag("dashboard-data");

  // try-catch ব্লক অ্যাড করা হয়েছে যাতে honoFetch ফেইল করলে ক্র্যাশ না করে
  try {
    const { status, response } = await honoFetch<{
      success: boolean;
      data: DashboardData;
    }>("/api/admin/Dashboard", {
      headers: {
        Cookie: cookieString,
      },
    });

    return {
      status,
      response,
    };
  } catch (error) {
    console.error("Dashboard Fetch Error in Edge/Cloudflare:", error);
    
    // API ফেইল করলে একটি ডিফল্ট ফেইল স্ট্যাটাস রিটার্ন করবে
    return {
      status: 500,
      response: null,
    };
  }
};

export default FetchDashboardData;
