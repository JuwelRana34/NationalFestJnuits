// "use client"; // components/EditCouponModal.tsx

// import React, { useState } from "react";
// import { honoFetch } from "@/lib/hono-client";
// import { X, Save, Loader2, Ticket, Percent, Hash } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Coupon } from "@/app/admin/cuponManagement/page";

// interface EditCouponModalProps {
//   coupon: Coupon;
//   onClose: () => void;
//   onSuccess: (updatedCoupon: Coupon) => void;
// }

// export default function EditCouponModal({
//   coupon,
//   onClose,
//   onSuccess,
// }: EditCouponModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [code, setCode] = useState(coupon.code);
//   const [discountPercentage, setDiscountPercentage] = useState<number | "">(
//     coupon.discountPercentage,
//   );
//   const [isActive, setIsActive] = useState(coupon.isActive);
//   const [maxUses, setMaxUses] = useState<number | "">(coupon.maxUses || "");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     const payload = {
//       code,
//       discountPercentage: Number(discountPercentage),
//       isActive,
//       maxUses: maxUses !== "" ? Number(maxUses) : null,
//     };

//     try {
//       const { response, status } = await honoFetch<{
//         message: string;
//         coupon: Coupon;
//       }>(`/api/coupons/${coupon.id}`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (status === 200 && response?.coupon) {
//         onSuccess(response.coupon);
//       } else {
//         setError("Failed to update coupon. Admin privileges may be required.");
//       }
//     } catch (err) {
//       setError("An unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//       <div className="w-full max-w-md bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/40">
//           <h3 className="text-lg font-semibold text-zinc-50">Edit Coupon</h3>
//           <button
//             onClick={onClose}
//             className="text-zinc-400 hover:text-zinc-100 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {error && (
//             <div className="p-3 bg-red-950/30 text-red-400 border border-red-900/50 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <div className="space-y-2 relative">
//             <Label htmlFor="edit-code" className="text-zinc-300">
//               Coupon Code
//             </Label>
//             <div className="relative">
//               <Ticket className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
//               <Input
//                 id="edit-code"
//                 className="pl-10 uppercase bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value.toUpperCase())}
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2 relative">
//             <Label htmlFor="edit-discount" className="text-zinc-300">
//               Discount Percentage
//             </Label>
//             <div className="relative">
//               <Percent className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
//               <Input
//                 id="edit-discount"
//                 type="number"
//                 min="1"
//                 max="100"
//                 step="0.01"
//                 className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
//                 value={discountPercentage}
//                 onChange={(e) =>
//                   setDiscountPercentage(
//                     e.target.value === "" ? "" : Number(e.target.value),
//                   )
//                 }
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2 relative">
//             <Label htmlFor="edit-maxUses" className="text-zinc-300">
//               Maximum Uses (Optional)
//             </Label>
//             <div className="relative">
//               <Hash className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
//               <Input
//                 id="edit-maxUses"
//                 type="number"
//                 min="1"
//                 placeholder="Unlimited"
//                 className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-indigo-500"
//                 value={maxUses}
//                 onChange={(e) =>
//                   setMaxUses(
//                     e.target.value === "" ? "" : Number(e.target.value),
//                   )
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-2">
//             <div className="space-y-0.5">
//               <Label className="text-sm font-medium text-zinc-200">
//                 Active Status
//               </Label>
//               <p className="text-xs text-zinc-500">
//                 Allow customers to use this code.
//               </p>
//             </div>
//             <Switch
//               checked={isActive}
//               onCheckedChange={setIsActive}
//               className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-zinc-700"
//             />
//           </div>

//           <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//             >
//               {isSubmitting ? (
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               ) : (
//                 <Save className="w-4 h-4 mr-2" />
//               )}
//               Update
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client"; // components/EditCouponModal.tsx

import React, { useState } from "react";
import { honoFetch } from "@/lib/hono-client";
import { X, Save, Loader2, Ticket, Percent, Hash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Coupon } from "@/app/admin/cuponManagement/page";

interface EditCouponModalProps {
  coupon: Coupon;
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

  // 💡 Remove useEffect entirely and use lazy initialization for state
  const [expireDate, setExpireDate] = useState(() => {
    if (coupon.expiresAt) {
      const dateObj = new Date(coupon.expiresAt);
      // Ensure we extract the correct local date string "YYYY-MM-DD"
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
      // Ensure we extract the correct local time string "HH:MM"
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

    // 💡 Combine Date and Time before sending to backend
    let finalExpiresAt: Date | null = null;
    if (expireDate) {
      // If time is missing, default to 23:59 (end of day)
      const timeStr = expireTime || "23:59";
      finalExpiresAt = new Date(`${expireDate}T${timeStr}`);
    }

    const payload = {
      code,
      discountPercentage: Number(discountPercentage),
      isActive,
      maxUses: maxUses !== "" ? Number(maxUses) : null,
      expiresAt: finalExpiresAt, // 👈 Added expiresAt to payload
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
    } catch (err) {
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

          {/* 💡 Expiration Date & Time Group Added Here */}
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