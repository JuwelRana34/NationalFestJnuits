"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateSegmentAction } from "@/features/Events/action";
import EventForm from "@/features/Events/components/EventForm";
import { FullEvent } from "@/features/Events/schema";

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
  event: FullEvent;
}

export default function EventEditClient({ event }: EventEditClientProps) {
  const router = useRouter();

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
