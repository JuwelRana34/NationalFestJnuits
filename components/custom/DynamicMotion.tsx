"use client";

import dynamic from "next/dynamic";


export const AnimatedContainer = dynamic(
  () => import("./AnimatedWrappers").then((mod) => mod.AnimatedContainer),
  { ssr: false },
);

export const AnimatedItem = dynamic(
  () => import("./AnimatedWrappers").then((mod) => mod.AnimatedItem),
  { ssr: false },
);

export const DashboardClient = dynamic(
  () => import("@/features/dashboard/components/DashboardClient"),
  { ssr: false },
);