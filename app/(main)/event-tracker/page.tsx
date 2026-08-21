"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  LayoutGrid,
  Loader2,
  MapPin,
  Phone,
  Search,
  Tag,
  Ticket,
  User,
  XCircle,
  UploadCloud,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

// Date/Time Formatter
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
// Submission Form Component
import DynamicSubmissionForm from "@/features/event/_components/ProjectSubmission";
import { FormField } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";

interface TrackingResult {
  eventId: string;
  trackingNumber: string;
  category: string;
  selectionStatus: "PENDING" | "APPROVED" | "REJECTED";
  payment?: {
    status: "PENDING" | "VERIFIED" | "REJECTED";
    amount: number;
  };
  segment: {
    title: string;
    type: string;
    date: string;
    time: string;
    venue: string;
  };
  user: {
    name: string;
    phone: string;
  };
  isSubmissionRequired: boolean;
  isSubmissionOpen: boolean;
  hasSubmitted: boolean;
  submissionSchema: FormField[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export default function EventTrackerPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [searched, setSearched] = useState(false);

  const [loading, startTrackingTransition] = useTransition();

  const handleSearch = () => {
    const cleanId = trackingId.trim();
    if (!cleanId) {
      toast.error("Please enter a valid Tracking ID");
      return;
    }

    startTrackingTransition(async () => {
      setResult(null);
      setSearched(false);

      try {
        const res = await honoFetch<ApiResponse<TrackingResult>>(
          `api/events/tracking/${cleanId}`,
          {
            method: "GET",
          },
        );

        if (res.status === 200 && res.response?.success && res.response?.data) {
          setResult(res.response.data);
          toast.success("Event details found!");
        } else {
          toast.error(
            res.response?.message || "No event found with this tracking ID.",
          );
        }

        setSearched(true);
      } catch (error) {
        console.error("Tracking fetch error:", error);
        toast.error("An error occurred while fetching the event status.");
        setSearched(true);
      }
    });
  };

  // 💡 ডার্ক থিমের জন্য স্ট্যাটাস কালার আপডেট
  const getStatusInfo = (status: string = "PENDING") => {
    switch (status.toUpperCase()) {
      case "APPROVED":
      case "VERIFIED":
        return {
          bg: "bg-emerald-500/10",
          color: "text-emerald-400 border-emerald-500/20",
          icon: <CheckCircle2 size={16} className="mr-1.5" />,
          label: status.toUpperCase(),
        };
      case "REJECTED":
        return {
          bg: "bg-rose-500/10",
          color: "text-rose-400 border-rose-500/20",
          icon: <XCircle size={16} className="mr-1.5" />,
          label: "REJECTED",
        };
      default:
        return {
          bg: "bg-amber-500/10",
          color: "text-amber-400 border-amber-500/20",
          icon: <Clock size={16} className="mr-1.5" />,
          label: "PENDING",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 pb-20 font-sans selection:bg-indigo-500/30">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-emerald-500 tracking-tight">
            registration Status Tracker
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base md:text-lg">
            Track your registration status and submit projects
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl mb-10 max-w-2xl mx-auto relative z-10 transition-all">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. TRK-12345"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 p-4 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !trackingId.trim()}
              className="h-12 sm:h-14 px-8 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-all bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Searching..." : "Track Now"}
            </button>
          </div>
        </div>

        {/* Error / Not Found */}
        {searched && !result && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto transition-all animate-in fade-in zoom-in duration-300 shadow-lg">
            <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400 shadow-inner">
              <XCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-rose-400">
              Registration Not Found!
            </h2>
            <p className="text-rose-400/80 mt-2 text-sm sm:text-base">
              Please check your tracking number and try again.
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Card Header (Gradient Dark) */}
            <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-6 sm:p-8 relative overflow-hidden border-b border-slate-800">
              <div className="absolute top-0 right-10 md:right-32 p-8 opacity-5">
                <LayoutGrid size={120} className="text-indigo-400" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 text-xs font-semibold mb-3 uppercase tracking-wider">
                    <Tag size={12} className="mr-1.5 text-primary" />
                    {result.category} Event
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {result.segment.title}
                  </h2>
                </div>
                <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 text-center sm:text-right min-w-[140px] shadow-inner">
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">
                    Tracking ID
                  </p>
                  <p className="text-xl text-indigo-400 font-mono font-black tracking-tight uppercase">
                    {result.trackingNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Event Details */}
                <div className="space-y-6 lg:col-span-1">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Event Details
                  </h3>
                  <div className="space-y-5">
                    <div className="flex gap-4 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Calendar size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Date & Time
                        </p>
                        <p className="text-slate-200 font-medium mt-0.5">
                          {formatDate(result.segment.date)}{" "}
                          <br className="hidden sm:block lg:hidden" /> at{" "}
                          {formatTime(result.segment.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <MapPin size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Venue
                        </p>
                        <p className="text-slate-200 font-medium mt-0.5 leading-snug">
                          {result.segment.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Ticket size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Category
                        </p>
                        <p className="text-slate-200 font-medium mt-0.5 capitalize">
                          {result.category} Event
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registrant Info */}
                <div className="space-y-6 lg:col-span-1">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Registrant Info
                  </h3>
                  <div className="space-y-5">
                    <div className="flex gap-4 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <User size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Name
                        </p>
                        <p className="text-slate-200 font-medium mt-0.5">
                          {result.user.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Phone size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Phone
                        </p>
                        <p className="text-slate-200 font-medium mt-0.5">
                          {result.user.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🎯 Current Status */}
                <div className="space-y-6 lg:col-span-1">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                    Current Status
                  </h3>
                  <div className="flex flex-col gap-4">
                    {/* 1. Team Selection Status (Only for Team) */}
                    {result.category === "team" && (
                      <div
                        className={`p-4 rounded-xl border ${getStatusInfo(result.selectionStatus).bg} shadow-inner`}
                      >
                        <p className="text-[11px] font-bold uppercase text-slate-400 mb-2 tracking-wider">
                          Team Approval
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${getStatusInfo(result.selectionStatus).color}`}
                        >
                          {getStatusInfo(result.selectionStatus).icon}
                          {getStatusInfo(result.selectionStatus).label}
                        </span>
                      </div>
                    )}

                    {/* 2. Payment Status (For All) */}
                    <div
                      className={`p-4 rounded-xl border ${getStatusInfo(result.payment?.status).bg} shadow-inner`}
                    >
                      <p className="text-[11px] font-bold uppercase text-slate-400 mb-2 tracking-wider">
                        Payment Status
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${getStatusInfo(result.payment?.status).color}`}
                      >
                        {getStatusInfo(result.payment?.status).icon}
                        {getStatusInfo(result.payment?.status).label}
                      </span>
                      {result.payment?.amount !== undefined && (
                        <p className="text-sm font-medium mt-3 text-slate-300">
                          Amount:{" "}
                          <span className="text-white font-bold">
                            ৳{result.payment.amount}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* === Submission Portal === */}
              {result.isSubmissionRequired && result.isSubmissionOpen && (
                <div className="mt-12 pt-8 border-t border-slate-800">
                  <div className="mb-8 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${result.hasSubmitted ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"}`}
                    >
                      {result.hasSubmitted ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <UploadCloud size={24} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Project Submission Portal
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {result.hasSubmitted
                          ? "You have already submitted your project files."
                          : "The submission portal is currently open. Please submit your project files below."}
                      </p>
                    </div>
                  </div>

                  {/* 💡 কন্ডিশনাল রেন্ডারিং: সাবমিট করে থাকলে সাকসেস মেসেজ দেখাবে */}
                  {result.hasSubmitted ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner">
                      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-emerald-400 mb-2">
                        Project Submitted Successfully!
                      </h3>
                      <p className="text-emerald-400/80 max-w-md">
                        We have successfully received your submission. Best of
                        luck for the event!
                      </p>
                    </div>
                  ) : (
                    <DynamicSubmissionForm
                      eventId={result.eventId}
                      trackingNumber={result.trackingNumber}
                      submissionSchema={result.submissionSchema}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
