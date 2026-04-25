import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://jnu-it-fest.rk370613.workers.dev"
      : "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient();
