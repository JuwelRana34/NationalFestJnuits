 "use server";
import { getDb } from "@/core/db/db";
import { coupon } from "@/core/db/schema";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
// Define the type for the data we expect to receive when creating a coupon
export type CreateCouponInput = {
  id?: string; // Optional: If provided, might be an update (though we're building save/create here)
  code: string;
  discountPercentage: number;
  isActive?: boolean;
  maxUses?: number | null;
  expiresAt?: Date | null;
};

export async function saveCoupon(data: CreateCouponInput) {

    const db = getDb();
  try {
    // Basic validation
    if (!data.code || data.code.trim() === "") {
      return { success: false, error: "Coupon code is required." };
    }

    if (data.discountPercentage <= 0 || data.discountPercentage > 100) {
      return {
        success: false,
        error: "Discount percentage must be between 1 and 100.",
      };
    }

    // Generate a new ID if one isn't provided (assuming you use something like uuid or nanoid in practice)
    // For this example, if no ID is provided, we create a simple one or assume the DB handles it if changed to auto-increment,
    // but your schema requires a text ID.
    const couponId = data.id || crypto.randomUUID();

    const couponData = {
      id: couponId,
      code: data.code.toUpperCase(), // Ensure codes are standardized
      discountPercentage: data.discountPercentage,
      isActive: data.isActive !== undefined ? data.isActive : true,
      maxUses: data.maxUses ?? null,
      expiresAt: data.expiresAt ?? null,
      // usedCount defaults to 0 and createdAt defaults to new Date() as per schema
    };

    // Check if coupon code already exists to prevent unique constraint errors gracefully
    const existing = await db.query.coupon.findFirst({
      where: eq(coupon.code, couponData.code),
    });

    if (existing && !data.id) {
      return {
        success: false,
        error: "A coupon with this code already exists.",
      };
    }

    if (data.id && existing && existing.id !== data.id) {
      return {
        success: false,
        error: "A coupon with this code already exists.",
      };
    }

    // Perform an upsert (insert or update if ID exists)
    // Drizzle SQLite uses onConflictDoUpdate for upserts
    await db
      .insert(coupon)
      .values(couponData)
      .onConflictDoUpdate({
        target: coupon.id,
        set: {
          code: couponData.code,
          discountPercentage: couponData.discountPercentage,
          isActive: couponData.isActive,
          maxUses: couponData.maxUses,
          expiresAt: couponData.expiresAt,
        },
      });

    // Revalidate paths where coupons might be displayed
    revalidatePath("/admin/coupons");
    // NOTE:fix this path to the actual path where coupons are listed in your app

    // revalidatePath("/checkout"); // If needed


    return { success: true, message: "Coupon saved successfully." };
  } catch (error) {
    console.error("Error saving coupon:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save coupon.",
    };
  }
}


export async function getCouponByCode(code: string) {
  const db = getDb();
  const couponData = await db.query.coupon.findFirst({
    where: eq(coupon.code, code.toUpperCase()),
  });

  return couponData;
}

export async function getCouponById(id: string) {
  const db = getDb();
  const couponData = await db.query.coupon.findFirst({
    where: eq(coupon.id, id),
  });

  return couponData;
}