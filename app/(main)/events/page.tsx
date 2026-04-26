"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/features/Events/components/EventCard";
import { eventData } from "@/DemoData/demoData";

export interface EventCardProps {
  id: string | number;
  title: string;
  image: string;
  subtitle?: string;
  type?: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  fee?: string;
  seatsTotal: number;
  seatsFilled: number;
  onRegister?: () => void;
}

// Mock Data for the Events matching your EventCard Props
// const eventsData: EventCardProps[] = [
//   {
//     id: "1",
//     title: "CODE",
//     subtitle: "NINJA",
//     type: "Programming",
//     description:
//       "Battle it out with the best algorithmic minds in the national competitive programming contest.",
//     date: "15 April, 2026",
//     time: "10:00 AM",
//     venue: "Computer Lab, CSE Dept",
//     fee: "Free",
//     seatsTotal: 120,
//     seatsFilled: 95,
//     image: "/placeholder-event.jpg", // Added to satisfy interface
//   },
//   {
//     id: "2",
//     title: "IDEA",
//     subtitle: "PITCH",
//     type: "Competition",
//     description:
//       "Present your innovative startup ideas to industry leaders and win seed funding opportunities.",
//     date: "16 April, 2026",
//     time: "11:30 AM",
//     venue: "JnU Central Auditorium",
//     fee: "300",
//     seatsTotal: 50,
//     seatsFilled: 22,
//     image: "/placeholder-event.jpg",
//   },
//   {
//     id: "3",
//     title: "CYBER",
//     subtitle: "DEFENDERS",
//     type: "Workshop",
//     description:
//       "Learn hands-on ethical hacking and cybersecurity defense mechanisms from industry experts.",
//     date: "17 April, 2026",
//     time: "02:00 PM",
//     venue: "Virtual Platform",
//     fee: "Free",
//     seatsTotal: 200,
//     seatsFilled: 180,
//     image: "/placeholder-event.jpg",
//   },
//   {
//     id: "4",
//     title: "VALORANT",
//     subtitle: "CLASH",
//     type: "Gaming",
//     description:
//       "Assemble your squad and dominate the server in the ultimate E-Sports championship.",
//     date: "15-17 April, 2026",
//     time: "Multiple",
//     venue: "Virtual & On-Premise",
//     fee: "500",
//     seatsTotal: 64, // Squads
//     seatsFilled: 48,
//     image: "/placeholder-event.jpg",
//   },
//   {
//     id: "5",
//     title: "ROBO",
//     subtitle: "SOCCER",
//     type: "Exhibition",
//     description:
//       "Build and control your bots in a thrilling mechanical football tournament.",
//     date: "16 April, 2026",
//     time: "10:00 AM",
//     venue: "Science Faculty Ground",
//     fee: "400",
//     seatsTotal: 30,
//     seatsFilled: 15,
//     image: "/placeholder-event.jpg",
//   },
// ];

export default function Events() {
  const [activeTab, setActiveTab] = useState<string>("All");

  // Extract unique categories for the Tabs
  const categories = [
    "All",
    ...Array.from(new Set(eventData.map((event) => event.type as string))),
  ];

  const filteredEvents =
    activeTab === "All"
      ? eventData
      : eventData.filter((event) => event.type === activeTab);

  return (
    // Background matched with your EventCard's dark theme vibe
    <div className="min-h-screen bg-[#050810] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-14 space-y-4 md:space-y-5">
        <Badge
          variant="outline"
          className="px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border-amber-400/30 text-amber-400 bg-amber-400/10"
        >
          Discover The Challenges
        </Badge>
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Fest <span className="text-amber-400">Events</span>
        </h1>
        <p className="text-white/50 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-medium px-2">
          Filter and register for the competitions, workshops, and gaming
          segments of the JnUITS National Fest 2026.
        </p>
      </div>

      {/* Tabs and Cards Section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
        <Tabs
          defaultValue="All"
          className="w-full flex flex-col items-center"
          onValueChange={setActiveTab}
        >
          {/* Scrollable TabsList for Mobile */}
          <div className="w-full max-w-full overflow-x-auto pb-4 mb-6 md:mb-10 flex justify-start md:justify-center scrollbar-hide">
            <TabsList className="flex flex-nowrap md:flex-wrap h-auto gap-1 py-1.5  bg-[#0a0f1e] border border-white/5 rounded-xl shadow-2xl min-w-max">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-lg px-4 md:px-6 py- md:py-2.5 text-xs md:text-sm font-bold tracking-wide uppercase text-white/50 data-[state=active]:bg-amber-400 data-[state=active]:text-[#0a0f1e] transition-all duration-300 whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent
            value={activeTab}
            className="w-full mt-0 focus-visible:outline-none"
          >
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center w-full">
              {filteredEvents.map((event) => (
                // Wrapper bounds the max-width to ensure the card doesn't stretch weirdly or overflow
                <div
                  key={event.id}
                  className="w-full max-w-90 flex justify-center"
                >
                  <EventCard
                    id={event.id}
                    title={event.title}
                    subtitle={event.subtitle}
                    type={event.type}
                    description={event.description}
                    date={event.date}
                    time={event.time}
                    venue={event.venue}
                    fee={event.fee}
                    seatsTotal={event.seatsTotal}
                    seatsFilled={event.seatsFilled}
                    image={event.image}
                    onRegister={() =>
                      console.log(`Registering for ${event.title}`)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-20 w-full">
                <p className="text-white/40 text-base md:text-lg font-medium tracking-wide">
                  No events found in this category.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
