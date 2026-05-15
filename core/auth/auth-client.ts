import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://festapi.jnuits.org.bd";


export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession } = authClient;
