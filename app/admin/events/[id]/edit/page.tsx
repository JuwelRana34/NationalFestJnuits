// import { notFound } from "next/navigation";
// import { Suspense } from "react";

// import { SingleEventResponse } from "@/features/Events/schema";
// import { honoFetch } from "@/lib/hono-client";
// import EventEditClient from "./EventEditClient";
// import { cacheLife, cacheTag } from "next/cache";

// async function EventEditContent({ id }: { id: string }) {
//    " use cached";
//     cacheTag("articles");
//     cacheLife("hours");

//   const { status, response } = await honoFetch<SingleEventResponse>(
//     `/api/events/${id}`,
//     {
//       next: { revalidate: 60 },
//     },
//   );

//   if (status !== 200 || !response?.success || !response.data) {
//     notFound();
//   }

//   return <EventEditClient event={response.data} />;
// }

// function LoadingFallback() {
//   return (
//     <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         <div className="mb-8 space-y-3">
//           <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
//           <div className="h-10 w-64 bg-slate-800 rounded animate-pulse" />
//           <div className="h-5 w-96 bg-slate-800 rounded animate-pulse" />
//         </div>
//         <div className="space-y-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="h-64 bg-slate-800 rounded animate-pulse" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface AdminEventEditPageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function AdminEventEditPage({
//   params,
// }: AdminEventEditPageProps) {
//   const { id } = await params;

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <EventEditContent id={id} />
//     </Suspense>
//   );
// }

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";

import { SingleEventResponse } from "@/features/Events/schema";
import { honoFetch } from "@/lib/hono-client";
import EventEditClient from "./EventEditClient";

// 1. The cached content component expects a resolved string 'id'
async function EventEditContent({ id }: { id: string }) {
  const { status, response } = await honoFetch<SingleEventResponse>(
    `/api/events/${id}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (status !== 200 || !response?.success || !response.data) {
    notFound();
  }

  return <EventEditClient event={response.data} />;
}

// 2. A wrapper component to resolve the Promise INSIDE the Suspense boundary
async function EventEditWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventEditContent id={id} />;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
          <div className="h-10 w-64 bg-slate-800 rounded animate-pulse" />
          <div className="h-5 w-96 bg-slate-800 rounded animate-pulse" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface AdminEventEditPageProps {
  params: Promise<{ id: string }>;
}

// 3. The main page component acts purely as a Suspense provider
export default function AdminEventEditPage({
  params,
}: AdminEventEditPageProps) {
    
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EventEditWrapper params={params} />
    </Suspense>
  );
}