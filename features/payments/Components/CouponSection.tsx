// components/registration/CouponSection.tsx
"use client";

import { AlertCircle, CheckCircle2, Loader2, Tag } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface CouponSectionProps {
  onVerify: (code: string) => Promise<void>;
  isVerifying: boolean;
  status: { type: "success" | "error"; message: string } | null;
  resetStatus: () => void;
}

export function CouponSection({
  onVerify,
  isVerifying,
  status,
  resetStatus,
}: CouponSectionProps) {
  const { control, getValues } = useFormContext();

  return (
    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mt-6">
      <Controller
        control={control}
        name="coupon"
        render={({ field }) => (
          <Field>
            <FieldLabel className="flex items-center text-slate-700 mb-2">
              <Tag className="w-4 text-violet-500 h-4 mr-1.5" /> Promo Code
            </FieldLabel>
            <div className="flex gap-3">
              <Input
                {...field}
                placeholder="Enter code"
                className="bg-white uppercase"
                onChange={(e) => {
                  field.onChange(e);
                  if (status) resetStatus();
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => onVerify(getValues("coupon"))}
                disabled={!field.value || isVerifying}
                className="w-25 shrink-0 text-white"
              >
                {isVerifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
            {status && (
              <p
                className={`text-sm mt-2 flex items-center ${status.type === "success" ? "text-emerald-600" : "text-red-500"}`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-1.5" />
                )}
                {status.message}
              </p>
            )}
          </Field>
        )}
      />
    </div>
  );
}
