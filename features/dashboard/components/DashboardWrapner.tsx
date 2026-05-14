import { honoFetch } from "@/lib/hono-client";
import { DashboardResponse } from "../Types";
import Dashboard from "./DashboardOverview";

export default async function DashboardWrapner() {
    
     const { data } = await honoFetch<DashboardResponse>("/api/users/dashboard");
    return <Dashboard DashboardData={data} />;
}