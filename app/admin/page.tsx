import DashboardOverviewPage from "@/features/adminDashboard/adminDashboardOverview";
import { getFormattedCookies } from "@/lib/getCookie";
import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading dashboard data...</div>}>
        <DashboardWrapper />
      </Suspense>
    </div>
  );
}

export const DashboardWrapper = async () => {
  const cookie = await getFormattedCookies();

  return (
    <div>
      <Suspense fallback={<div>Loading dashboard data...</div>}>
        <DashboardOverviewPage cookies={cookie} />
      </Suspense>
    </div>
  );
};
