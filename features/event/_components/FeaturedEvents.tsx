import { connection } from "next/server";
import { demoEvents } from "@/app/constant/data";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";

const ACCENTS = [
  {
    cover: "from-violet-500 to-indigo-600",
    chip: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    cover: "from-rose-500 to-orange-500",
    chip: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
  {
    cover: "from-emerald-500 to-teal-600",
    chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    cover: "from-sky-500 to-blue-600",
    chip: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    cover: "from-amber-500 to-pink-500",
    chip: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    cover: "from-fuchsia-500 to-purple-600",
    chip: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  },
];

function getAccent(seed: string) {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ACCENTS[hash % ACCENTS.length];
}

function getDaysLeft(deadline: string) {
  const diffMs = new Date(deadline).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function countdownStyle(daysLeft: number) {
  if (daysLeft <= 2)
    return "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300";
  if (daysLeft <= 7)
    return "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
}

function countdownLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Last day";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft} days left`;
}

export async function FeaturedEvents() {
  await connection(); // explicitly opts this subtree into request-time rendering

  const featuredEvents = demoEvents;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredEvents.map((event) => {
        const accent = getAccent(event.slug ?? event.title);
        const daysLeft = event.deadline ? getDaysLeft(event.deadline) : null;
        const showCountdown =
          event.isActive && daysLeft !== null && daysLeft >= 0;

        return (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br p-6 ${accent.cover}`}
                >
                  <span className="text-center text-lg font-semibold leading-snug text-white">
                    {event.title}
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

              <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${accent.chip}`}
                >
                  {event.eventType}
                </span>

                {showCountdown && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${countdownStyle(daysLeft!)}`}
                  >
                    <Clock className="h-3 w-3" />
                    {countdownLabel(daysLeft!)}
                  </span>
                )}

                {!event.isActive && (
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-700 backdrop-blur">
                    Closed
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
                {event.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{event.eventDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
                <div>
                  <p className="text-base font-semibold">
                    {event.fee === 0 ? "Free" : `৳${event.fee}`}
                  </p>
                  {event.deadline && (
                    <p className="text-xs text-muted-foreground">
                      Register by {event.deadline}
                    </p>
                  )}
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function FeaturedEventsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border bg-card"
        >
          <div className="aspect-video w-full bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
