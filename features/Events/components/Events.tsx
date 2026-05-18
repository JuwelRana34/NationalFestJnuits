"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/features/Events/components/EventCard";
import { useState } from "react";
import { FullEvent } from "../schema";

export default function Events({ eventsData }: { eventsData: FullEvent[] }) {
  const [activeTab, setActiveTab] = useState<string>("All");
  // Extract unique categories for the Tabs
  const categories = [
    "All",
    ...Array.from(new Set(eventsData.map((event) => event.type as string))),
  ];

  const filteredEvents =
    activeTab === "All"
      ? eventsData
      : eventsData.filter((event) => event.type === activeTab);

  return (
    // Background matched with your EventCard's dark theme vibe
    <div className="min-h-screen  py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-14 space-y-4 md:space-y-5 pt-16">
        <Badge
          variant="outline"
          className="px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase  text-secondary bg-secondary/10"
        >
          Discover The Challenges
        </Badge>
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight  uppercase text-secondary"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Fest <span className="text-primary">Events</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-medium px-2">
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
            <TabsList className="flex flex-nowrap md:flex-wrap h-auto gap-1 py-1.5  bg-primary border border-white/5 rounded-xl shadow-2xl min-w-max">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-lg px-4 md:px-6 py- md:py-2.5 text-xs md:text-sm font-bold tracking-wide uppercase text-white/80 data-[state=active]:bg-amber-400 data-[state=active]:text-[#0a0f1e] transition-all duration-300 whitespace-nowrap"
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
                <div
                  key={event.id}
                  className="w-full max-w-90 flex justify-center"
                >
                  <EventCard {...event} />
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
