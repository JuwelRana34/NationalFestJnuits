import { prizePoolData, specialRewards } from "@/app/constant/data";
import { fetchSingleEvent } from "@/features/event/_components/actions";
import { EventDetailsContent } from "@/features/event/_components/EventDetailsContent";
import { el } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 🎯 এটি আর async ফাংশন থাকবে না!
export default async function EventDetailsPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "brainchild-season-20") {
    redirect("https://brainchild.jnuits.org.bd/");
  }else if (slug === "techcare-zone") {
    redirect(
      "https://docs.google.com/forms/d/e/1FAIpQLSeJe2zz_582UQRK7f6B4zsBt1hOTIypR1uYq1ADTXlH6R-lfw/viewform",
    );
  }else if (slug === "robo-soccer") {
    redirect(
      "https://docs.google.com/forms/d/e/1FAIpQLScIZUFIfN7OFgK-Hyw6UCPc8gFygAMjJIi4kOSz_7m9FrD72w/viewform",
    );
  }

  const { data, success } = await fetchSingleEvent(slug);
  const eventData = data ?? null;

  if (!success || !eventData) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-2 py-5 ">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <EventDetailsContent
        eventData={data}
        prizeData={prizePoolData}
        specialRewards={specialRewards}
      />
    </main>
  );
}
