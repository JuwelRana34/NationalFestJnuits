import { getEvents } from "@/actions/eventActions";
import CampusAmbassadorCard from "@/features/event/_components/CampusAmbassadorCard";
import {
  FeaturedEvents,
  FeaturedEventsSkeleton,
} from "@/features/event/_components/FeaturedEvents";
import { GetEventValues } from "@/features/event/types";
import Image from "next/image";
import { Suspense } from "react";

export default async function HomePage() {
  const eventData: GetEventValues[] = await getEvents();
 
   if (!eventData || eventData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen"> 
      <Image
       src={"/notFound.jpg"}
        alt="Not Found"
        width={400}
        height={400}
        className="object-contain rounded-lg opacity-80 "
        unoptimized
        
      />
     <p className="text-lg font-medium text-red-500">
        events not found!
      </p>
      </div>
    );
  }

  return (
    <main>
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mb-10   text-center">
          <div>
            <h2 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] sm:text-4xl">
              All Events
            </h2>
            <p className="mt-1 text-muted-foreground">
              Explore our All events.
            </p>
          </div>
        </div>

        <Suspense fallback={<FeaturedEventsSkeleton />}>
          <FeaturedEvents data={eventData} />
        </Suspense>

        {/* CampusAmbassador  */}
        <div className="mt-16">
          <Suspense fallback={<div>Loading Campus Ambassador Program...</div>}>
            <CampusAmbassadorCard />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
