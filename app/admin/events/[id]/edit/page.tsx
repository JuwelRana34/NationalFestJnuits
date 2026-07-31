import EventForm from "@/features/event/_components/CreateEventForm";
import { GetEventValues } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";
import { Suspense } from "react";

// Next.js 15 এর জন্য params এর টাইপ Promise হবে
export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<EventFormSkeleton />}>
      <FetchingData params={params} />
    </Suspense>
  );
}

async function FetchingData({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  console.log("Fetching event data for ID:", id);
  // ২. এবার সেই id দিয়ে API কল করুন
  const { status, response } = await honoFetch<{
    success: boolean;
    data: GetEventValues;
  }>(`/api/events/update/${id}`);

  if (status === 200 && response) {
    console.log("Got data successfully");
  }

  const initialData = response?.data;

  if (!initialData) {
    return <div className="p-10 text-center">Event not found</div>;
  }
  return <EventForm initialData={initialData} />;
}
// স্কেলিটন কম্পোনেন্ট
function EventFormSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto border rounded p-6 bg-white my-10 animate-pulse">
      <div className="h-8 w-64 rounded bg-gray-200 mb-6" />
      <div className="space-y-4">
        <div className="h-40 rounded-lg bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 rounded bg-gray-100" />
          <div className="h-10 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
