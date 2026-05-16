import { honoFetch } from "@/lib/hono-client";
import { redirect } from "next/navigation";
import { DashboardResponse } from "../Types";
import Dashboard from "./DashboardOverview";

export default async function DashboardWrapper() {
  const { status, response } = await honoFetch<DashboardResponse>(
    "/api/users/dashboard",
    {
      next: { revalidate: 86400, tags: ["dashboard-data"] },
    },
  );

  if (status === 401) {
    redirect("/");
  }

  if (status !== 200 || !response) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {response?.message || "Something went wrong!"}
      </div>
    );
  }

  return <Dashboard DashboardData={response.data} />;
}
