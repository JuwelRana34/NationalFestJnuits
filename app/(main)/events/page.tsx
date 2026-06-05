// /events
import { Events } from "@/components/custom/DynamicMotion";
import { EventCardItem, EventsResponse } from "@/features/Events/schema";
import { honoFetch } from "@/lib/hono-client";
import { Suspense } from "react";



export default function EventPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="pt-20 flex min-h-screen justify-center items-center rounded">
            Loading events...
          </div>
        }
      >
        <EventDataFetch />
      </Suspense>
    </>
  );
}

async function EventDataFetch() {
  const { status, response } = await honoFetch<EventsResponse>("/api/events");

  const events =
    status === 200 && response?.success && Array.isArray(response.data)
      ? response.data.map(
          (event): EventCardItem => ({
            id: event.id,
            title: event.title,
            subtitle: event.subtitle,
            type: event.type,
            date: event.date,
            time: event.time,
            venue: event.venue,
            fee: event.fee,
            seatsTotal: event.seatsTotal,
            seatsFilled: event.seatsFilled,
            isTeamEvent: event.isTeamEvent,
            minMembers: event.minMembers,
            maxMembers: event.maxMembers,
            extraMemberFee: event.extraMemberFee,
          }),
        )
      : [];

  return (
    <>
      {events.length === 0 ? (
        <div className="pt-20 flex min-h-screen justify-center items-center rounded">
          No events found!
        </div>
      ) : (
        <Events eventsData={events} />
      )}
    </>
  );
}
