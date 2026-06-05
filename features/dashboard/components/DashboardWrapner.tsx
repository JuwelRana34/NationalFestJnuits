import { honoFetch } from "@/lib/hono-client";
import { redirect } from "next/navigation";
import { DashboardResponse } from "../Types";
import Dashboard from "./DashboardOverview";
import { headers } from "next/headers";

export default async function DashboardWrapper() {
    const header = await headers();
  const { status, response } = await honoFetch<DashboardResponse>(
    "/api/users/dashboard",
    {
      headers: header,
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
