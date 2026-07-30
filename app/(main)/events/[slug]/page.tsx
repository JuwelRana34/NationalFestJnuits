import { fetchSingleEvent } from "@/features/event/_components/actions";
import { EventDetailsContent } from "@/features/event/_components/EventDetailsContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 🎯 এটি আর async ফাংশন থাকবে না!
export default async function EventDetailsPage({ params }: Props) {
  const { slug } = await params;

  const { data, success } = await fetchSingleEvent(slug);
  const eventData = data ?? null;

  if (!success || !eventData) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 mt-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <EventDetailsContent eventData={data} />
    </main>
  );
}
