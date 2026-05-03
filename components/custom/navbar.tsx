// "use client";

// import { Separator } from "@/components/ui/separator";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import { motion } from "motion/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import * as React from "react";
// import { useState } from "react";
// import UserMenu from "./userInfo";
// // Navlink er jonno TypeScript interface
// interface NavLink {
//   title: string;
//   href: string;
// }

// const navLinks: NavLink[] = [
//   { title: "Home", href: "/" },
//   { title: "About", href: "#about" },
//   { title: "Segments", href: "#segments" },
//   { title: "Events", href: "/events" },
//   { title: "Contact", href: "/contact" },
//   { title: "Profile", href: "/dashboard" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const path = usePathname();

//   // Scroll event listener
//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 15);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled
//           ? "bg-slate-900 shadow-md backdrop-blur py-2"
//           : "border-transparent bg-transparent py-4"
//       }`}
//     >
//       {isScrolled && (
//         <div className="bg-linear-to-r from-transparent via-cyan-400 to-transparent absolute bottom-0 left-0 h-px w-full" />
//       )}

//       <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
//         {/* Desktop Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <span className="font-serif text-xl font-bold tracking-wider text-amber-400">
//             JnUITS
//           </span>
//         </Link>

//         {/* Desktop Navigation Links */}
//         <div className="hidden items-center space-x-8 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.title}
//               href={link.href}
//               className={`text-md font-medium relative py-1 transition-colors ${
//                 path === link.href
//                   ? "text-secondary"
//                   : "text-slate-300 hover:text-white"
//               }`}
//             >
//               {link.title}
//               {/* Active underline */}
//               {path === link.href && (
//                 <motion.span
//                   layoutId="underline"
//                   className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shadow-[0_0_8px_rgba(251,191,36,0.8)]"
//                   initial={{ scaleX: 0, opacity: 0 }}
//                   animate={{ scaleX: 1, opacity: 1 }}
//                   transition={{ duration: 0.3, ease: "easeOut" }}
//                   style={{ originX: 0 }}
//                 />
//               )}
//             </Link>
//           ))}
//           <Separator
//             orientation="vertical"
//             className="h-10 my-4  bg-secondary/30"
//           />
//         </div>

//         {/* Mobile Navigation (Sheet) */}

//         <UserMenu />

//         <div className="flex items-center gap-4 md:hidden">
//           {/* Mobile Profile Image/Login (Outside Sheet) */}
//           {/* {isLoading ? (
//             <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
//           ) : user ? (
//             <Image
//               src={user?.image || ""}
//               alt="User Image"
//               width={45}
//               height={45}
//               className="rounded-full"
//               unoptimized
//             />
//           ) : (
//             <Link href="/signin" className="text-sm font-medium text-white">Login</Link>
//           )} */}

//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger>
//               <div className="hover:bg-slate-800 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white transition-colors">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle menu</span>
//               </div>
//             </SheetTrigger>
//             <SheetContent
//               side="right"
//               className="w-[80vw] border-slate-800 bg-slate-900 text-white sm:w-87.5"
//             >
//               <SheetHeader className="text-left">
//                 <SheetTitle className="font-serif text-amber-400">
//                   JnUITS Menu
//                 </SheetTitle>
//               </SheetHeader>
//               <div className="mt-8 flex flex-col space-y-4 justify-center items-center">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.title}
//                     href={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className={`text-lg font-medium ${path === link.href ? "text-white bg-secondary px-4 py-2 rounded " : "text-slate-300"} transition-colors `}
//                   >
//                     {link.title}
//                   </Link>
//                 ))}
//                 <Separator className="bg-slate-800" />
//                 {/* {isLoading ? null : user ? (
//                   <LogoutButton />
//                 ) : (
//                   <div className="flex w-full flex-col gap-3 px-2">
//                     <Link href="/signin" onClick={() => setIsOpen(false)}>
//                       <Button variant="outline" className="w-full text-slate-900">Login</Button>
//                     </Link>
//                     <Link href="/registration" onClick={() => setIsOpen(false)}>
//                       <Button className="bg-amber-500 hover:bg-amber-600 w-full text-slate-900">
//                         Register Now
//                       </Button>
//                     </Link>
//                   </div>
//                 )} */}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserMenu from "./userInfo";

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "#about" },
  { title: "Segments", href: "#segments" },
  { title: "Events", href: "/events" },
  { title: "Contact", href: "/contact" },
  { title: "Profile", href: "/dashboard" },
];

function UserMenuFallback() {
  return (
    <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-1 ring-cyan-500 shadow-lg" />
  );
}

// ------------------------------------------------------------------
// 🏗️ আর্কিটেকচার: usePathname-এর জন্য আইসোলেটেড কম্পোনেন্ট
// ------------------------------------------------------------------

function DesktopLinks() {
  const path = usePathname(); // ডাইনামিক হুক এখন শুধু এই ছোট কম্পোনেন্টের ভেতর বন্দি!

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={`text-md font-medium relative py-1 transition-colors ${
            path === link.href
              ? "text-secondary"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {link.title}
          {path === link.href && (
            <motion.span
              layoutId="underline"
              className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          )}
        </Link>
      ))}
    </>
  );
}

function MobileLinks({ closeMenu }: { closeMenu: () => void }) {
  const path = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          onClick={closeMenu}
          className={`text-lg font-medium ${
            path === link.href
              ? "text-white bg-secondary px-4 py-2 rounded"
              : "text-slate-300"
          } transition-colors`}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
}

// ------------------------------------------------------------------
// 🚀 Main Navbar (Safe & Static Wrapper)
// ------------------------------------------------------------------
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ❌ usePathname এখান থেকে রিমুভ করা হয়েছে। ফলে Navbar এখন পুরোপুরি বিল্ড-সেফ!

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900 shadow-md backdrop-blur py-2"
          : "border-transparent bg-transparent py-4"
      }`}
    >
      {isScrolled && (
        <div className="bg-linear-to-r from-transparent via-cyan-400 to-transparent absolute bottom-0 left-0 h-px w-full" />
      )}

      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* ✅ লোগো - ইনস্ট্যান্ট লোড হবে */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-wider text-amber-400">
            JnUITS
          </span>
        </Link>

        {/* ✅ ডেস্কটপ ন্যাভবার */}
        <div className="hidden items-center space-x-8 md:flex">
          {/* শুধু ডাইনামিক লিংকগুলোকে Suspense-এ রাখা হলো */}
          <Suspense fallback={<Skeleton className="h-6 w-64 bg-slate-800" />}>
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
            <SheetTrigger>
              <div className="hover:bg-slate-800 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] border-slate-800 bg-slate-900 text-white sm:w-87.5"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-serif text-amber-400">
                  JnUITS Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4 justify-center items-center">
                {/* মোবাইলের ডাইনামিক লিংক */}
                <Suspense
                  fallback={<Skeleton className="h-40 w-full bg-slate-800" />}
                >
                  <MobileLinks closeMenu={() => setIsOpen(false)} />
                </Suspense>

                <Separator className="bg-slate-800" />

                <Suspense fallback={<UserMenuFallback />}>
                  <UserMenu />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}