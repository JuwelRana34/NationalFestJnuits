import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";

import CreateSegmentForm from "@/features/Events/components/SegmentCreation";
import AdminEventsDataSection from "./_components/AdminEventsDataSection";
import AdminEventsRefreshButton from "./_components/AdminEventsRefreshButton";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-blue-950 via-blue-900 to-blue-950 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.08),transparent_30%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge
              variant="outline"
              className="w-fit border-sky-500/30 text-sky-300 backdrop-blur-xl  
               bg-white/10"
            >
              Admin events
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Events dashboard
              </h1>
              <p className="max-w-xl text-sm text-slate-300 md:text-base">
                Review published events, check registration totals, and open the
                edit flow from one server-rendered page.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AdminEventsRefreshButton />
            <Button disabled className="bg-sky-500 text-white ">
              Create flow not added yet
            </Button>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CalendarDays className="h-4 w-4 text-sky-300" />
              Published events
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">Live list</p>
          </Card>
          <Card className="border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Users className="h-4 w-4 text-emerald-300" />
              Registration tracking
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">SSR data</p>
          </Card>
          <Card className="border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Actions
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">Edit links</p>
          </Card>
        </div>
      </section>

      <Suspense fallback={<AdminEventsLoadingState />}>
        <AdminEventsDataSection />
      </Suspense>

      <CreateSegmentForm />
    </div>
  );
}

function AdminEventsLoadingState() {
  return (
    <Card className="border-white/10 bg-slate-950/80 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="mt-4 h-6 w-3/4 rounded bg-white/10" />
            <div className="mt-3 h-4 w-full rounded bg-white/10" />
            <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
            <div className="mt-6 h-9 w-full rounded bg-white/10" />
          </div>
        ))}
      </div>
    </Card>
  );
}
