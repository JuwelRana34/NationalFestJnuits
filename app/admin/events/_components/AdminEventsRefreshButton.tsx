"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminEventsRefreshButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => router.refresh()}
      className="border-white/10 bg-white/10 text-white hover:bg-white/10"
    >
      <RefreshCw className="mr-2 h-4 w-4" />
      Refresh
    </Button>
  );
}
