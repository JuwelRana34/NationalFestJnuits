import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: "https://jnu-it-fest.rk370613.workers.dev",
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient();
