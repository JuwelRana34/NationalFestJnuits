"use client";
import { useAuth } from "@/hooks/useUserSession";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import LogoutButton from "./logout";

export default function UserMenu() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Skeleton className="h-12 w-12 rounded-full ring-1 ring-cyan-500 shadow-2xl shadow-violet-500" />
    );
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link
            href={`/dashboard/${user.id}`} // ✅ Fix: user.id সরাসরি
            className="text-cyan-300 hover:text-amber-400 font-medium"
          >
            Profile
          </Link>
          <Image
            src={user.image || ""}
            alt="User"
            width={30}
            height={30}
            className="rounded-full"
            unoptimized
          />
          <LogoutButton />
        </>
      ) : (
        <Link href="/signin">Login</Link>
      )}
    </div>
  );
}