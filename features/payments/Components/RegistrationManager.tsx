// components/registration/RegistrationManager.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Loader2, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitPaymentAction } from "../action"; // Adjust path
import { createFormSchema, FormValues, SegmentType } from "../types"; // Adjust path

// Import our decoupled components & hooks

import { useAuth } from "@/hooks/useUserSession";
import { useRegistrationPricing } from "../hooks/useRegistrationPricing";
import { CouponSection } from "./CouponSection";
import { FileUploadField } from "./FileUploadField";
import { SegmentSpecificFields } from "./SegmentSpecificFields";
import { TeamSetupSection } from "./TeamSetupSection";
import { CategorySelection } from "./CategorySelection";

export default function RegistrationButtonHiger({
  segmentId,
  segmentName,
  isTeamEvent,
  baseFee,
  minMembers = 1,
  maxMembers = 1,
  extraMemberFee = 500,
  segmentType,
}: {
  segmentId: string;
  segmentName: string;
  isTeamEvent: boolean;
  baseFee: number;
  minMembers?: number;
  maxMembers?: number;
  extraMemberFee?: number;
  segmentType: SegmentType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  // Initialize React Hook Form
  const formSchema = useMemo(
    () => createFormSchema(minMembers - 1, maxMembers - 1, segmentType),
    [minMembers, maxMembers, segmentType],
  );

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isTeamEvent
      ? {
          isTeamEvent: true,
          category: "UNIVERSITY",
          members: [],
          segmentMeta: {},
        }
      : { isTeamEvent: false, category: "UNIVERSITY", segmentMeta: {} },
    mode: "onChange",
  });

  // Watch for dynamic pricing
  const members = methods.watch("members");
  const totalTeamSize = isTeamEvent ? (members?.length || 0) + 1 : 1;

  // Utilize our custom hook
  const {
    totalAmount,
    isVerifyingCoupon,
    couponStatus,
    verifyCoupon,
    resetPricing,
  } = useRegistrationPricing({
    baseFee,
    isTeamEvent,
    totalTeamSize,
    minMembers,
    extraMemberFee,
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const payload = { ...data, segmentId, totalAmount }; // Assemble final payload
      console.log("Submitting with payload:", payload);

      const { PayUrl, success, message } = await submitPaymentAction(payload);

      if (success && PayUrl) window.location.assign(PayUrl);
      else toast.error(message || "Payment failed.");
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    methods.reset();
    resetPricing();
    setIsModalOpen(true);
  };

  if (!user) {
    return (
      <Button disabled className="w-full bg-primary cursor-not-allowed">
        <Ticket className="w-full h-4 mr-2" /> Login to Register
      </Button>
    );
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => !isLoading && setIsModalOpen(open)}
    >
      <Button onClick={handleOpen} className="w-full">
        <Ticket className="w-full h-4 mr-2" /> Register Now
      </Button>

      <DialogContent className="max-w-2xl p-0 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>
            {isTeamEvent ? "Team Registration" : "Participant Registration"}
          </DialogTitle>
        </DialogHeader>

        {/* 💡 THE MAGIC: FormProvider wraps everything */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, (errors) => {
              console.log("❌ Zod Validation Errors:", errors);
              toast.error(
                "Please fix the highlighted errors before submitting.",
              );
            })}
            className="flex flex-col h-full overflow-hidden"
          >
            <div className="px-6 py-4 space-y-6 overflow-y-auto flex-1">
              {/* Pricing Banner */}
              <div className="md:sticky top-0 z-20 -mx-2 px-2 pb-2 bg-transparent backdrop-blur-md">
                <div className="rounded-tl-xl rounded-br-xl border border-indigo-100 bg-linear-to-r from-cyan-400/50 to-violet-400/50 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-indigo-900 flex items-center">
                      <Ticket className="w-4 h-4 mr-1.5" />
                      Registration Fee
                    </p>
                    {isTeamEvent ? (
                      <p className="text-xs text-indigo-600 mt-1">
                        Base fee covers {minMembers} members.
                        {extraMemberFee > 0 &&
                          ` Extra members: +৳${extraMemberFee} each.`}
                      </p>
                    ) : (
                      <p className="text-xs text-indigo-600 mt-1">
                        Standard pass for 1 individual.
                      </p>
                    )}
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold text-indigo-900">
                      ৳{totalAmount}
                    </p>
                    <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                      Total Payable
                    </p>
                  </div>
                </div>
              </div>

              <CategorySelection />

              {/* Reusable File Upload */}
              {segmentType !== "ESPORTS" && segmentType !== "VISITOR" && (
                <FileUploadField
                  name="studentIdScan"
                  label="Leader Student ID Scan"
                />
              )}

              {/* Dynamic Segments */}
              <SegmentSpecificFields segmentType={segmentType} />

              {/* Team Setup */}
              {isTeamEvent && (
                <TeamSetupSection
                  minMembers={minMembers}
                  maxMembers={maxMembers}
                  extraMemberFee={extraMemberFee}
                />
              )}

              {/* Coupon UI */}
              <CouponSection
                onVerify={verifyCoupon}
                isVerifying={isVerifyingCoupon}
                status={couponStatus}
                resetStatus={resetPricing}
              />
            </div>

            {/* Footer / Submit */}
            <div className="border-t bg-gray-50 px-6 py-4 flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-linear-to-r from-cyan-500 to-violet-500 text-white"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                Pay ৳{totalAmount}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
