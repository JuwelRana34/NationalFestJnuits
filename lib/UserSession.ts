import { createAuth } from "@/core/auth/auth";
import { headers } from "next/headers";
import { connection } from "next/server";

export const getCurrentUser = async () => {
  await connection();
  const auth = createAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};
