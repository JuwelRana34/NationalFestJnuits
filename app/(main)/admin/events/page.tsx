"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Search } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "eeafba18-e023-45b2-a841-6c0ed09e9ddf",
    name: "Summer Fest 2026",
    date: "2026-06-15",
    attendees: 250,
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Spring Hackathon",
    date: "2026-05-20",
    attendees: 180,
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Tech Talk Series",
    date: "2026-04-10",
    attendees: 95,
    status: "Completed",
  },
  {
    id: 4,
    name: "Web Dev Workshop",
    date: "2026-05-05",
    attendees: 120,
    status: "Ongoing",
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage all events and registrations
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus size={18} className="mr-2" />
          Create Event
        </Button>
      </div>

      <Card className="p-4 md:p-6">
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm md:text-base">
                    {event.name}
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                 
                >
                  <Link prefetch={false} href={`/admin/events/${event.id}/edit`}>Edit</Link>
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  {event.date}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Attendees:</span>
                  <span className="font-semibold">{event.attendees}</span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : event.status === "Ongoing"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
