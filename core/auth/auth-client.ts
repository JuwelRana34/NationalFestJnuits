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

export const { signIn, signUp } = authClient;



// ==========================================
// 💡 TypeScript Type Override for Role
// ==========================================

// Better Auth-এর ডিফল্ট User টাইপের সাথে 'role' যুক্ত করে নতুন টাইপ বানানো হলো
type SessionWithRole = {
  session: NonNullable<typeof authClient.$Infer.Session.session>;
  user: NonNullable<typeof authClient.$Infer.Session.user> & { 
    role: string; // আপনি চাইলে এখানে "admin" | "user" দিতে পারেন
  };
} | null;

// Client Component-এর জন্য useSession (টাইপ কাস্ট করা হলো)
export const useSession = () => {
  const session = authClient.useSession();
  return session as unknown as Omit<typeof session, "data"> & { 
    data: SessionWithRole 
  };
};

// Server Component/Action-এর জন্য getSession (প্রয়োজন হলে ব্যবহার করতে পারেন)
export const getSession = async (options?: Parameters<typeof authClient.getSession>[0]) => {
  const session = await authClient.getSession(options);
  return session as unknown as Omit<typeof session, "data"> & { 
    data: SessionWithRole 
  };
};