import { EventDetailsSkeleton } from "@/features/event/_components/EventDetailsContent";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 mt-16">
      <div className="mb-6 h-5 w-24 rounded bg-slate-700 animate-pulse" />
      <EventDetailsSkeleton />
    </main>
  );
}
