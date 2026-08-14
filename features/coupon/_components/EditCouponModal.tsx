"use client"; // components/EditCouponModal.tsx

import React, { useState, useEffect, useRef } from "react";
import { honoFetch } from "@/lib/hono-client";
import {
  X,
  Save,
  Loader2,
  Ticket,
  Percent,
  Hash,
  Calendar,
  Check,
  ChevronDown,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Coupon } from "@/app/admin/cuponManagement/page";

interface EventItem {
  id: string;
  title: string;
}

type EventsApiResponse =
  | EventItem[]
  | { events?: EventItem[]; data?: EventItem[]; [key: string]: unknown };

interface EditCouponModalProps {
  coupon: Coupon & { couponEvents?: { eventId: string }[] };
  onClose: () => void;
  onSuccess: (updatedCoupon: Coupon) => void;
}

export default function EditCouponModal({
  coupon,
  onClose,
  onSuccess,
}: EditCouponModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState(coupon.code);
  const [discountPercentage, setDiscountPercentage] = useState<number | "">(
    coupon.discountPercentage,
  );
  const [isActive, setIsActive] = useState(coupon.isActive);
  const [maxUses, setMaxUses] = useState<number | "">(coupon.maxUses ?? "");

  // ইভেন্ট সিলেকশন স্টেট
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // কুপনের সাথে অলরেডি যুক্ত ইভেন্ট আইডিগুলো ইনিশিয়ালাইজ করা
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(() => {
    return coupon.couponEvents ? coupon.couponEvents.map((e) => e.eventId) : [];
  });

  // ইভেন্ট লিস্ট ফেচ করা
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
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setIsLoadingEvents(false);
      }
    }

    fetchEvents();
  }, []);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করা
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

  const toggleEventSelection = (eventId: string) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const [expireDate, setExpireDate] = useState(() => {
    if (coupon.expiresAt) {
      const dateObj = new Date(coupon.expiresAt);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  });

  const [expireTime, setExpireTime] = useState(() => {
    if (coupon.expiresAt) {
      const dateObj = new Date(coupon.expiresAt);
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "";
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let finalExpiresAt: Date | null = null;
    if (expireDate) {
      const timeStr = expireTime || "23:59";
      finalExpiresAt = new Date(`${expireDate}T${timeStr}`);
    }

    const payload = {
      code,
      discountPercentage: Number(discountPercentage),
      isActive,
      maxUses: maxUses !== "" ? Number(maxUses) : null,
      eventIds: selectedEventIds, // 👈 ইভেন্ট আইডিগুলো পাঠানো হচ্ছে
      expiresAt: finalExpiresAt,
    };

    try {
      const { response, status } = await honoFetch<{
        message: string;
        coupon: Coupon;
      }>(`/api/coupons/${coupon.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (status === 200 && response?.coupon) {
        onSuccess(response.coupon);
      } else {
        setError("Failed to update coupon. Admin privileges may be required.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/40 sticky top-0 z-10">
          <h3 className="text-lg font-semibold text-zinc-50 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-indigo-500" />
            Edit Coupon
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-950/30 text-red-400 border border-red-900/50 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2 relative">
            <Label htmlFor="edit-code" className="text-zinc-300">
              Coupon Code <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Ticket className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
              <Input
                id="edit-code"
                className="pl-10 uppercase bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
              />
            </div>
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="edit-discount" className="text-zinc-300">
              Discount Percentage <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
              <Input
                id="edit-discount"
                type="number"
                min="1"
                max="100"
                step="0.01"
                className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                required
              />
            </div>
          </div>

          {/* 💡 Applicable Events Dropdown Added Here */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <Label className="text-zinc-300">Applicable Events</Label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full min-h-[40px] px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md cursor-pointer flex items-center justify-between text-sm text-zinc-100 hover:border-zinc-700"
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
            <p className="text-[12px] text-zinc-500">
              Leave unselected for global coupon (all events).
            </p>
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="edit-maxUses" className="text-zinc-300">
              Maximum Uses{" "}
              <span className="text-zinc-500 font-normal">(Optional)</span>
            </Label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
              <Input
                id="edit-maxUses"
                type="number"
                min="1"
                placeholder="Unlimited"
                className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
                value={maxUses}
                onChange={(e) =>
                  setMaxUses(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Expiration Date & Time</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                className="bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 [color-scheme:dark]"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
              <Input
                type="time"
                className="bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500 [color-scheme:dark]"
                value={expireTime}
                onChange={(e) => setExpireTime(e.target.value)}
              />
            </div>
            <p className="text-[12px] text-zinc-500">
              Optional: Clear inputs to never expire.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-zinc-200">
                Active Status
              </Label>
              <p className="text-[13px] text-zinc-500">
                Allow customers to use this code.
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-zinc-700"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
