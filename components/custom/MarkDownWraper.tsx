"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MarkdownWrapper = dynamic(() => import("./MarkdownRenderer"), {
  loading: () => (
    <Skeleton className="animate-pulse h-20 bg-slate-800 rounded-md "></Skeleton>
  ),
  ssr: false,
});

export default MarkdownWrapper;
