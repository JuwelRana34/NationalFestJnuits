"use client";

import { DashboardNavItems } from "@/app/constant/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import LogoutButton from "../custom/logout";

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
            {DashboardNavItems.map((item) => {
              const isActive = pathname === item.Path;
              return (
                <Link
                  key={item.Path}
                  href={item.Path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/20",
                  )}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              );
            })}

            <div className="border-t mt-4 pt-4 space-y-2">
          

              <LogoutButton />
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
