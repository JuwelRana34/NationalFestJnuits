"use client";

import { GetEventValues } from "@/features/event/types";
import { formatDate } from "@/lib/DateAndTimeFormater";
import { honoFetch } from "@/lib/hono-client";
import { deleteImage } from "@/lib/ImageDelete";
import {
  AlertCircle,
  CalendarDays,
  Edit,
  Loader2,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// Types for Filters to avoid magic strings
type EventTypeFilter = "all" | "solo" | "team" | "seminar";
type EventStatusFilter = "all" | "active" | "inactive";


export default function EventManagementPage() {
  // 1. Raw Data & Fetching States
  const [events, setEvents] = useState<GetEventValues[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>("all");

  // 3. Data Fetching with Memory Leak Prevention
  useEffect(() => {
    let isMounted = true;

    async function fetchEvents() {
      setIsLoading(true);
      setError(null);

      try {
        const { status, response } = await honoFetch<{
          success: boolean;
          data: GetEventValues[];
        }>("/api/events");

        if (isMounted) {
          if (status === 200 && response?.success) {
            setEvents(response.data);
            console.log("Fetched events:", response.data);
          } else {
            setError("Failed to fetch events. Please try again.");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching events:", err);
          setError("Something went wrong while fetching data.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchEvents();

    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, []);

  // 4. Derived State (Filtering Logic wrapped in useMemo for Performance Optimization)
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search Matching
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      // Type Matching
      const matchesType =
        typeFilter === "all" || event.eventType === typeFilter;

      // Status Matching
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && event.isActive) ||
        (statusFilter === "inactive" && !event.isActive);

      // Return true only if ALL conditions are met
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, searchQuery, typeFilter, statusFilter]);

  // 5. Action Handlers
  const handleDelete = async (
    id: string,
    title: string,
    coverImage: string | null,
  ) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const { status, response } = await honoFetch<{
          success: boolean;
          message: string;
        }>(`api/registrations/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (status !== 200 || !response?.success) {
          alert(
            response?.message ||
              "Failed to delete the event. Please try again.",
          );
          return;
        }

        // ইভেন্ট ডিলিট হলে সাথে ছবিটাও ডিলিট করা হচ্ছে
        if (coverImage) {
          await deleteImage(coverImage);
          console.log(`Deleted cover image: ${coverImage}`);
        }

        // UI থেকে সাথে সাথে ইভেন্ট সরিয়ে দেওয়া
        setEvents((prev) => prev.filter((e) => e.id !== id));
        toast.success("Event deleted successfully!");
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error("An error occurred while deleting the event.");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Event Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, update, and manage all festival events from here.
          </p>
        </div>
        <Link
          href="/admin/events/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={18} />
          Create New Event
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search events by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Event Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as EventTypeFilter)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-600 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="solo">Solo</option>
            <option value="team">Team</option>
            <option value="seminar">Seminar</option>
          </select>

          {/* Event Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as EventStatusFilter)
            }
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-600 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Events Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-75 flex flex-col">
        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
            <p>Loading events...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-red-500">
            <AlertCircle className="w-10 h-10 mb-4" />
            <p className="font-medium text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State with Data */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Event Name</th>
                  <th className="p-4 font-medium">Date & Venue</th>
                  <th className="p-4 font-medium">Fee (৳)</th>
                  <th className="p-4 font-medium">Registrations</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">
                          {event.title}
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold rounded">
                          {event.eventType}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <CalendarDays size={14} className="text-gray-400" />
                          {formatDate(event.eventDate)}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                          <MapPin size={14} className="text-gray-400" />
                          {event.venue || "TBA"}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {event.fee === 0 ? "Free" : `৳${event.fee}`}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Users size={14} className="text-indigo-500" />
                          <span className="font-medium">
                            {event.registrationCount}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            event.isActive
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {event.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/events/${event.id}/edit`}
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors focus:opacity-100"
                            title="Edit Event"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(
                                event.id,
                                event.title,
                                event.coverImage,
                              )
                            }
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors focus:opacity-100"
                            title="Delete Event"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block focus:opacity-100"
                            title="More Options"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-10 h-10 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-700">
                          No events found
                        </p>
                        <p className="text-sm">
                          Try adjusting your filters or search query.
                        </p>
                        {(searchQuery ||
                          typeFilter !== "all" ||
                          statusFilter !== "all") && (
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setTypeFilter("all");
                              setStatusFilter("all");
                            }}
                            className="mt-4 text-indigo-600 hover:underline text-sm font-medium"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
