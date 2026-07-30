"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import UserMenu from "./userInfo";

export default function AuthWidget() {
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setHasSession(localStorage.getItem("is_logged_in") === "true");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-1 ring-cyan-500 shadow-lg" />
    );
  }

  return hasSession ? (
    <Suspense
      fallback={<Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full" />}
    >
      <UserMenu />
    </Suspense>
  ) : (
    <Link
      href="/signin"
      className=" font-medium text-slate-100   bg-secondary/90 px-4 py-2 rounded hover:text-white hover:outline-none hover:bg-secondary/80 transition"
    >
      Log In
    </Link>
  );
}
