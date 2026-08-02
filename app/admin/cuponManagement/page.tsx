"use client"; // app/admin/coupons/page.tsx

import React, { useEffect, useState } from "react";
import { honoFetch } from "@/lib/hono-client";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import CouponTable from "@/features/coupon/_components/CouponTable";
import EditCouponModal from "@/features/coupon/_components/EditCouponModal";

// ✅ Added usedCount here
export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string | null;
}

export default function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the Edit Modal
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const fetchCoupons = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { response, status } = await honoFetch<{
        message: string;
        coupon: Coupon[];
      }>("/api/coupons", {
        method: "GET",
        credentials: "include",
      });

      console.log("Fetch Coupons Response:", response, "Status:", status);

      if (status === 200 && response?.coupon) {
        setCoupons(response.coupon);
      } else {
        setError("Failed to load coupons.");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching coupons.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchCoupons();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const { status } = await honoFetch(`/api/coupons/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (status === 200) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete coupon. You may need SuperAdmin permissions.");
      }
    } catch (error) {
      alert("Error deleting coupon.");
    }
  };

  const handleToggleStatus = async (coupon: Coupon) => {
    try {
      const updatedData = { ...coupon, isActive: !coupon.isActive };

      // Optimistic UI update
      setCoupons((prev) =>
        prev.map((c) => (c.id === coupon.id ? updatedData : c)),
      );

      const { status } = await honoFetch(`/api/coupons/${coupon.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (status !== 200) {
        // Revert on failure
        setCoupons((prev) =>
          prev.map((c) => (c.id === coupon.id ? coupon : c)),
        );
        alert("Failed to update status.");
      }
    } catch (error) {
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? coupon : c)));
    }
  };

  const handleUpdateSuccess = (updatedCoupon: Coupon) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === updatedCoupon.id ? updatedCoupon : c)),
    );
    setEditingCoupon(null);
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8 font-sans text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50">
              Coupon Management
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              View, edit, and manage your discount codes.
            </p>
          </div>
          <Link
            href="/admin/cuponManagement/create"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Coupon
          </Link>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Data State */}
        {isLoading ? (
          <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-xl border border-zinc-800">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <CouponTable
            coupons={coupons}
            onEdit={setEditingCoupon}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Edit Modal */}
        {editingCoupon && (
          <EditCouponModal
            coupon={editingCoupon}
            onClose={() => setEditingCoupon(null)}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
}
