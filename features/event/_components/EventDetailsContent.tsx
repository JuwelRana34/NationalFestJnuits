import DynamicRegistrationForm from "@/features/event/_components/DynamicRegistrationForm";
import { Calendar, Clock, Info, MapPin, Wallet } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Assuming you have these shadcn/ui components installed.
// If not, run: npx shadcn-ui@latest add card badge separator skeleton
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { honoFetch } from "@/lib/hono-client";
import { GetEventValues } from "../types";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

type Props = {
  params: Promise<{
    slug: string;
  }>;
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

function getDaysLeft(deadline: string) {
  const diffMs = new Date(deadline).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function countdownStyle(daysLeft: number) {
  if (daysLeft <= 2)
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-800";
  if (daysLeft <= 7)
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-800";
  return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-800";
}

function countdownLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Last day to register";
  if (daysLeft === 1) return "1 day left to register";
  return `${daysLeft} days left to register`;
}

export async function EventDetailsContent({event}:{event: GetEventValues}) {
  
  const accent = getAccent(event.slug ?? event.title);
  const daysLeft = event.deadline ? getDaysLeft(event.deadline) : null;
  const showCountdown = event.isActive && daysLeft !== null && daysLeft >= 0;
  const registrationClosed =
    !event.isActive || (daysLeft !== null && daysLeft < 0);

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
    <div className="container mx-auto max-w-6xl pb-16">
      {/* Hero Section */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border bg-background shadow-lg sm:mt-10">
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
              className={`absolute inset-0 bg-linear-to-br ${accent.cover} opacity-90`}
            />
          )}

          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={`border backdrop-blur-md px-3 py-1 ${accent.chip}`}
              >
                {event.eventType}
              </Badge>

              {showCountdown && (
                <Badge
                  variant="outline"
                  className={`border backdrop-blur-md px-3 py-1 flex items-center gap-1.5 ${countdownStyle(daysLeft!)}`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {countdownLabel(daysLeft!)}
                </Badge>
              )}

              {registrationClosed && (
                <Badge
                  variant="secondary"
                  className="backdrop-blur-md bg-white/20 text-white hover:bg-white/30 border-white/10 px-3 py-1"
                >
                  Registration Closed
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl">
              {event.title}
            </h1>
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
              <Info className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-bold tracking-tight">
                About this event
              </h2>
            </div>
            <p className="leading-relaxed text-muted-foreground md:text-lg">
              <MarkdownRenderer content={event.description} />
            </p>
          </section>

          {/* Details Grid */}
          <section className="grid gap-4 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border-none bg-muted/40 shadow-none transition-colors hover:bg-muted/60"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accent.icon}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
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
          <Card className="sticky top-8 overflow-hidden shadow-xl border-border/50">
            {/* Soft decorative top border matching accent */}
            <div className={`h-1.5 w-full bg-linear-to-r ${accent.cover}`} />

            <CardHeader className="pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Registration Fee
                </span>
                <span className="text-4xl font-extrabold tracking-tight">
                  {event.fee === 0 ? "Free" : `৳${event.fee}`}
                </span>
              </div>

              {event.deadline && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Closes on{" "}
                  <span className="font-medium text-foreground">
                    {formatDate(event.deadline)} at {formatTime(event.deadline)}
                  </span>
                </p>
              )}
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              {registrationClosed ? (
                <div className="rounded-xl bg-destructive/10 p-5 text-center border border-destructive/20">
                  <p className="text-sm font-semibold text-destructive">
                    Registration for this event is closed.
                  </p>
                </div>
              ) : (
                <DynamicRegistrationForm
                  eventId={event.id}
                  schema={event.registrationSchema}
                  fee={event.fee}
                  eventType={event.eventType}
                  baseTeamSize={event.baseTeamSize}
                  maxExtraMembers={event.maxExtraMembers}
                  extraMemberFee={event.extraMemberFee}
                />
              )}
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
