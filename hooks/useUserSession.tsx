"use client";

import { useSession } from "@/core/auth/auth-client";

export const useAuth = () => {
  const { data, isPending, error, refetch } = useSession();
  return {
    session: data,
    user: data?.user,
    userId: data?.user?.id,

    isLoading: isPending,
    isAuthenticated: !!data,
    error,
    refresh: refetch,
  };
};
