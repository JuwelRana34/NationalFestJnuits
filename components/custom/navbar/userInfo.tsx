"use client";

import { useAuth } from "@/hooks/useUserSession";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LogoutButton from "../logout";

export default function UserMenu() {
  const { user, isLoading } = useAuth();
  // if (isLoading) {
  //   return (
  //     <Skeleton className="h-12 w-12 rounded-full ring-1 ring-cyan-500 shadow-2xl shadow-violet-500" />
  //   );
  // }

  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.removeItem("is_logged_in");
      window.location.reload();
    }
  }, [user, isLoading]);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          {user?.image && (
            <Image
              src={user?.image}
              alt="User"
              width={30}
              height={30}
              className="rounded-full h-10 w-10 ring-2 ring-cyan-500/50"
              unoptimized
            />
          )}
          <Link href="/admin" className="">
            Dashboard
          </Link>
          <div className="hidden md:block">
            <LogoutButton />{" "}
          </div>
        </>
      ) : (
        <Link href="/signin">Login</Link>
      )}
    </div>
  );
}
