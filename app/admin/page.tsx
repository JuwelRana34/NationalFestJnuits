"use client";

import React from "react";
import {
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12% from last month",
    icon: <Users size={24} />,
    bgColor: "bg-blue-50 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Active Events",
    value: "8",
    change: "+2 new events",
    icon: <Calendar size={24} />,
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+8.2% from last month",
    icon: <TrendingUp size={24} />,
    bgColor: "bg-purple-50 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Pending Issues",
    value: "12",
    change: "3 critical",
    icon: <AlertCircle size={24} />,
    bgColor: "bg-red-50 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 mt-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <Button className="w-full md:w-auto">Generate Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-lg hover:border-primary"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl md:text-3xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">User Growth</h2>
              <p className="text-sm text-muted-foreground">
                Monthly user registrations
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="h-64 md:h-80 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={40} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">Chart data here</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    New user registered
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Quick Actions */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Add New Event
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              System Settings
            </Button>
          </div>
        </Card>

        {/* Platform Stats */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Platform Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Status</span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Online</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Database</span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Healthy</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cache</span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
