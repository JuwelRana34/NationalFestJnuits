"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { GetEventValues } from "../types";
import DynamicRegistrationForm from "./DynamicRegistrationForm";

function getDaysLeft(deadline: string) {
  const diffMs = new Date(deadline).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function countdownStyle(daysLeft: number) {
  if (daysLeft <= 2)
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-800";
  if (daysLeft <= 7)
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-800";
  return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-800";
}

function countdownLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Last day to register";
  if (daysLeft === 1) return "1 day left to register";
  return `${daysLeft} days left to register`;
}

type CountdownLabelProps = {
  deadline: string | null;
  isActive: boolean;
};

export default function CountdownLabel({
  deadline,
  isActive,
}: CountdownLabelProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defer the state update to avoid synchronous cascading renders.
    // This perfectly satisfies the linter and avoids hydration mismatch.
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // If it hasn't mounted (server render) or data is missing, render nothing.
  if (!isMounted || !isActive || !deadline) {
    return null;
  }

  const daysLeft = getDaysLeft(deadline);

  if (daysLeft < 0) {
    return null;
  }

  return (
    <Badge
      variant="ghost"
      className={`backdrop-blur-md px-3 py-1 ${countdownStyle(daysLeft)}`}
    >
      <Clock className="h-3.5 w-3.5 mr-1.5" />
      {countdownLabel(daysLeft)}
    </Badge>
  );
}

export function RegistrationClosedBadge({event}: {event: GetEventValues}) {
  const daysLeft = event.deadline ? getDaysLeft(event.deadline) : null;

  const registrationClosed =
    !event.isActive || (daysLeft !== null && daysLeft < 0);

  return (
    registrationClosed && (
      <Badge variant="destructive" className="backdrop-blur-md  px-3 py-1">
        Registration Closed
      </Badge>
    )
  );
}

export function RegistrationClosedMessage({event}: {event: GetEventValues}) {
  const daysLeft = event.deadline ? getDaysLeft(event.deadline) : null;

  const registrationClosed =
    !event.isActive || (daysLeft !== null && daysLeft < 0);

  return registrationClosed ? (
    <div className="rounded-xl bg-destructive/10 p-5 text-center border border-destructive/20">
      <p className="text-sm font-semibold text-destructive">
        Registration for this event is closed.
      </p>
    </div>
  ) : (
    <DynamicRegistrationForm
      eventId={event.id}
      schema={event.registrationSchema}
      fee={event.fee}
      eventType={event.eventType}
      baseTeamSize={event.baseTeamSize}
      maxExtraMembers={event.maxExtraMembers}
      extraMemberFee={event.extraMemberFee}
    />
  );
}
