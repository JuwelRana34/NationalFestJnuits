import React from "react";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen pt-20 bg-background font-sans">
      {/* Header Skeleton */}
      <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <ChevronLeft className="w-4 h-4" />
            <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton (Details) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Skeleton */}
            <div className="w-full aspect-[21/9] bg-slate-800 rounded-md animate-pulse border border-slate-800 shadow-md shadow-slate-700" />

            {/* Title & Badges Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-24 bg-slate-800 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-slate-800 rounded-full animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-10 w-3/4 bg-slate-800 rounded-md animate-pulse" />
                <div className="h-6 w-1/2 bg-slate-800 rounded-md animate-pulse" />
              </div>
            </div>

            <Separator className="bg-slate-800" />

            {/* Description Skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-48 bg-slate-800 rounded-md animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Organizers Skeleton */}
            <div className="space-y-4 pt-4">
              <div className="h-8 w-56 bg-slate-800 rounded-md animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <Card
                    key={i}
                    className="p-4 flex items-center gap-4 bg-slate-800 border-none animate-pulse"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-700 rounded" />
                      <div className="h-3 w-20 bg-slate-700 rounded" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Skeleton (Pricing & Details) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="overflow-hidden border-border shadow-lg bg-slate-800">
                {/* Header Pricing Area */}
                <div className="bg-secondary/5 p-6 border-b border-slate-700">
                  <div className="flex justify-between items-end mb-2">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
                      <div className="h-8 w-16 bg-slate-700 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="h-4 w-20 bg-slate-700 rounded animate-pulse ml-auto" />
                      <div className="h-6 w-24 bg-slate-700 rounded animate-pulse ml-auto" />
                    </div>
                  </div>
                </div>

                {/* Details List */}
                <div className="p-6 space-y-6">
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded bg-slate-700 animate-pulse mt-0.5" />
                        <div className="space-y-2">
                          <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
                          <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Progress Skeleton */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full animate-pulse" />
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-14 w-full bg-slate-700 rounded-md animate-pulse mt-4" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
