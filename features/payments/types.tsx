// import { z } from "zod";

// export const memberSchema = z.object({
//   name: z.string().min(2, { message: "Name is required." }),
//   email: z.string().email({ message: "Invalid email format." }),
//   phone: z.string().min(11, { message: "Valid phone required." }),
//   institution: z.string().optional(),
//   studentIdScan: z.string().min(1, { message: "Student ID is required." }),
// });

// // ২. Segment-specific metadata schemas
// export const hackathonMetaSchema = z.object({
//   githubLink: z
//     .string()
//     .optional()
//     .refine((val) => !val || z.string().url().safeParse(val).success, {
//       message: "Valid GitHub URL required.",
//     }),

//   portfolioLink: z
//     .string()
//     .optional()
//     .refine((val) => !val || z.string().url().safeParse(val).success, {
//       message: "Valid portfolio URL required.",
//     }),
// });

// export const appShowcaseMetaSchema = z.object({
//   appTitle: z.string().min(2, { message: "App/Software title required." }),
//   abstract: z.string().min(10).max(400, { message: "Abstract max 400 words." }),
// });

// export const aiAdventureMetaSchema = z.object({
//   conceptNote: z
//     .string()
//     .min(10)
//     .max(150, { message: "Concept note max 150 words." }),
//   videoDurationConfirmed: z.boolean().refine((v) => v === true, {
//     message: "Must confirm 1-minute video duration.",
//   }),
//   previousWorkLink: z
//     .string()
//     .optional()
//     .refine((val) => !val || z.string().url().safeParse(val).success, {
//       message: "Valid link required.",
//     }),
// });

// export const typingMasterMetaSchema = z.object({
//   previousWpm: z.string().min(1, { message: "Previous WPM required." }),
//   blueKeyboardConsent: z.boolean().refine((v) => v === true, {
//     message: "Must consent to blue switch keyboard usage.",
//   }),
// });

// export const esportsMetaSchema = z.object({
//   ign: z.string().min(1, { message: "In-Game Name required." }),
//   gameId: z.string().min(1, { message: "In-Game ID required." }),
//   previousAchievements: z.string().optional(),
// });

// export const visitorMetaSchema = z.object({
//   topicsOfInterest: z
//     .string()
//     .min(5, { message: "Please mention topics of interest." }),
// });

// // ৩. Segment type enum — segment slug/type দিয়ে match করো
// export type SegmentType =
//   | "HACKATHON"
//   | "APP_SHOWCASE"
//   | "AI_ADVENTURE"
//   | "IT_OLYMPIAD"
//   | "TYPING_MASTER"
//   | "ESPORTS"
//   | "VISITOR"
//   | "DEFAULT";

// // ২. ডাইনামিক স্কিমা জেনারেটর (+ Coupon অ্যাড করা হয়েছে)
// export const createFormSchema = (
//   minExtra: number,
//   maxExtra: number,
//   segmentType: SegmentType = "DEFAULT",
// ) => {
//   // Segment-specific extra fields
//   const segmentFields: Record<SegmentType, z.ZodTypeAny> = {
//     HACKATHON: hackathonMetaSchema,
//     APP_SHOWCASE: appShowcaseMetaSchema,
//     AI_ADVENTURE: aiAdventureMetaSchema,
//     IT_OLYMPIAD: z.object({}),
//     TYPING_MASTER: typingMasterMetaSchema,
//     ESPORTS: esportsMetaSchema,
//     VISITOR: visitorMetaSchema,
//     DEFAULT: z.object({}),
//   };

//   // const extraFields = segmentFields[segmentType] as z.ZodObject<z.ZodRawShape>;
//   const extraFields = (segmentFields[segmentType] ||
//     segmentFields["DEFAULT"]) as z.ZodObject<z.ZodRawShape>;

//   return z.discriminatedUnion("isTeamEvent", [
//     // কন্ডিশন ১: Single Event
//     z.object({
//       isTeamEvent: z.literal(false),
//       coupon: z.string().optional(), // 👈 কুপন অ্যাড করা হলো
//       category: z.enum(["UNIVERSITY", "SCHOOL_COLLEGE"]),
//       studentIdScan: z.string().min(1, { message: "Student ID is required." }),
//       segmentMeta: extraFields.passthrough().optional(), // 👈 Segment-specific metadata
//     }),

//     // কন্ডিশন ২: Team Event
//     z.object({
//       isTeamEvent: z.literal(true),
//       teamName: z
//         .string()
//         .min(2, { message: "Team name must be at least 2 characters." }),
//       coupon: z.string().optional(), // 👈 কুপন অ্যাড করা হলো
//       category: z.enum(["UNIVERSITY", "SCHOOL_COLLEGE"]),
//       studentIdScan: z.string().min(1, { message: "Team leader's Student ID is required." }),
//       segmentMeta: extraFields.passthrough(), // 👈 Segment-specific metadata
//       members: z
//         .array(memberSchema)
//         .min(minExtra, {
//           message: `At least ${minExtra} additional members are required.`,
//         })
//         .max(maxExtra, {
//           message: `Maximum ${maxExtra} additional members allowed.`,
//         }),
//     }),
//   ]);
// };

// // ৩. ফর্মের টাইপ এক্সপোর্ট
// export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

// // ৪. সার্ভার অ্যাকশনে পাঠানোর জন্য পে-লোড টাইপ
// export interface PaymentPayload {
//   coupon?: string;
//   teamName?: string;
//   segmentId: string;
//   teamMembers?: z.infer<typeof memberSchema>[];
//   category: "UNIVERSITY" | "SCHOOL_COLLEGE";
//   leaderStudentIdScan?: string;
//   segmentMeta?: Record<string, unknown>;
// }

// export type MembersType = z.infer<typeof memberSchema>[];

import { z } from "zod";

// ==========================================
// ১. Helpers & Shared Primitives
// ==========================================
// RHF অনেক সময় খালি ফিল্ডকে "" (empty string) হিসেবে পাঠায়, তাই optional URL হ্যান্ডেল করার বেস্ট উপায়:
const optionalUrl = z.union([
  z.string().url("Valid URL required."),
  z.literal(""),
  z.undefined(),
]);

// যেসব ফিল্ড Single এবং Team উভয়ের জন্যই কমন, সেগুলো আলাদা করে নিলাম
const baseCommonFields = {
  coupon: z.string().optional(),
  category: z.enum(["UNIVERSITY", "SCHOOL_COLLEGE"]),
  studentIdScan: z.string().min(1, { message: "Student ID is required." }),
};

// ==========================================
// ২. Base Schemas
// ==========================================
export const memberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  phone: z.string().min(11, { message: "Valid phone required." }),
  institution: z.string().optional(),
  studentIdScan: z.string().min(1, { message: "Student ID is required." }),
});

// ==========================================
// ৩. Segment-Specific Metadata Schemas
// ==========================================
const segmentSchemas = {
  HACKATHON: z.object({
    githubLink: optionalUrl,
    portfolioLink: optionalUrl,
  }),
  APP_SHOWCASE: z.object({
    appTitle: z.string().min(2, { message: "App/Software title required." }),
    abstract: z
      .string()
      .min(10)
      .max(400, { message: "Abstract max 400 words." }),
  }),
  AI_ADVENTURE: z.object({
    conceptNote: z
      .string()
      .min(10)
      .max(150, { message: "Concept note max 150 words." }),
    videoDurationConfirmed: z.refine((val) => val === true, {
      message: "Must confirm 1-minute video duration.",
    }),
    previousWorkLink: optionalUrl,
  }),
  TYPING_MASTER: z.object({
    previousWpm: z.string().min(1, { message: "Previous WPM required." }),
    blueKeyboardConsent: z.boolean().refine((val) => val === true, {
      message: "Must consent to blue switch keyboard usage.",
    }),
  }),
  ESPORTS: z.object({
    ign: z.string().min(1, { message: "In-Game Name required." }),
    gameId: z.string().min(1, { message: "In-Game ID required." }),
    previousAchievements: z.string().optional(),
  }),
  VISITOR: z.object({
    topicsOfInterest: z
      .string()
      .min(5, { message: "Please mention topics of interest." }),
  }),
  IT_OLYMPIAD: z.object({}),
  DEFAULT: z.object({}),
} as const;

export type SegmentType = keyof typeof segmentSchemas;

// ==========================================
// ৪. Main Dynamic Schema Generator
// ==========================================
export const createFormSchema = (
  minExtra: number,
  maxExtra: number,
  segmentType: SegmentType = "DEFAULT",
) => {
  // ডাইনামিক মেটা স্কিমা বের করে আনা
  const segmentMetaSchema = (
    segmentSchemas[segmentType] || segmentSchemas.DEFAULT
  ).passthrough();

  return z.discriminatedUnion("isTeamEvent", [
    // Condition 1: Single Event
    z.object({
      isTeamEvent: z.literal(false),
      ...baseCommonFields, // 👈 Spread operator দিয়ে কমন ফিল্ডগুলো বসিয়ে দিলাম
      segmentMeta: segmentMetaSchema.optional(),
    }),

    // Condition 2: Team Event
    z.object({
      isTeamEvent: z.literal(true),
      ...baseCommonFields, // 👈 একই কোড বারবার লেখা লাগলো না
      teamName: z
        .string()
        .min(2, { message: "Team name must be at least 2 characters." }),
      segmentMeta: segmentMetaSchema,
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

// ==========================================
// ৫. Types Export
// ==========================================
export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
export type MembersType = z.infer<typeof memberSchema>[];

export interface PaymentPayload {
  segmentId: string;
  category: "UNIVERSITY" | "SCHOOL_COLLEGE";
  coupon?: string;
  leaderStudentIdScan?: string;
  teamName?: string;
  teamMembers?: MembersType;
  segmentMeta?: Record<string, unknown>;
}
