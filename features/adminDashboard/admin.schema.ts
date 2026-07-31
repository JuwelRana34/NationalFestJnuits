import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "MODERATOR", "USER", "SUPER_ADMIN"], "Invalid role"),
  // Admin form theke password set kore dite pare, ba random generate hote pare
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
