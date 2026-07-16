import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventDetailsContent, EventDetailsSkeleton } from "@/features/event/_components/EventDetailsContent";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function EventDetailsPage({ params }: Props) {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 mt-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <Suspense fallback={<EventDetailsSkeleton />}>
        <EventDetailsContent params={params} />
      </Suspense>
    </main>
  );
}
