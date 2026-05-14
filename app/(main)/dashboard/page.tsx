import { Skeleton } from "@/components/ui/skeleton";
import DashboardWrapner from "@/features/dashboard/components/DashboardWrapner";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="min-h-screen pt-20 pb-32">
      <Suspense
        fallback={
          <div className="text-center py-20">
            <Skeleton className="mx-auto mb-4 h-10 w-48 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Sparkles
              size={28}
              className="text-yellow-500 mx-auto mt-6 animate-pulse"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Loading your dashboard...
            </p>
          </div>
        }
      >
        <DashboardWrapner />
      </Suspense>
    </div>
  );
}
