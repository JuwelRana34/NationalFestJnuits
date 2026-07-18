import { EventDetailsContent } from "@/features/event/_components/EventDetailsContent";
import { GetEventValues } from "@/features/event/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventDetailsPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${process.env.localApi}/api/events/${slug}`, {
    next: { revalidate: 3600 },
  });

  console.log("Event Details API Response:", res);
  if (!res.ok) {
    return notFound();
  }

  const { data } = (await res.json()) as {
    success: boolean;
    data: GetEventValues;
  };

  if (!data) {
    return notFound();
  }

  const event = data ?? null;

  if (!event) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 mt-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <EventDetailsContent event={data} />
    </main>
  );
}
