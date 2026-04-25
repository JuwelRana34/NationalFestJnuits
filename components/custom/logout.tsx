"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/core/auth/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {

    startTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/signin");
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
      className=" rounded py-5 bg-rose-500 text-white hover:bg-rose-600 font-semibold"
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
