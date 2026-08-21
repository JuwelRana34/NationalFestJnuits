"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface InfinitePartnerAndSponsorsProps {
  data: {
    name: string;
    role: string;
    imageUrl?: string;
  }[];
  direction: "left" | "right";
  title: string;
}

export function InfinitePartnerAndSponsors({ data, direction, title }: InfinitePartnerAndSponsorsProps) {
  return (
    <div className=" rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h1 className="text-gradient text-2xl  md:text-5xl font-bold mb-4 text-left">{title}</h1>
      <InfiniteMovingCards items={data} direction={direction} speed="slow" />
    </div>
  );
}
