"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function getDaysLeft(deadline: string) {
  const diffMs = new Date(deadline).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function countdownStyle(daysLeft: number) {
  if (daysLeft <= 2)
    return "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300";
  if (daysLeft <= 7)
    return "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
}

function countdownLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Last day";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft} days left`;
}

type Props = {
  deadline: string | null;
  isActive: boolean;
};

export default function FeaturedEventCountdownBadge({
  deadline,
  isActive,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // requestAnimationFrame prevents synchronous cascading render warnings
    const frameId = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Avoid rendering during SSR to prevent hydration mismatches
  if (!isMounted) return null;

  const daysLeft = deadline ? getDaysLeft(deadline) : null;
  const isClosed = !isActive || (daysLeft !== null && daysLeft < 0);

  // If the event is inactive or deadline has passed
  if (isClosed) {
    return (
      <Badge variant={"destructive"} className="rounded-full  px-2.5 py-1 text-xs font-semibold bg-rose-200 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
        Closed!
      </Badge>
    );
  }

  // If the event is active and has a valid deadline
  if (daysLeft !== null && daysLeft >= 0) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${countdownStyle(
          daysLeft,
        )}`}
      >
        <Clock className="h-3 w-3" />
        {countdownLabel(daysLeft)}
      </span>
    );
  }

  return null;
}
