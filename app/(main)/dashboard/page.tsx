import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome to Dashboard</h2>
      <DashboardOverview />
    </div>
  );
}