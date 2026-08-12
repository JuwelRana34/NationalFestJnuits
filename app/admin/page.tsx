"use client"; // app/admin/page.tsx

import { useEffect, useState } from "react";
import FetchDashboardData from "@/features/adminDashboard/Services";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  MoreVertical,
  Users,
  Lock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define a basic type for the expected data to improve TypeScript support
interface DashboardData {
  stats?: {
    totalRevenue?: number;
    totalRegistrations?: number;
    pendingVerifications?: number;
    activeEvents?: number;
  };
  recentRegistrations?: Array<{
    id?: string;
    trackingId?: string;
    name?: string;
    createdAt?: string;
    eventName?: string;
    amount?: number;
    status?: string;
  }>;
  quickActions?: {
    newSubmissionsCount?: number;
  };
}

export default function DashboardOverviewPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        // 1. Get cookies on the client side
        const token = document.cookie;

        // 💎 Premium Unauthorized State (Client-side check)
        if (!token) {
          router.push("/signin");
          return;
        }

        // 2. Fetch API Data
        const { status, response } = await FetchDashboardData(token);

        // Handle Unauthorized from API response
        if (status === 401 || status === 403) {
          router.push("/signin");
          return;
        }

        // 3. Safe Error check
        if (status !== 200 || !response?.success || !response?.data) {
          if (isMounted) setHasError(true);
        } else {
          if (isMounted) setData(response.data);
        }
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-indigo-500">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium animate-pulse">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Handle Error State
  if (hasError || !data) {
    return (
      <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="backdrop-blur-xl bg-red-500/10 p-8 rounded-2xl shadow-sm border border-red-500 max-w-md w-full text-center space-y-4 transition-all hover:shadow-md">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-red-500">
              Access Denied or Error!
            </h2>
            <p className="text-gray-400 text-sm">
              Unable to load dashboard data. Please try again later or log in
              with a valid administrator account.
            </p>
            <div className="pt-4">
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors shadow-sm w-full sm:w-auto"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Nullish Coalescing (??) Default Values
  const stats = [
    {
      title: "Total Revenue",
      value: `৳${(data?.stats?.totalRevenue ?? 0).toLocaleString()}`,
      change: "All time",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Registrations",
      value: (data?.stats?.totalRegistrations ?? 0).toString(),
      change: "All events",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Verifications",
      value: (data?.stats?.pendingVerifications ?? 0).toString(),
      change: "Action required",
      trend: "neutral",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Active Events",
      value: (data?.stats?.activeEvents ?? 0).toString(),
      change: "Live now",
      trend: "neutral",
      icon: CalendarDays,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin. Here is what&apos;s happening with your events
            today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/events/create"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            + Create Event
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-primary mt-2">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span
                  className={`font-medium ${
                    stat.trend === "up"
                      ? "text-secondary"
                      : stat.trend === "down"
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </span>
                {stat.trend === "up" && (
                  <span className="text-gray-400 ml-2">from last month</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">
              Recent Registrations
            </h3>
            <Link
              href="/admin/registrations"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-500 flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Tracking ID</th>
                  <th className="p-4 font-medium">Participant</th>
                  <th className="p-4 font-medium">Event</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-sm">
                {/* 5. Safe Array Check */}
                {data?.recentRegistrations &&
                data.recentRegistrations.length > 0 ? (
                  data.recentRegistrations.map((reg) => {
                    // 6. Safe Date formatting
                    let timeAgo = "Unknown";
                    try {
                      if (reg.createdAt) {
                        timeAgo = formatDistanceToNow(new Date(reg.createdAt), {
                          addSuffix: true,
                        });
                      }
                    } catch (error) {
                      console.error("Invalid date string:", reg.createdAt);
                    }

                    return (
                      <tr
                        key={reg.id || reg.trackingId}
                        className="hover:bg-primary/10 transition-colors"
                      >
                        <td className="p-4 font-mono font-medium text-slate-300 text-sm">
                          {reg.trackingId ?? "N/A"}
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-slate-300">
                            {reg.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-slate-500">{timeAgo}</p>
                        </td>
                        <td className="p-4 text-slate-400">
                          {reg.eventName ?? "Unknown"}
                        </td>
                        <td className="p-4 font-medium text-slate-300">
                          ৳{reg.amount ?? 0}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              reg.status === "VERIFIED"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : reg.status === "REJECTED"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {reg.status === "VERIFIED" ? (
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 mr-1" />
                            )}
                            {reg.status ?? "PENDING"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      No recent registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-primary mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-800">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-300 text-sm">
                  Verify Payments
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {data?.stats?.pendingVerifications ?? 0} pending manual
                  payment verifications require attention.
                </p>
                <Link
                  href="/admin/registrations"
                  className="text-xs font-medium text-indigo-400 hover:text-orange-700 mt-2 inline-block"
                >
                  Review now &rarr;
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-300 text-sm">
                  Project Submissions
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {data?.quickActions?.newSubmissionsCount ?? 0} total projects
                  submitted across all events.
                </p>
                <Link
                  href="/admin/submissions"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-600 mt-2 inline-block"
                >
                  View submissions &rarr;
                </Link>
              </div>
            </div>

            <Link
              href="/admin/events"
              className="pt-4 border-t border-slate-700 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white group-hover:bg-cyan-200 transition-colors">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-500 transition-colors">
                  Manage Events
                </span>
              </div>
              <MoreVertical className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
