"use client";

import { demoEvents } from "@/app/constant/data";
import { formatDate } from "@/lib/DateAndTimeFormater";
import {
  CalendarDays,
  Edit,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ==========================================
// Mock Data (পরে Drizzle ORM দিয়ে আসবে)
// ==========================================


export default function EventManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // সার্চ ফাংশনালিটি
  const filteredEvents = demoEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string, title: string) => {
    // ডেমো ডিলিট কনফার্মেশন
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      alert(`Event deleted! (Demo ID: ${id})`);
      // API call here: await fetch(`/api/events/${id}`, { method: 'DELETE' })
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
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create New Event
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
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
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-600">
            <option value="all">All Types</option>
            <option value="solo">Solo</option>
            <option value="team">Team</option>
            <option value="seminar">Seminar</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-600">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                        {event.venue}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {event.fee === 0 ? "Free" : `৳${event.fee}`}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Users size={14} className="text-indigo-500" />
                        <span className="font-medium">
                       {/* FIXME:show here full registration count   */}
                       {100}
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
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Event"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No events found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
