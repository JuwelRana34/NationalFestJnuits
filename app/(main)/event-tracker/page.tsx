"use client";

import { useState } from "react";
import { Search, Calendar, MapPin, Ticket } from "lucide-react";

import { events } from "@/data/events";

export default function EventTrackerPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const found = events.find(
      (event) => event.trackingId.toLowerCase() === trackingId.toLowerCase(),
    );

    setResult(found || null);
    setSearched(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";

      case "Ongoing":
        return "bg-secondary/10 text-secondary border-secondary/20";

      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}

        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-bold">
            Event Status Tracker
          </h1>

          <p className="text-muted-foreground mt-3 text-sm sm:text-base md:text-lg">
            Search using your event tracking ID
          </p>
        </div>

        {/* Search Box */}

        <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="
                flex-1
                h-12 sm:h-14
                rounded-xl
                border
                border-input
                bg-background
                px-4 sm:px-5
                text-foreground
                outline-none
                focus:ring-2
                focus:ring-ring
              "
            />

            <button
              onClick={handleSearch}
              className="
                bg-gradient
                h-12 sm:h-14
                px-6 sm:px-8
                rounded-xl
                font-medium
                shadow-sm
                flex
                items-center
                justify-center
                gap-2
                transition-all
              "
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        {/* Not Found */}

        {searched && !result && (
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-destructive">
              Event Not Found
            </h2>

            <p className="text-muted-foreground mt-2">
              No event found with this tracking ID.
            </p>
          </div>
        )}

        {/* Result */}

        {result && (
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {/* Banner */}

            <div className="bg-gradient p-5 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {result.eventName}
              </h2>

              <p className="text-slate-200 mt-2 text-sm sm:text-base">
                Event Tracking Information
              </p>
            </div>

            {/* Content */}

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                {/* Event Details */}

                <div className="space-y-5 flex-1">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-primary" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Event Date
                      </p>

                      <p className="font-medium">{result.eventDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />

                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>

                      <p className="font-medium">{result.venue}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-3
                        py-1
                        text-sm
                        font-medium
                        ${getStatusClass(result.status)}
                      `}
                    >
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Card */}

                <div
                  className="
                    bg-muted
                    border
                    border-border
                    rounded-2xl
                    p-5
                    w-full
                    lg:w-auto
                    lg:min-w-[250px]
                  "
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Ticket size={18} className="text-primary" />

                    <span className="text-sm text-muted-foreground">
                      Tracking ID
                    </span>
                  </div>

                  <p className="text-lg sm:text-xl md:text-2xl font-bold break-all">
                    {result.trackingId}
                  </p>
                </div>
              </div>

              {/* Timeline */}

              <div className="mt-10 sm:mt-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
                  Timeline
                </h3>

                <div className="space-y-6 sm:space-y-8">
                  {result.timeline.map((item: any, index: number) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary" />

                      {index !== result.timeline.length - 1 && (
                        <div className="absolute left-[5px] top-5 h-12 sm:h-16 w-[2px] bg-border" />
                      )}

                      <div>
                        <p className="font-medium">{item.title}</p>

                        <p className="text-sm text-muted-foreground mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
