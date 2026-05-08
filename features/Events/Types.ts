import z from "zod";

// --- Interfaces ---
export interface ResponsiblePerson {
  name: string;
  role: string;
  phone: string;
  email: string;
  socialLink?: string;
}

export interface CreateSegmentParams {
  title: string;
  subtitle?: string;
  type: string;
  description: string;
  extraMemberFee?: number;
  image?: string;
  date: string;
  time: string;
  venue: string;
  seatsTotal: number;
  seatsFilled: number;
  responsible: ResponsiblePerson[];
  isTeamEvent: boolean;
  minMembers?: number;
  maxMembers?: number;
  prizeMoney: number;
  fee: number;
}

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
  type: z.enum(["Competition", "Exhibition", "Gaming", "General"] as const, {
    message: "Please select a valid segment type",
  }),
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
  prizeMoney: z.number().nonnegative("Prize money cannot be negative"),
  fee: z.number().nonnegative("Fee cannot be negative"),
});

// --- Types inferred from Schemas ---

export type SegmentFormOutput = z.infer<typeof segmentSchema>;
export type SegmentFormInput = z.input<typeof segmentSchema>;
