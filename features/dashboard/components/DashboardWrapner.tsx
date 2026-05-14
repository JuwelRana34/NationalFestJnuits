import { honoFetch } from "@/lib/hono-client";
import { DashboardResponse } from "../Types";
import Dashboard from "./DashboardOverview";
import { cookies } from "next/headers";

export default async function DashboardWrapner() {
  const cookieStore = await cookies();

const cookie = cookieStore
  .getAll()
  .filter((c) => c.name.includes("better-auth")) 
  .map((c) => `${c.name}=${c.value}`)
  .join("; ");

  const { data } = await honoFetch<DashboardResponse>("/api/users/dashboard");

    return <Dashboard DashboardData={data} />;
}