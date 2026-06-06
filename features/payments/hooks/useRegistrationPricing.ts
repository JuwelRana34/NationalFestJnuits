// hooks/useRegistrationPricing.ts
import { useState, useMemo } from "react";
import { verifyCouponAction } from "../action";

interface UsePricingProps {
  baseFee: number;
  isTeamEvent: boolean;
  totalTeamSize: number;
  minMembers: number;
  extraMemberFee: number;
}

export function useRegistrationPricing({
  baseFee,
  isTeamEvent,
  totalTeamSize,
  minMembers,
  extraMemberFee,
}: UsePricingProps) {
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const totalAmount = useMemo(() => {
    let base = baseFee;
    if (isTeamEvent) {
      const extraCount = Math.max(0, totalTeamSize - minMembers);
      base += extraCount * extraMemberFee;
    }
    if (discountPercent > 0) {
      const discountAmount = (base * discountPercent) / 100;
      base = base - discountAmount;
    }
    return Math.round(base);
  }, [
    isTeamEvent,
    baseFee,
    totalTeamSize,
    minMembers,
    extraMemberFee,
    discountPercent,
  ]);

  const verifyCoupon = async (couponCode: string) => {
    if (!couponCode) return;
    setIsVerifyingCoupon(true);
    setCouponStatus(null);
    setDiscountPercent(0);

    try {
      const { success, data, message } = await verifyCouponAction(couponCode);
      if (success) {
        setCouponStatus({ type: "success", message: message });
        setDiscountPercent((data as any)?.discountPercentage ?? 0);
      } else {
        setCouponStatus({
          type: "error",
          message: (data as any)?.message || message,
        });
      }
    } catch {
      setCouponStatus({ type: "error", message: "Something went wrong." });
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const resetPricing = () => {
    setCouponStatus(null);
    setDiscountPercent(0);
  };

  return {
    totalAmount,
    isVerifyingCoupon,
    couponStatus,
    verifyCoupon,
    resetPricing,
  };
}
