"use server";
import { DashboardData } from "@/features/adminDashboard/types";
import { honoFetch } from "@/lib/hono-client";
import { cacheLife, cacheTag } from "next/cache";


const FetchDashboardData = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("dashboard-data");

  const { status, response } = await honoFetch<{
    success: boolean;
    data: DashboardData;
  }>("/api/admin/Dashboard");

  return {
    status,
    response,
  };
};

export default FetchDashboardData;
