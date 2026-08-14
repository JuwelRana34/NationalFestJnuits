"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { honoFetch } from "@/lib/hono-client";
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Hash,
  Loader2,
  Percent,
  Save,
  Ticket,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

// ইভেন্টের টাইপ
interface EventItem {
  id: string;
  title: string;
}

// 💡 প্রোপার রেসপন্স টাইপ ডিফাইন করা হলো
type EventsApiResponse =
  | EventItem[]
  | { events?: EventItem[]; data?: EventItem[]; [key: string]: unknown };

export default function CouponForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Form State
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [maxUses, setMaxUses] = useState<number | "">("");
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState("");

  // ১. কম্পোনেন্ট লোড হওয়ার সময় ইভেন্ট লিস্ট ফেচ করা (Proper Type সহ)
  useEffect(() => {
    async function fetchEvents() {
      try {
        const { response } = await honoFetch<EventsApiResponse>("/api/events", {
          method: "GET",
          credentials: "include",
        });

        if (response) {
          let eventList: EventItem[] = [];

          if (Array.isArray(response)) {
            eventList = response;
          } else if (response.events && Array.isArray(response.events)) {
            eventList = response.events;
          } else if (response.data && Array.isArray(response.data)) {
            eventList = response.data;
          }

          setEvents(eventList);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    }

    fetchEvents();
  }, []);

  // ড্রপডাউনের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ইভেন্ট টগল করার ফাংশন (সিলেক্ট/আনসিলেক্ট)
  const toggleEventSelection = (eventId: string) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const payload = {
        code,
        discountPercentage: Number(discountPercentage),
        isActive,
        maxUses: maxUses !== "" ? Number(maxUses) : null,
        eventIds: selectedEventIds,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      };

      console.log("Submitting coupon:", payload);

      const { response, status } = await honoFetch<{
        success: boolean;
        message: string;
      }>("/api/coupons/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (status === 200 && response?.success) {
        setStatus({
          type: "success",
          message: response.message || "Coupon saved successfully!",
        });

        if (!code.includes("EDIT")) {
          setCode("");
          setDiscountPercentage("");
          setMaxUses("");
          setSelectedEventIds([]);
          setExpiresAt("");
          setIsActive(true);
        }
      } else {
        setStatus({ type: "error", message: "Failed to save coupon." });
      }
    } catch {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8 font-sans text-zinc-100">
      <div className="w-full max-w-2xl bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-800 bg-zinc-900/40 px-6 py-5">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2 text-zinc-50">
            <Ticket className="w-5 h-5 text-indigo-500" />
            Create New Coupon
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Configure discount rules, event applicability, usage limits, and
            expiration dates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {status.type && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 text-sm border ${
                status.type === "success"
                  ? "bg-emerald-950/30 text-emerald-400 border-emerald-900/50"
                  : "bg-red-950/30 text-red-400 border-red-900/50"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="mt-0.5">{status.message}</span>
            </div>
          )}

          {/* Primary Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <Label htmlFor="code" className="text-zinc-300">
                Coupon Code <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Ticket className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  id="code"
                  placeholder="e.g. SUMMER24"
                  className="pl-10 uppercase bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
              </div>
              <p className="text-[13px] text-zinc-500">
                Unique identifier for checkout.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount" className="text-zinc-300">
                Discount Percentage <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  id="discount"
                  type="number"
                  min="1"
                  max="100"
                  step="0.01"
                  placeholder="e.g. 15"
                  className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                  value={discountPercentage}
                  onChange={(e) =>
                    setDiscountPercentage(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  required
                />
              </div>
              <p className="text-[13px] text-zinc-500">
                Value between 1% and 100%.
              </p>
            </div>
          </div>

          {/* Event Selection & Max Uses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative" ref={dropdownRef}>
              <Label className="text-zinc-300">Applicable Events</Label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full min-h-[40px] px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md cursor-pointer flex items-center justify-between text-sm text-zinc-100 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center gap-2 truncate">
                  <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="truncate">
                    {selectedEventIds.length === 0
                      ? "All Events (Global Coupon)"
                      : `${selectedEventIds.length} event(s) selected`}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-50 mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-xl max-h-60 overflow-y-auto p-1">
                  {isLoadingEvents ? (
                    <div className="flex items-center justify-center py-4 text-xs text-zinc-500 gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading
                      events...
                    </div>
                  ) : events.length === 0 ? (
                    <div className="py-3 text-center text-xs text-zinc-500">
                      No events found
                    </div>
                  ) : (
                    events.map((ev) => {
                      const isSelected = selectedEventIds.includes(ev.id);
                      return (
                        <div
                          key={ev.id}
                          onClick={() => toggleEventSelection(ev.id)}
                          className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-indigo-600/20 text-indigo-300"
                              : "hover:bg-zinc-800 text-zinc-200"
                          }`}
                        >
                          <span className="truncate">{ev.title}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
              <p className="text-[13px] text-zinc-500">
                Leave unselected for global coupon (all events).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUses" className="text-zinc-300">
                Maximum Uses
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  id="maxUses"
                  type="number"
                  min="1"
                  placeholder="Unlimited"
                  className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                  value={maxUses}
                  onChange={(e) =>
                    setMaxUses(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              </div>
              <p className="text-[13px] text-zinc-500">
                Leave blank for unlimited uses.
              </p>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="space-y-2">
            <Label htmlFor="expiresAt" className="text-zinc-300">
              Expiration Date
            </Label>
            <div className="relative">
              <Input
                id="expiresAt"
                type="datetime-local"
                className="pr-4 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 [color-scheme:dark]"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
            <p className="text-[13px] text-zinc-500">
              When does this coupon expire?
            </p>
          </div>

          {/* Footer / Actions */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-zinc-700"
              />
              <div className="space-y-0.5">
                <Label
                  className="text-base text-zinc-200 cursor-pointer"
                  onClick={() => setIsActive(!isActive)}
                >
                  Active Status
                </Label>
                <p className="text-[13px] text-zinc-500">
                  Allow customers to use this code.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Coupon
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
