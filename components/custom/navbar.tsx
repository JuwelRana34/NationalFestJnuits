"use client";

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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Suspense, useState } from "react";
import LogoutButton from "./logout";
import UserMenu from "./userInfo";
import { NaveItems } from "@/app/constant/data";

interface NavLink {
  title: string;
  href: string;
}

function UserMenuFallback() {
  return (
    <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-1 ring-primary/40 shadow-lg" />
  );
}

// ------------------------------------------------------------------
// 🏗️ আর্কিটেকচার: usePathname-এর জন্য আইসোলেটেড কম্পোনেন্ট
// ------------------------------------------------------------------

function DesktopLinks() {
  const path = usePathname();

  return (
    <>
      {NaveItems.map((link) => (
        <Link
          key={link.title}
          href={link.Path}
          className={`group relative text-md font-medium py-1 transition-colors focus-visible:outline-none ${
            path === link.Path
              ? "text-secondary"
              : "text-black hover:text-secondary"
          }`}
        >
          {link.title}
          <span
            className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-secondary transition-all duration-300 ${
              path === link.Path ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      ))}
    </>
  );
}

function MobileLinks({ closeMenu }: { closeMenu: () => void }) {
  const path = usePathname();
  const { user, isLoading } = useAuth();

  return (
    <>
      {NaveItems.map((link) => (
        <Link
          key={link.title}
          href={link.Path}
          onClick={closeMenu}
          className={`text-lg font-medium w-full text-center py-2 rounded-md transition-colors ${
            path === link.Path
              ? "text-white bg-secondary px-4"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          {link.title}
        </Link>
      ))}
      {isLoading ? (
        <Skeleton className="h-8 w-full bg-slate-800" />
      ) : (
        user && (
          <div className="flex flex-col justify-center items-center gap-3 pt-2">
            <Link
              href={`/dashboard`}
              onClick={closeMenu}
              className={`text-lg font-medium w-full text-center py-2 rounded-md transition-colors ${
                path === "/dashboard"
                  ? "text-white bg-secondary px-4"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Profile
            </Link>

            <LogoutButton />
          </div>
        )
      )}
    </>
  );
}

// ------------------------------------------------------------------
// 🚀 Main Navbar (Safe & Static Wrapper)
// ------------------------------------------------------------------
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full font-['Inter',sans-serif] transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur py-2"
          : "border-transparent bg-transparent py-4"
      }`}
    >
      {isScrolled && (
        <div className="bg-linear-to-r from-transparent via-primary to-transparent absolute bottom-0 left-0 h-0.5 w-full" />
      )}

      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* ✅ লোগো - ইনস্ট্যান্ট লোড হবে */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={"/Logo.png"}
            alt="JnUITS Logo"
            width={300}
            height={300}
            unoptimized
            priority
            className="h-12 w-12 md:h-14 md:w-14"
          />
        </Link>

        {/* ✅ ডেস্কটপ ন্যাভবার */}
        <div className="hidden items-center space-x-8 md:flex">
          {/* শুধু ডাইনামিক লিংকগুলোকে Suspense-এ রাখা হলো */}
          <Suspense
            fallback={<Skeleton className="h-6 w-64 bg-slate-800/20" />}
          >
            <DesktopLinks />
          </Suspense>

          <Separator
            orientation="vertical"
            className="h-10 my-4 bg-secondary/30"
          />

          {/* শুধু Auth ডাটাকে Suspense-এ রাখা হলো */}
          <Suspense fallback={<UserMenuFallback />}>
            <UserMenu />
          </Suspense>
        </div>

        {/* ✅ মোবাইল ন্যাভবার */}
        <div className="flex items-center gap-4 md:hidden">
          <Suspense fallback={<UserMenuFallback />}>
            <UserMenu />
          </Suspense>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              aria-label="Toggle menu"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] border-slate-800 bg-slate-900 text-white sm:w-87.5 font-['Inter',sans-serif]"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-serif text-primary">
                  JnUITS Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-3 justify-center items-center">
                {/* মোবাইলের ডাইনামিক লিংক */}
                <Suspense
                  fallback={<Skeleton className="h-40 w-full bg-slate-800" />}
                >
                  <MobileLinks closeMenu={() => setIsOpen(false)} />
                </Suspense>

                <Separator className="bg-slate-800 mt-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
