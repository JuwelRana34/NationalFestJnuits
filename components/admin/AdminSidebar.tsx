"use client";

import { DashboardNavItems } from "@/app/constant/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function AdminSidebarInner() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-background">
      {/* Header - Fixed the weird pt-26 class so it centers perfectly in the h-16 box */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Admin Panel
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {DashboardNavItems.map((item) => {
          const isActive = pathname === item.Path;
          return (
            <Link
              key={item.Path}
              href={item.Path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/16",
              )}
            >
              {/* {item.icon} */}
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        {/* FIXED: Using asChild to prevent rendering a <button> inside an <a> tag */}
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

// Fallback skeleton that renders instantly on the server
function SidebarSkeleton() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <div className="h-6 w-32 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex-1 space-y-2 px-4 py-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-12 w-full rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
      <div className="border-t p-4 space-y-2">
        <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
        <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
      </div>
    </aside>
  );
}

// Exported wrapper that protects server layouts from usePathname
export function AdminSidebar() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <AdminSidebarInner />
    </Suspense>
  );
}
