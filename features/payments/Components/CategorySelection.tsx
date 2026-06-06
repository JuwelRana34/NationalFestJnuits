// components/registration/CategorySelection.tsx
"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";

export function CategorySelection() {
  // ম্যাজিক: কোনো প্রপস ছাড়াই Context থেকে control নিচ্ছি
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <FieldLabel>
        Category <span className="text-red-500">*</span>
      </FieldLabel>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div className="flex gap-3">
            {["UNIVERSITY", "SCHOOL_COLLEGE"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => field.onChange(cat)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                  field.value === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50"
                }`}
              >
                {cat === "UNIVERSITY" ? "University" : "School/College"}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
