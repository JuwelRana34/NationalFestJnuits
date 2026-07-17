import { FeaturedEvents, FeaturedEventsSkeleton } from "@/features/event/_components/FeaturedEvents";
import { GetEventValues } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
const eventsPromise = honoFetch<{ success: boolean; data: GetEventValues[] }>(
  "/api/events",
);
 
  return (
    <main>
      {/* Hero — pure static, prerenders fine */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-16 text-center sm:py-24">
          <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Find events worth your time
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
            Discover workshops, meetups, and shows happening near you.
          </p>
          <Link
            href="/events"
            className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Browse All Events
          </Link>
        </div>
      </section>

      {/* Featured Events — dynamic (uses Date.now via getDaysLeft) */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Featured Events</h2>
            <p className="mt-1 text-muted-foreground">
              Explore our upcoming events.
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        <Suspense fallback={<FeaturedEventsSkeleton />}>
          <FeaturedEvents promise={eventsPromise} />
        </Suspense>
      </section>
    </main>
  );
}
