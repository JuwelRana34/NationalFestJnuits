import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock3, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

import { EventsResponse, FullEvent } from "@/features/Events/schema";
import { honoFetch } from "@/lib/hono-client";

function formatEventDate(dateValue: string | Date) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatEventTime(timeValue: string) {
  if (!timeValue) {
    return "Time unavailable";
  }

  return timeValue;
}

function getFillPercentage(event: FullEvent) {
  if (!event.seatsTotal || event.seatsTotal <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((event.seatsFilled / event.seatsTotal) * 100),
  );
}

function getStatusLabel(event: FullEvent) {
  const fillPercentage = getFillPercentage(event);

  if (fillPercentage >= 90) {
    return "Nearly full";
  }

  if (fillPercentage >= 50) {
    return "Active";
  }

  return "Open";
}

export default async function AdminEventsDataSection() {
  const { status, response } = await honoFetch<EventsResponse>("/api/events", {
    next: { revalidate: 3600, tags: ["events"] },
  });

  const events =
    status === 200 && response?.success && Array.isArray(response.data)
      ? response.data
      : [];

  if (events.length === 0) {
    return (
      <Card className="border-dashed border-slate-700 bg-slate-950/80 p-8 text-center">
        <p className="text-lg font-medium text-white">No events found</p>
        <p className="mt-2 text-sm text-slate-400">
          Events will appear here once they are created in the backend.
        </p>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">All events</h2>
          <p className="text-sm text-slate-400">
            Rendered on the server and refreshed from the API.
          </p>
        </div>
        <Badge variant="outline" className="border-white/10 text-slate-300">
          {events.length} total
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => {
          const fillPercentage = getFillPercentage(event);

          return (
            <Card
              key={event.id}
              className="flex h-full flex-col justify-between border-white/10 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge
                      variant="secondary"
                      className="w-fit bg-sky-500/10 text-sky-200 hover:bg-sky-500/10"
                    >
                      {event.type}
                    </Badge>
                    <h3 className="text-lg font-semibold text-white">
                      {event.title}
                    </h3>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/10">
                    {getStatusLabel(event)}
                  </Badge>
                </div>

                {event.subtitle ? (
                  <p className="text-sm text-slate-400">{event.subtitle}</p>
                ) : null}

                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    <span>{formatEventTime(event.time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-slate-400" />
                    <span>
                      {event.seatsFilled}/{event.seatsTotal} seats filled
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span>Occupancy</span>
                    <span>{fillPercentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Button
                
                  variant="outline"
                  className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link
                    prefetch={false}
                    href={`/admin/events/${event.id}/edit`}
                  >
                    Edit event
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
