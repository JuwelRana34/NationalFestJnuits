import { demoEvents } from "@/app/constant/data";
import DynamicRegistrationForm from "@/features/event/_components/DynamicRegistrationForm";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventDetailsPage({ params }: Props) {
  const { slug } = await params;

  const event = demoEvents.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/events"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Events
      </Link>

      <div className="mt-6 rounded-2xl border p-8">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
          {event.eventType}
        </span>

        <h1 className="mt-4 text-4xl font-bold">{event.title}</h1>

        <p className="mt-6 text-muted-foreground">{event.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Registration Fee</p>
            <p className="mt-1 text-xl font-semibold">
              {event.fee === 0 ? "Free" : `৳${event.fee}`}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Registration Deadline
            </p>
            <p className="mt-1 text-xl font-semibold">{event.deadline}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Event Date</p>
            <p className="mt-1 text-xl font-semibold">{event.eventDate}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Venue</p>
            <p className="mt-1 text-xl font-semibold">{event.venue}</p>
          </div>
        </div>

        {event.schemaFields.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              Registration Information Required
            </h2>

            <div className="space-y-3">
              {event.schemaFields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{field.label}</p>

                    <p className="text-sm text-muted-foreground">
                      Type: {field.type}
                    </p>

                    {field.options && (
                      <p className="text-sm text-muted-foreground">
                        Options: {field.options}
                      </p>
                    )}
                  </div>

                  {field.required && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                      Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link
            href={`/register/${event.slug}`}
            className="inline-flex rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            Register Now
          </Link>

          <DynamicRegistrationForm
            eventId={event.id}
            schema={event.schemaFields}
          />
        </div>
      </div>
    </main>
  );
}
