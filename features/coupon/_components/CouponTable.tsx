"use client"; // components/CouponTable.tsx

import React from "react";
import { Edit2, Trash2, Tag, Percent, Hash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Coupon } from "@/app/admin/cuponManagement/page";


interface CouponTableProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (coupon: Coupon) => void;
}

export default function CouponTable({
  coupons,
  onEdit,
  onDelete,
  onToggleStatus,
}: CouponTableProps) {
  if (coupons.length === 0) {
    return (
      <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-12 text-center">
        <Tag className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-300">No coupons found</h3>
        <p className="text-zinc-500 mt-1 text-sm">
          Create a coupon to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-zinc-900/40 border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium">Discount</th>
              <th className="px-6 py-4 font-medium">Usage (Used / Max)</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {coupons.map((coupon) => {
              // Check if coupon is fully used
              const isExhausted =
                coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses;

              return (
                <tr
                  key={coupon.id}
                  className="hover:bg-zinc-900/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      <span className="font-mono font-bold text-zinc-200">
                        {coupon.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Percent className="w-3.5 h-3.5" />
                      {coupon.discountPercentage}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* ✅ Displaying usedCount and maxUses elegantly */}
                    <div
                      className={`flex items-center gap-1.5 font-medium ${isExhausted ? "text-red-400" : "text-zinc-400"}`}
                    >
                      <Hash className="w-3.5 h-3.5" />
                      {coupon.usedCount} /{" "}
                      {coupon.maxUses !== null ? coupon.maxUses : "∞"}
                      {isExhausted && (
                        <span className="ml-2 text-[10px] uppercase bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                          Full
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={() => onToggleStatus(coupon)}
                      className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-700"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(coupon)}
                        className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
                        title="Edit Coupon"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(coupon.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
