import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

// ক্লায়েন্ট কম্পোনেন্টগুলো ইমপোর্ট করছি
import AuthWidget from "./AuthWidget";
import DesktopLinks from "./DesktopLinks";
import MobileNav from "./MobileNav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-black/90 backdrop-blur-md py-4">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-8">
        {/* 🎯 ১. লোগো (Static SSR) */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="JnUITS Logo"
            width={300}
            height={300}
            unoptimized
            priority
            className="h-12 w-12 md:h-14 md:w-14"
          />
        </Link>

        {/* 🎯 ২. ডেস্কটপ লিংকস (Static SSR) */}
        <div className="hidden items-center space-x-8 md:flex">
          <Suspense
            fallback={
              <div className="h-10 w-32 rounded bg-slate-700/50 animate-pulse" />
            }
          >
            <DesktopLinks />
            {/* <a href="/adminDashboard">Admin Dashboard</a> */}
          </Suspense>

          <Separator
            orientation="vertical"
            className="h-10 my-4 bg-secondary/30"
          />

          {/* 🎯 ৩. Auth বাটন (Isolated Client Component) */}
          <AuthWidget />
        </div>

        {/* 🎯 ৪. মোবাইল মেনু (Isolated Client Component) */}
        <div className="flex items-center gap-4 md:hidden">
          <Suspense
            fallback={
              <Skeleton className="h-10 w-10 rounded-md bg-slate-800" />
            }
          >
            <MobileNav />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
