import {
  FeaturedEvents,
  FeaturedEventsSkeleton,
} from "@/features/event/_components/FeaturedEvents";
import { GetEventValues } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  let eventData: GetEventValues[] = [];

  try {
    const { status, response } = await honoFetch<{
      success: boolean;
      data: GetEventValues[];
    }>("/api/events");

    if (status === 200 && response) {
      eventData = response.data;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <p className="text-red-500">
        Failed to load events. Please try again later.
      </p>
    );
  }

  return (
    <main>
      {/* Featured Events — dynamic (uses Date.now via getDaysLeft) */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mb-10   text-center">
          <div>
            <h2 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] sm:text-4xl">
              All Events
            </h2>
            <p className="mt-1 text-muted-foreground">
              Explore our All events.
            </p>
          </div>
          {/* <Link
            href="/events"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All →
          </Link> */}
        </div>

        <Suspense fallback={<FeaturedEventsSkeleton />}>
          <FeaturedEvents data={eventData} />
        </Suspense>
      </section>
    </main>
  );
}
