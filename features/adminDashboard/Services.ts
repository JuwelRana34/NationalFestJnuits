"use server";
import { DashboardData } from "@/features/adminDashboard/types";
import { honoFetch } from "@/lib/hono-client";
import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/dist/server/request/cookies";


const FetchDashboardData = async (cookieString: string) => {
  "use cache";
  cacheLife("hours");
  cacheTag("dashboard-data");

  
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
};

export default FetchDashboardData;
