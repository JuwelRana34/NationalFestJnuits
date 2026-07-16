import CreateEventForm from "@/features/event/_components/CreateEventForm";
import { Suspense } from "react";


export default function CreateEventPage() {
  return (
    <Suspense fallback={<CreateEventFormSkeleton />}>
      <CreateEventForm />
    </Suspense>
  );
}

function CreateEventFormSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto border rounded p-2 bg-white my-10 animate-pulse">
      <div className="h-8 w-64 rounded bg-gray-200 mb-6" />
      <div className="space-y-4">
        <div className="h-40 rounded-lg bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 rounded bg-gray-100" />
          <div className="h-10 rounded bg-gray-100" />
        </div>
        <div className="h-24 rounded bg-gray-100" />
      </div>
    </div>
  );
}
