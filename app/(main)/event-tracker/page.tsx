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
  UploadCloud, // সাবমিশন আইকনের জন্য
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

// আপনার ডেট/টাইম ফরম্যাটার ইম্পোর্ট
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import DynamicSubmissionForm from "@/features/event/_components/ProjectSubmission";
import { FormField } from "@/features/event/types";
import { honoFetch } from "@/lib/hono-client";

// সাবমিশন ফর্ম কম্পোনেন্টটি ইম্পোর্ট করুন (আপনার পাথ অনুযায়ী ঠিক করে নেবেন)
;

// 1. Result Data-এর জন্য টাইপস্ক্রিপ্ট ইন্টারফেস
interface TrackingResult {
  eventId: string; // সাবমিশনের জন্য eventId লাগবে
  trackingNumber: string;
  category: string;
  selectionStatus: "PENDING" | "APPROVED" | "REJECTED";
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

  // সাবমিশনের জন্য নতুন ফিল্ডসমূহ
  isSubmissionRequired: boolean;
  isSubmissionOpen: boolean;
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
        // 🎯 any এর পরিবর্তে ApiResponse<TrackingResult> ব্যবহার করা হলো
        const res = await honoFetch<ApiResponse<TrackingResult>>(
          `api/events/tracking/${cleanId}`,
          {
            method: "GET",
          },
        );

        console.log("Tracking API Response:", res);

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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          color:
            "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
          icon: <CheckCircle2 size={16} className="mr-1.5" />,
          label: "APPROVED",
        };
      case "REJECTED":
        return {
          color:
            "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
          icon: <XCircle size={16} className="mr-1.5" />,
          label: "Rejected",
        };
      default: // PENDING
        return {
          color:
            "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
          icon: <Clock size={16} className="mr-1.5" />,
          label: "Pending Review",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            Event Status Tracker
          </h1>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base md:text-lg">
            Track your registration status and submit projects
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm mb-10 max-w-2xl mx-auto relative z-10 transition-all hover:shadow-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. TRK-12345"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 h-12 sm:h-14 rounded-xl border border-input bg-background px-4 sm:px-5 text-foreground outline-none focus:ring-2 focus:ring-primary transition-all uppercase"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !trackingId.trim()}
              className="h-12 sm:h-14 px-8 rounded-xl font-medium shadow-sm flex items-center justify-center gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
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
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto transition-all animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <XCircle size={32} />
            </div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Registration Not Found!
            </h2>
            <p className="text-red-500/80 mt-2 text-sm sm:text-base">
              Please check your tracking number and try again.
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg shadow-primary/5 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Card Header */}
            <div className="bg-linear-to-br from-primary/90 to-primary p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <LayoutGrid size={120} />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-xs font-medium mb-3 backdrop-blur-md">
                    <Tag size={12} className="mr-1.5" />
                    {result.segment.type}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {result.segment.title}
                  </h2>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center sm:text-right min-w-50">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
                    Tracking ID
                  </p>
                  <p className="text-xl font-mono font-bold tracking-tight uppercase">
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
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Event Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 text-muted-foreground">
                      <Calendar
                        size={18}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider">
                          Date & Time
                        </p>
                        <p className="text-foreground font-medium mt-0.5">
                          {formatDate(result.segment.date)} at{" "}
                          {formatTime(result.segment.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-muted-foreground">
                      <MapPin
                        size={18}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider">
                          Venue
                        </p>
                        <p className="text-foreground font-medium mt-0.5 leading-snug">
                          {result.segment.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-muted-foreground">
                      <Ticket
                        size={18}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider">
                          Category
                        </p>
                        <p className="text-foreground font-medium mt-0.5">
                          {result.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registrant Info */}
                <div className="space-y-6 lg:col-span-1">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Registrant Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 text-muted-foreground">
                      <User
                        size={18}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider">
                          Name
                        </p>
                        <p className="text-foreground font-medium mt-0.5">
                          {result.user.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-muted-foreground">
                      <Phone
                        size={18}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider">
                          Phone
                        </p>
                        <p className="text-foreground font-medium mt-0.5">
                          {result.user.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="space-y-6 lg:col-span-1">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Current Status
                  </h3>
                  <div className={` ${result.selectionStatus === "APPROVED"? "bg-green-100" :
                  
                  `${result.selectionStatus === "REJECTED" ? "bg-red-100" : "bg-orange-50" }` 
                
                } rounded-2xl p-6 flex flex-col items-center justify-center text-center h-[calc(100%-3rem)] border border-border/50`}>
                    <span
                      className={`inline-flex items-center rounded-full border px-4 py-1.5 font-medium mb-3 ${getStatusInfo(result.selectionStatus).color}`}
                    >
                      {getStatusInfo(result.selectionStatus).icon}
                      {getStatusInfo(result.selectionStatus).label}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {result.selectionStatus === "PENDING" &&
                        "Your registration is currently under review by the administration."}
                      {result.selectionStatus === "APPROVED" &&
                        "Congratulations! Your registration has been approved."}
                      {result.selectionStatus === "REJECTED" &&
                        "Unfortunately, your registration could not be approved at this time."}
                    </p>
                  </div>
                </div>
              </div>

              {/* === সাবমিশন পোর্টাল (শর্ত অনুযায়ী রেন্ডার হবে) === */}
              {result.selectionStatus === "APPROVED" &&
                result.isSubmissionRequired &&
                result.isSubmissionOpen && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <UploadCloud size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Project Submission Portal
                        </h3>
                        <p className="text-sm text-gray-500">
                          The submission portal is currently open. Please submit
                          your project files below.
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Submission Form Component */}
                    <DynamicSubmissionForm
                      eventId={result.eventId}
                      registrationId={result.trackingNumber}
                      submissionSchema={result.submissionSchema}
                    />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
