"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NaveItems } from "@/app/constant/data";

export default function DesktopLinks() {
  const pathname = usePathname(); // 🎯 বর্তমান URL পাথ বের করছি

  return (
    <>
      {NaveItems.map((link) => {
        const isActive = pathname === link.Path;

        return (
          <Link
            key={link.title}
            href={link.Path}
            className={`text-md font-medium transition-colors ${
              isActive
                ? "text-secondary" // 🎯 পাথ মিলে গেলে এই কালার (Active)
                : "text-slate-300 hover:text-secondary" // 🎯 না মিললে নরমাল কালার
            }`}
          >
            {link.title}
          </Link>
        );
      })}
    </>
  );
}
