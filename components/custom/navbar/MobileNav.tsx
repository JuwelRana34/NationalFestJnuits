"use client";

import { NaveItems } from "@/app/constant/data";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useUserSession";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "../logout";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  // Auth লজিকের জন্য
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSession(localStorage.getItem("is_logged_in") === "true");
    }, 0);

    return () => clearTimeout(timer); // ক্লিনআপ
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-primary transition-colors">
          <Menu className="h-6 w-6" />
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[80vw] border-slate-800 bg-slate-900 text-white sm:w-87.5"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-primary">
            JnUITS Menu
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col space-y-4 justify-center items-center">
          {NaveItems.map((link) => (
            <Link
              key={link.title}
              href={link.Path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                path === link.Path
                  ? "text-white bg-secondary px-4 py-2 rounded"
                  : "text-slate-300"
              } transition-colors`}
            >
              {link.title}
            </Link>
          ))}

          <Separator className="bg-slate-800 my-4" />

          {/* মোবাইলের লগ-ইন সেকশন */}
          {hasSession ? (
            <MobileAuthSection closeMenu={() => setIsOpen(false)} />
          ) : (
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-secondary font-medium text-lg border border-secondary px-6 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// লগ-ইন করা থাকলে ইউজারের প্রোফাইল ফেচ করার কম্পোনেন্ট
function MobileAuthSection({ closeMenu }: { closeMenu: () => void }) {
  const path = usePathname();
  // যেহেতু hasSession=true হলেই এই কম্পোনেন্ট কল হবে, তাই অপ্রয়োজনীয় API রিকোয়েস্ট যাবে না!
  const { user, isLoading } = useAuth();

  if (isLoading) return <Skeleton className="h-8 w-full bg-slate-800" />;
  if (!user) return null;

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Link
        href={`/admin`}
        onClick={closeMenu}
        className={`text-lg font-medium ${
          path === "/admin"
            ? "text-white bg-secondary px-4 py-2 rounded"
            : "text-slate-300"
        } transition-colors`}
      >
        Dashboard Admin ({user.name})
      </Link>
      <LogoutButton/>
    </div>
  );
}
