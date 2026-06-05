"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateSegmentAction } from "@/features/Events/action";
import EventForm from "@/features/Events/components/EventForm";
import { FullEvent, SingleEventResponse } from "@/features/Events/schema";
import { honoFetch } from "@/lib/hono-client";

function mapEventToFormValues(event: FullEvent) {
  return {
    title: event.title,
    subtitle: event.subtitle,
    type: event.type as
      | "HACKATHON"
      | "APP_SHOWCASE"
      | "AI_ADVENTURE"
      | "IT_OLYMPIAD"
      | "TYPING_MASTER"
      | "ESPORTS"
      | "VISITOR"
      | "DEFAULT",
    extraMemberFee: event.extraMemberFee,
    description: event.description,
    image: event.image ?? "",
    date: event.date,
    time: event.time,
    venue: event.venue,
    seatsTotal: event.seatsTotal,
    responsible: event.responsible,
    isTeamEvent: event.isTeamEvent,
    minMembers: event.minMembers,
    maxMembers: event.maxMembers,
    prizeMoney: event.prizeMoney,
    fee: event.fee,
  };
}

interface EventEditClientProps {
  eventId: string;
}

export default function EventEditClient({ eventId }: EventEditClientProps) {
  const router = useRouter();
  const [event, setEvent] = useState<FullEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      setLoading(true);

      try {
        const { status, response } = await honoFetch<SingleEventResponse>(
          `/api/events/${eventId}`,
        );

        if (status === 200 && response?.success && response.data) {
          if (active) {
            setEvent(response.data);
          }
          return;
        }

        toast.error("Event not found or failed to load");
        router.push("/admin/events");
      } catch (error) {
        console.error("Failed to load event:", error);
        toast.error("Failed to load event");
        router.push("/admin/events");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      active = false;
    };
  }, [eventId, router]);

  if (loading || !event) {
    return <div className="p-6 text-slate-200">Loading event...</div>;
  }

  return (
    <EventForm
      mode="edit"
      title={`Edit ${event.title}`}
      description="Update the event details, organizers, and registration settings."
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      initialValues={mapEventToFormValues(event)}
      onCancel={() => router.push("/admin/events")}
      onSubmit={async (values) => {
        const response = await updateSegmentAction(event.id, values);

        if (!response.success) {
          toast.error(response.message || "Failed to update event");
          return;
        }

        toast.success("Event updated successfully");
        router.refresh();
      }}
    />
  );
}
