import { createAuth } from "@/core/auth/auth";
import { headers } from "next/headers";


export const getCurrentUser = async () => {
  const auth = createAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};
