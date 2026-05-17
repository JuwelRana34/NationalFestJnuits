"use client";

import React, { useState } from "react";
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
  Menu,
  X,
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
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: <Users size={18} />,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: <FileText size={18} />,
    label: "Events",
    href: "/admin/events",
  },
  {
    icon: <BarChart3 size={18} />,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: <Shield size={18} />,
    label: "Permissions",
    href: "/admin/permissions",
  },
  {
    icon: <Settings size={18} />,
    label: "Settings",
    href: "/admin/settings",
  },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="lg:hidden fixed top-24 left-0 right-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-bold">Admin</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 w-9"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t bg-background">
            <div className="space-y-2 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block",
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

              <div className="border-t my-2 pt-2 space-y-2">
                <Link href="/admin/settings" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
