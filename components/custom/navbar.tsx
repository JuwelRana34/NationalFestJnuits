"use client";

import LogoutButton from "@/components/custom/logout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useUserSession";
import { Menu } from "lucide-react"; // Removed LogOut as it's inside LogoutButton
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "#about" },
  { title: "Segments", href: "#segments" },
  { title: "Schedule", href: "#schedule" },
  { title: "Contact", href: "/contact" },
  { title: "Profile", href: "/dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const {user, isLoading, error} = useAuth();
  
  // Scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      // ২০ পিক্সেলের বেশি স্ক্রল করলে ব্যাকগ্রাউন্ড চেঞ্জ হবে
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? " bg-slate-900 shadow-md backdrop-blur  py-2"
          : "border-transparent bg-transparent py-4"
      }`}
    >
      {isScrolled && (
        <div
          className={`bg-linear-to-r from-transparent via-cyan-400  to-transparent-400 h-px w-full absolute bottom-0 left-0`}
        />
      )}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Desktop Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-wider text-amber-400">
            JnUITS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={
                link.href === "/dashboard" && user?.id
                  ? `/dashboard/${user?.id}`
                  : link.href
              }
              className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400"
            >
              {link.title}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-6 bg-slate-700" />
          {isLoading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
          ) : user ? (
            <LogoutButton />
          ) : (
            <Link href="/signin">Login</Link>
          )}
          {isLoading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
          ) : user ? (
            <div>
              <Image
                src={user?.image || ""}
                alt="User Image"
                width={45}
                height={45}
                className="rounded-full"
                unoptimized
              />
            </div>
          ) : (
            <Link href="/registration">
              <Button className="rounded bg-amber-500 py-5 font-semibold text-slate-900 hover:bg-amber-600">
                Register Now
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation (Sheet) */}
        <div className="flex items-center gap-4 md:hidden">
          {isLoading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
          ) : user ? (
            <Image
              src={user?.image || ""}
              alt="User Image"
              width={45}
              height={45}
              className="rounded-full"
              unoptimized
            />
          ) : (
            // <LogoutButton />
            <Link href="/signin">Login</Link>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white transition-colors hover:bg-slate-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 border-slate-800 bg-slate-900 text-white"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-serif text-amber-400">
                  JnUITS Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4 justify-center items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={
                      link.href === "/dashboard" && user?.id
                        ? `/dashboard/${user?.id}`
                        : link.href
                    }
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 transition-colors hover:text-amber-400"
                  >
                    {link.title}
                  </Link>
                ))}
                <Separator className="bg-slate-800" />
                {isLoading ? null : user ? (
                  <LogoutButton />
                ) : (
                  <Link
                    href="/signin"
                    className="w-[95%] bg-amber-500 font-semibold text-slate-900 hover:bg-amber-600 rounded mx-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
