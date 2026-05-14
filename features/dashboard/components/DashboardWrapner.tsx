import { honoFetch } from "@/lib/hono-client";
import { DashboardResponse } from "../Types";
import Dashboard from "./DashboardOverview";
import { cookies } from "next/headers";

export default async function DashboardWrapner() {
 const cookieStore = await cookies(); // ← কুকি নাও
 const allCookies = cookieStore
   .getAll()
   .map((c) => `${c.name}=${c.value}`)
   .join("; ");

     const { data } = await honoFetch<DashboardResponse>(
       "/api/users/dashboard",
       {
         headers: { allCookies },
       },
     );
    //  console.log("Dashboard data:", data);
    return <Dashboard DashboardData={data} />;
}