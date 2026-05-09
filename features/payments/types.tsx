import { z } from "zod";

// ১. মেম্বার স্কিমা (পুনরায় ব্যবহারের জন্য)
export const memberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  phone: z.string().min(11, { message: "Valid phone required." }),
  institution: z.string().optional(),
});

// ২. ডাইনামিক স্কিমা জেনারেটর (+ Coupon অ্যাড করা হয়েছে)
export const createFormSchema = (minExtra: number, maxExtra: number) => {
  return z.discriminatedUnion("isTeamEvent", [
    // কন্ডিশন ১: Single Event
    z.object({
      isTeamEvent: z.literal(false),
      coupon: z.string().optional(), // 👈 কুপন অ্যাড করা হলো
    }),

    // কন্ডিশন ২: Team Event
    z.object({
      isTeamEvent: z.literal(true),
      teamName: z
        .string()
        .min(2, { message: "Team name must be at least 2 characters." }),
      coupon: z.string().optional(), // 👈 কুপন অ্যাড করা হলো
      members: z
        .array(memberSchema)
        .min(minExtra, {
          message: `At least ${minExtra} additional members are required.`,
        })
        .max(maxExtra, {
          message: `Maximum ${maxExtra} additional members allowed.`,
        }),
    }),
  ]);
};

// ৩. ফর্মের টাইপ এক্সপোর্ট
export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

// ৪. সার্ভার অ্যাকশনে পাঠানোর জন্য পে-লোড টাইপ
export interface PaymentPayload {
  coupon?: string;
  teamName?: string;
  segmentId: string;
  teamMembers?: z.infer<typeof memberSchema>[];
}
