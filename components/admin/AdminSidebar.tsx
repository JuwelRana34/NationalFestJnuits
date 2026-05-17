"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  FileText,
  BarChart3,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: <Users size={20} />,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: <FileText size={20} />,
    label: "Events",
    href: "/admin/events",
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: <Shield size={20} />,
    label: "Permissions",
    href: "/admin/permissions",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-background ">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-6 pt-26">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Link href="/admin/settings">
          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
