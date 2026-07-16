import { demoEvents } from "@/app/constant/data";
import DynamicRegistrationForm from "@/features/event/_components/DynamicRegistrationForm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Wallet } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Same accent system as the events grid — keeps the type chip and
// fallback cover colour consistent between the card and this page.
const ACCENTS = [
  {
    cover: "from-violet-500 to-indigo-600",
    chip: "bg-violet-500/15 text-violet-100",
  },
  {
    cover: "from-rose-500 to-orange-500",
    chip: "bg-rose-500/15 text-rose-100",
  },
  {
    cover: "from-emerald-500 to-teal-600",
    chip: "bg-emerald-500/15 text-emerald-100",
  },
  { cover: "from-sky-500 to-blue-600", chip: "bg-sky-500/15 text-sky-100" },
  {
    cover: "from-amber-500 to-pink-500",
    chip: "bg-amber-500/15 text-amber-100",
  },
  {
    cover: "from-fuchsia-500 to-purple-600",
    chip: "bg-fuchsia-500/15 text-fuchsia-100",
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
  if (daysLeft <= 2) return "bg-red-500/15 text-red-100";
  if (daysLeft <= 7) return "bg-amber-500/15 text-amber-100";
  return "bg-emerald-500/15 text-emerald-100";
}

function countdownLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Last day to register";
  if (daysLeft === 1) return "1 day left to register";
  return `${daysLeft} days left to register`;
}

// This is the async part that reads `params` — kept inside <Suspense> on the page.
export async function EventDetailsContent({ params }: Props) {
  const { slug } = await params;
  const event = demoEvents.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

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
    { icon: Clock, label: "Registration Deadline", value: event.deadline },
    { icon: Calendar, label: "Event Date", value: event.eventDate },
    { icon: MapPin, label: "Venue", value: event.venue },
  ];

  return (
    <>
      {/* Cover / hero */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border">
        <div className="relative aspect-[16/9] w-full sm:aspect-[3/1]">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${accent.cover}`}
            />
          )}

          {/* legibility overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${accent.chip}`}
              >
                {event.eventType}
              </span>

              {showCountdown && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${countdownStyle(
                    daysLeft!,
                  )}`}
                >
                  <Clock className="h-3 w-3" />
                  {countdownLabel(daysLeft!)}
                </span>
              )}

              {registrationClosed && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  Registration Closed
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: description + details */}
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold">About this event</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4"
              >
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-base font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: registration */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                Registration fee
              </span>
              <span className="text-2xl font-bold">
                {event.fee === 0 ? "Free" : `৳${event.fee}`}
              </span>
            </div>

            {event.deadline && (
              <p className="mt-1 text-xs text-muted-foreground">
                Closes on {event.deadline}
              </p>
            )}

            <div className="mt-6 border-t pt-6">
              {registrationClosed ? (
                <div className="rounded-lg bg-rose-50 p-4 text-center text-sm text-rose-400 animate-pulse">
                  Registration for this event is no longer open.
                </div>
              ) : (
                <DynamicRegistrationForm
                  eventId={event.id}
                  schema={event.schemaFields}
                  fee={event.fee}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Skeleton shown while EventDetailsContent resolves `params` + finds the event.
export function EventDetailsSkeleton() {
  return (
    <div className="mt-6 animate-pulse space-y-8">
      <div className="aspect-[16/9] w-full rounded-2xl bg-muted sm:aspect-[3/1]" />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-3">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg border bg-muted/30" />
            ))}
          </div>
        </div>
        <div className="h-64 rounded-2xl border bg-muted/30 lg:col-span-1" />
      </div>
    </div>
  );
}
