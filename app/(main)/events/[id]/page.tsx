import SegmentDetailsPage from "@/features/Events/components/EventDetails";
import Loading from "@/features/Events/components/SegmentLoasder";
import { Suspense } from "react";

export interface SingleEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleEvent({ params }:SingleEventPageProps) {


  return (
    <main>
      <Suspense fallback={<Loading/>}>
        <SegmentDetailsPage params={params} />
      </Suspense>
    </main>
  );
}
