"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">View platform analytics and insights</p>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Calendar size={18} className="mr-2" />
          Date Range
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Page Views</p>
              <p className="text-2xl md:text-3xl font-bold mt-2">45,231</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">+12.5% from last week</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <BarChart3 size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unique Users</p>
              <p className="text-2xl md:text-3xl font-bold mt-2">12,584</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">+8.2% from last week</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
              <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
              <p className="text-2xl md:text-3xl font-bold mt-2">32.5%</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">-2.1% from last week</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <BarChart3 size={24} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-6">Traffic Over Time</h2>
        <div className="h-72 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={40} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">Chart data would render here</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Top Pages</h2>
          <div className="space-y-3">
            {[
              { name: "/events", views: 15200 },
              { name: "/dashboard", views: 12500 },
              { name: "/registration", views: 9800 },
              { name: "/about", views: 5600 },
            ].map((page, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0">
                <span className="text-sm font-medium">{page.name}</span>
                <span className="text-sm text-muted-foreground">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Top Referrers</h2>
          <div className="space-y-3">
            {[
              { name: "Google", visits: 8900 },
              { name: "Facebook", visits: 5400 },
              { name: "Twitter", visits: 3200 },
              { name: "Direct", visits: 2100 },
            ].map((referrer, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0">
                <span className="text-sm font-medium">{referrer.name}</span>
                <span className="text-sm text-muted-foreground">{referrer.visits.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
