"use client";

import { useTransition } from "react";
import { authClient } from "@/core/auth/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        // 🎯 ১. সবার আগে লোকাল স্টোরেজ থেকে ট্যাগ রিমুভ করুন
        localStorage.removeItem("is_logged_in");

        // 🎯 ২. Better Auth-এর সাইন আউট কল করুন
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              // 🎯 ৩. router.push এর বদলে হার্ড রিডাইরেক্ট ব্যবহার করুন
              window.location.href = "/login"; // বা আপনার সাইন-ইন পেজের পাথ
            },
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
      className="rounded py-5 bg-rose-500 text-white hover:bg-rose-600 font-semibold"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      <span>{isPending ? "Signing out..." : "Logout"}</span>
    </Button>
  );
}
