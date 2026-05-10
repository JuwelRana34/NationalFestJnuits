"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton"; 

const MarkdownRenderer = dynamic(
  () => import("@/components/custom/MarkdownRenderer"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-32" />,
  },
);

export default function MarkdownWrapper({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
}
