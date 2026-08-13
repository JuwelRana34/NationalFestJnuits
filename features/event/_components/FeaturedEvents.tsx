import { Separator } from "@/components/ui/separator";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { GetEventValues } from "../types";
import FeaturedEventCountdownBadge from "./FeaturedEventCountdownBadge";

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

export async function FeaturedEvents({ data }: { data: GetEventValues[] }) {
  const featuredEvents = data || [];
  await connection();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredEvents.map((event) => {
        const accent = getAccent(event.slug ?? event.title);

        return (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-card transition hover:-translate-y-0.5 hover:shadow-lg"
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
                  className={`flex h-full w-full items-center justify-center bg-linear-to-br p-6 ${accent.cover}`}
                >
                  <span className="text-center text-lg font-semibold leading-snug text-white">
                    {event.title}
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/40 to-transparent" />

              <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${accent.chip}`}
                >
                  {event.eventType}
                </span>

                <FeaturedEventCountdownBadge
                  deadline={event.deadline}
                  isActive={event.isActive}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
                {event.title}
              </h3>

              <div className="mt-4 flex flex-col gap-2 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>
                    {formatDate(event.eventDate)} at{" "}
                    {formatTime(event.eventDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              <Separator className="my-2 bg-slate-700" />
              <div className="mt-0 flex items-center justify-between gap-3  ">
                <div>
                  <p className=" text-2xl  font-bold text-white">
                    {event.fee === 0 ? "Free" : `৳${event.fee}`}
                  </p>

                  {event.deadline && (
                    <p className="mt-1 text-xs text-white/60">
                      Register by{" "}
                      <span className="font-medium text-cyan-300">
                        {formatDate(event.deadline)}
                      </span>
                    </p>
                  )}
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                  Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
          className="animate-pulse overflow-hidden rounded-xl border bg-slate-800"
        >
          <div className="aspect-video w-full bg-slate-700" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-slate-600" />
            <div className="h-4 w-full rounded bg-slate-600" />
            <div className="h-4 w-2/3 rounded bg-slate-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
