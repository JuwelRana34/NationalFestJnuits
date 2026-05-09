import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://jnu-it-fest.rk370613.workers.dev",
  // baseURL: "http://localhost:3000",
});

declare module "better-auth/react" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      phone?: string | null;
      role?: string | null;
      institution?: string | null;
    };
  }
}

export const { signIn, signUp, useSession } = createAuthClient();
