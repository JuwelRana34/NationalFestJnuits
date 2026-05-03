import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://jnu-it-fest.rk370613.workers.dev",
});

export const { signIn, signUp, useSession } = createAuthClient();
