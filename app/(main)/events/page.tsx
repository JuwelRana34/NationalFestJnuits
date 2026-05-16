// /events
import { Events } from "@/components/custom/DynamicMotion";
import { EventsResponse, FullEvent } from "@/features/Events/schema";
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
  const { response } = await honoFetch<EventsResponse>("/api/events",{
    // next: { revalidate: 86000, tags: [`events`] },
  })
  
  return (
    <>
      {response?.data?.length === 0 ? (
        <div className="pt-20 flex min-h-screen justify-center items-center rounded">
          No events found!
        </div>
      ) : (
        <Events eventsData={response?.data as FullEvent[]} />
      )}
    </>
  );
}
