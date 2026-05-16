import z from "zod";

// --- Zod Schemas ---
export const responsiblePersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(11, "Phone number is required"),
  email: z.string().email("Invalid email format"),
  socialLink: z.string().url("Invalid URL format").optional().or(z.literal("")),
});

export const segmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  type: z.enum(
    [
      "HACKATHON",
      "APP_SHOWCASE",
      "AI_ADVENTURE",
      "IT_OLYMPIAD",
      "TYPING_MASTER",
      "ESPORTS",
      "VISITOR",
      "DEFAULT",
    ] as const,
    {
      message: "Please select a valid segment type",
    },
  ),
  extraMemberFee: z
    .number()
    .nonnegative("Extra member fee cannot be negative")
    .optional(),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  venue: z.string().min(1, "Venue is required"),
  seatsTotal: z.number().int().nonnegative("Total seats cannot be negative"),
  // seatsFilled: z.number().int().nonnegative("Filled seats cannot be negative").default(0),
  responsible: z.array(responsiblePersonSchema),
  isTeamEvent: z.boolean(),
  minMembers: z
    .number()
    .int()
    .positive("Minimum members must be at least 1")
    .optional(),
  maxMembers: z.number().int().positive().optional(),
  prizeMoney: z.number().optional(),
  fee: z.number().nonnegative("Fee cannot be negative"),
});

// --- Types inferred from Schemas ---

export type SegmentFormOutput = z.infer<typeof segmentSchema>;
export type SegmentFormInput = z.input<typeof segmentSchema>;
