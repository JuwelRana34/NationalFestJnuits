"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Ticket,
  Percent,
  Hash,
  Calendar,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";



export default function CouponForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Form State
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [maxUses, setMaxUses] = useState<number | "">("");
  const [expiresAt, setExpiresAt] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // Prepare payload to match CreateCouponInput type
      const payload = {
        code,
        discountPercentage: Number(discountPercentage),
        isActive,
        maxUses: maxUses !== "" ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      };

      // Call the server action
      const result = {success: true}; 
      //FIXME: Replace with actual API call to save the coupon
      // console.log("Save Coupon Result:", result);
      if (result.success) {
        setStatus({ type: "success", message: "Coupon saved successfully!" });
      //   // Optional: Reset form or redirect
        if (!code.includes("EDIT")) {
          setCode("");
          setDiscountPercentage("");
          setMaxUses("");
          setExpiresAt("");
          setIsActive(true);
        }
      } else {
        setStatus({ type: "error", message:"Failed to save coupon." });
      }
    } catch {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4 sm:p-8 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 px-6 py-5">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            Create New Coupon
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure discount rules, usage limits, and expiration dates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {status.type && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className={`p-4 rounded-md flex items-start gap-3 text-sm ${
                  status.type === "success"
                    ? "bg-green-50 text-green-900 border border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-900/30"
                    : "bg-red-50 text-red-900 border border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900/30"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span className="mt-0.5">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <Label htmlFor="code">
                Coupon Code <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Ticket className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="code"
                  placeholder="e.g. SUMMER24"
                  className="pl-10 uppercase uppercase-placeholder"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
              </div>
              <p className="text-[13px] text-gray-500">
                Unique identifier for checkout.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">
                Discount Percentage <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="discount"
                  type="number"
                  min="1"
                  max="100"
                  step="0.01"
                  placeholder="e.g. 15"
                  className="pl-10"
                  value={discountPercentage}
                  onChange={(e) =>
                    setDiscountPercentage(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  required
                />
              </div>
              <p className="text-[13px] text-gray-500">
                Value between 1% and 100%.
              </p>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxUses">Maximum Uses</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="maxUses"
                  type="number"
                  min="1"
                  placeholder="Unlimited"
                  className="pl-10"
                  value={maxUses}
                  onChange={(e) =>
                    setMaxUses(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              </div>
              <p className="text-[13px] text-gray-500">
                Leave blank for unlimited uses.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiration Date</Label>
              <div className="relative">
                {/* Standard datetime-local used for zero-dependency portability */}
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  className="pr-4"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                />
              </div>
              <p className="text-[13px] text-gray-500">
                When does this coupon expire?
              </p>
            </div>
          </div>

          {}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <div className="space-y-0.5">
                <Label className="text-base">Active Status</Label>
                <p className="text-[13px] text-gray-500">
                  Allow customers to use this code.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
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
      </motion.div>
    </div>
  );
}
