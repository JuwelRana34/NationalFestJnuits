import {
  Calendar,
  Clock,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";

import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { GetEventValues } from "../types";
import CountdownLabel, {
  RegistrationClosedBadge,
  RegistrationClosedMessage,
} from "./CountdownLabel";

type Props = {
  eventData: GetEventValues | null;
};
// Polished accent system with refined opacities and vivid gradients
const ACCENTS = [
  {
    cover: "from-violet-600 via-indigo-500 to-purple-600",
    chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  },
  {
    cover: "from-rose-500 via-red-500 to-orange-500",
    chip: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    icon: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    cover: "from-emerald-500 via-teal-500 to-cyan-600",
    chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    cover: "from-sky-500 via-blue-500 to-indigo-600",
    chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    icon: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  },
  {
    cover: "from-amber-400 via-orange-400 to-pink-500",
    chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

function getAccent(seed: string) {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ACCENTS[hash % ACCENTS.length];
}

export async function EventDetailsContent({ eventData }: Props) {
  if (!eventData) return null;
  const event = eventData;

  const accent = getAccent(event.slug ?? event.title);

  const details = [
    {
      icon: Wallet,
      label: "Registration Fee",
      value: event.fee === 0 ? "Free" : `৳${event.fee}`,
    },
    {
      icon: Clock,
      label: "Registration Deadline",
      value: formatDate(event.deadline),
    },
    { icon: Calendar, label: "Event Date", value: formatDate(event.eventDate) },
    { icon: MapPin, label: "Venue", value: event.venue },
  ];

  return (
    <div className="container px-2 mx-auto max-w-6xl pb-5">
      {/* Hero Section */}
      <div className="relative mt-2 overflow-hidden rounded-xl border border-slate-800 shadow-blue-500/20 bg-background shadow-lg sm:mt-10">
        <div className="relative aspect-video w-full sm:aspect-21/9">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-linear-to-br ${accent.cover} opacity-80`}
            />
          )}

          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge
                variant="ghost"
                className={`border border-slate-700 backdrop-blur-md px-3 py-1`}
              >
                {event.eventType}
              </Badge>

              <CountdownLabel
                deadline={event.deadline}
                isActive={event.isActive}
              />

              <RegistrationClosedBadge event={event} />
            </div>

            {/* <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-xl md:text-6xl max-w-4xl">
              {event.title}
            </h1> */}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Left Column: Description & Details */}
        <div className="space-y-10 lg:col-span-2">
          {/* About Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold tracking-tight text-orange-400">
                About this event
              </h2>
            </div>
            <div className="leading-relaxed text-muted-foreground md:text-lg">
              <MarkdownRenderer content={event.description} />
            </div>

            {event.responsible && event.responsible.length > 0 && (
              <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2.5 mb-5 border-b border-slate-800 pb-4">
                  <div className="p-1.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                    <ShieldCheck size={18} className="text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Responsible Persons
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.responsible.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/70 transition-colors group"
                    >
                      {/* Avatar Icon */}
                      <div className="w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center shrink-0 group-hover:border-indigo-500/30 transition-colors">
                        <User
                          size={18}
                          className="text-slate-400 group-hover:text-indigo-300"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-200 text-sm truncate capitalize">
                          {person.name || "Unknown"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <Phone size={12} />
                          <a
                            href={`tel:${person.phone}`}
                            className="text-xs font-mono hover:underline hover:text-indigo-400"
                          >
                            {person.phone || "N/A"}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Details Grid */}
          <section className="grid gap-4 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border-none backdrop-blur-md bg-white/10 shadow-none transition-colors hover:bg-transparent hover:shadow-lg"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accent.icon}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-300 dark:text-slate-300">
                      {label}
                    </p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>

        {/* Right Column: Sticky Registration Ticket */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 pt-0 overflow-hidden shadow-lg *:transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop:blur-xl bg-white/5 ">
            {/* Soft decorative top border matching accent */}
            <div className={`h-1.5 w-full bg-linear-to-r ${accent.cover}`} />

            <CardHeader className="pb-6 ">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium uppercase tracking-wider text-slate-300 dark:text-slate-300">
                  Registration Fee
                </span>
                <span className="text-4xl font-extrabold tracking-tight text-primary">
                  {event.fee === 0 ? "Free" : `৳${event.fee}`}
                </span>
              </div>

              {event.deadline && (
                <p className="mt-2 text-sm text-primary/80">
                  Closes on
                  <span className="font-medium text-slate-200 animate-pulse px-2">
                    {formatDate(event.deadline)} at {formatTime(event.deadline)}
                  </span>
                </p>
              )}
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              <RegistrationClosedMessage event={event} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Skeleton state using shadcn <Skeleton /> components for a polished loading experience
export function EventDetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl mt-8 sm:mt-10 pb-16 space-y-8">
      {/* Hero Skeleton */}
      <Skeleton className="aspect-[16/9] w-full rounded-3xl sm:aspect-[21/9]" />

      <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Left Column Skeleton */}
        <div className="space-y-10 lg:col-span-2">
          {/* Text block */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right Column Registration Card Skeleton */}
        <div className="lg:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
