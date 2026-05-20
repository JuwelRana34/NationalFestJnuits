"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  TicketPercent,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useState } from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/admin" },
  { icon: <Users size={18} />, label: "Users", href: "/admin/users" },
  { icon: <FileText size={18} />, label: "Events", href: "/admin/events" },
  {
    icon: <TicketPercent size={20} />,
    label: "Coupons",
    href: "/admin/coupon",
  },
];

// Inner component handling the dynamic routing and state
function AdminNavbarInner() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Admin
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 w-9"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-background shadow-lg">
          <div className="space-y-1 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}

            <div className="border-t mt-4 pt-4 space-y-2">
              {/* FIXED: Using asChild to prevent rendering a <button> inside an <a> tag */}

              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Fallback skeleton that renders instantly on the server
function NavbarSkeleton() {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="h-6 w-16 rounded bg-muted animate-pulse" />
      <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
    </header>
  );
}

// Exported wrapper that protects server layouts from usePathname
export function AdminNavbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <AdminNavbarInner />
    </Suspense>
  );
}
