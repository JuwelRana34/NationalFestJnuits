"use client";

import {
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Search,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ==========================================
// Mock Data (পরে Drizzle ORM দিয়ে registration ও payment টেবিল জয়েন করে আসবে)
// ==========================================
const demoRegistrations = [
  {
    id: "reg_01",
    trackingId: "TRK-12345",
    guestName: "Md. Juwel Rana",
    guestPhone: "01711223344",
    eventName: "National AI & IT Summit 2026",
    category: "UNIVERSITY",
    paymentStatus: "VERIFIED", // PENDING, VERIFIED, REJECTED
    selectionStatus: "PENDING", // PENDING, SELECTED, REJECTED
    date: "2 hours ago",
  },
  {
    id: "reg_02",
    trackingId: "TRK-98765",
    guestName: "Tareq Hasan",
    guestPhone: "01822334455",
    eventName: "Programming Contest",
    category: "UNIVERSITY",
    paymentStatus: "PENDING",
    selectionStatus: "PENDING",
    date: "5 hours ago",
  },
  {
    id: "reg_03",
    trackingId: "TRK-45678",
    guestName: "Rakib Uddin",
    guestPhone: "01933445566",
    eventName: "UI/UX Design Masterclass",
    category: "SCHOOL_COLLEGE",
    paymentStatus: "VERIFIED",
    selectionStatus: "SELECTED",
    date: "1 day ago",
  },
  {
    id: "reg_04",
    trackingId: "TRK-23456",
    guestName: "Alif Hossain",
    guestPhone: "01644556677",
    eventName: "National AI & IT Summit 2026",
    category: "UNIVERSITY",
    paymentStatus: "REJECTED", // Invalid TrxID
    selectionStatus: "REJECTED",
    date: "2 days ago",
  },
];

export default function RegistrationManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");

  // ফিল্টার লজিক
  const filteredRegistrations = demoRegistrations.filter((reg) => {
    const matchesSearch =
      reg.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.guestPhone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "ALL" || reg.selectionStatus === statusFilter;

    const matchesEvent = eventFilter === "ALL" || reg.eventName === eventFilter;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  // স্ট্যাটাস আপডেটের ডেমো অ্যাকশন
  const handleUpdateStatus = (id: string, newStatus: string) => {
    if (window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) {
      alert(`Status updated to ${newStatus} for Registration ID: ${id}`);
      // API call here: await fetch(`/api/registrations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) })
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Registration Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review, verify payments, and select candidates for events.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm flex items-center gap-2">
            <Filter size={16} /> Export CSV
          </button>
        </div>
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
            placeholder="Search by Name, Phone, or TRK ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700 min-w-[150px]"
          >
            <option value="ALL">All Events</option>
            <option value="National AI & IT Summit 2026">AI & IT Summit</option>
            <option value="Programming Contest">Programming Contest</option>
            <option value="UI/UX Design Masterclass">UI/UX Masterclass</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Tracking ID & Date</th>
                <th className="p-4 font-medium">Participant Info</th>
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">Payment Status</th>
                <th className="p-4 font-medium">Selection</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="font-mono font-bold text-indigo-600 uppercase">
                        {reg.trackingId}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {reg.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {reg.guestName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {reg.guestPhone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-800 font-medium">
                        {reg.eventName}
                      </p>
                      <span className="inline-block px-2 py-0.5 mt-1 bg-gray-100 text-gray-600 text-[10px] rounded uppercase">
                        {reg.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                          reg.paymentStatus === "VERIFIED"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : reg.paymentStatus === "REJECTED"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {reg.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          reg.selectionStatus === "SELECTED"
                            ? "bg-green-100 text-green-700"
                            : reg.selectionStatus === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {reg.selectionStatus === "SELECTED" && (
                          <CheckCircle2 size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus === "REJECTED" && (
                          <XCircle size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus === "PENDING" && (
                          <Clock size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Details Button */}
                        <button
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Quick Action: Approve */}
                        {reg.selectionStatus !== "SELECTED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg.id, "SELECTED")
                            }
                            className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            title="Mark as Selected"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}

                        {/* Quick Action: Reject */}
                        {reg.selectionStatus !== "REJECTED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg.id, "REJECTED")
                            }
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Mark as Rejected"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Search size={32} className="text-gray-300 mb-3" />
                      <p>No registrations found matching your criteria.</p>
                    </div>
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
