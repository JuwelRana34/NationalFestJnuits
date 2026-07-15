import { demoEvents } from "@/app/constant/data";
import Link from "next/link";


export default function HomePage() {
  const featuredEvents = demoEvents;

  return (
    <main>
      {/* Hero */}
      <section className="bg-linear-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6 py-24 text-center">
          <span className="rounded-full border px-4 py-2 text-sm">
            🎉 Event Registration Platform
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Discover Amazing <br />
            Events Around You
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Join workshops, competitions, seminars and hackathons. Register
            online, manage your participation and never miss an opportunity.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/events"
              className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
            >
              Browse Events
            </Link>

            <Link href="/dashboard" className="rounded-lg border px-6 py-3">
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>

            <p className="text-muted-foreground">
              Explore our upcoming events.
            </p>
          </div>

          <Link href="/events" className="font-medium text-primary">
            View All →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border p-6 transition hover:shadow-lg"
            >
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                {event.eventType}
              </span>

              <h3 className="mt-4 text-xl font-semibold">{event.title}</h3>

              <p className="mt-3 line-clamp-3 text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p>📅 {event.eventDate}</p>
                <p>📍 {event.venue}</p>
                <p>💰 {event.fee === 0 ? "Free" : `৳${event.fee}`}</p>
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="mt-6 inline-block font-medium text-primary"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
