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
} from "lucide-react";
import Link from "next/link";

// ==========================================
// Mock Data (পরে এগুলো Drizzle ORM দিয়ে ডেটাবেস থেকে আসবে)
// ==========================================
const stats = [
  {
    title: "Total Revenue",
    value: "৳1,25,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Registrations",
    value: "842",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Pending Verifications",
    value: "45",
    change: "Action required",
    trend: "neutral",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Active Events",
    value: "4",
    change: "Live now",
    trend: "neutral",
    icon: CalendarDays,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const recentRegistrations = [
  {
    id: "1",
    trackingId: "TRK-12345",
    name: "Md. Juwel Rana",
    event: "Hackathon 2026",
    amount: "৳1000",
    status: "VERIFIED",
    date: "10 mins ago",
  },
  {
    id: "2",
    trackingId: "TRK-98765",
    name: "Tareq Hasan",
    event: "Programming Contest",
    amount: "৳500",
    status: "PENDING",
    date: "1 hour ago",
  },
  {
    id: "3",
    trackingId: "TRK-45678",
    name: "Rakib Uddin",
    event: "UI/UX Workshop",
    amount: "৳100",
    status: "VERIFIED",
    date: "2 hours ago",
  },
  {
    id: "4",
    trackingId: "TRK-23456",
    name: "Alif Hossain",
    event: "Hackathon 2026",
    amount: "৳1000",
    status: "PENDING",
    date: "3 hours ago",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin. Here is what&apos;s happening with your events
            today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm">
            Export Report
          </button>
          <Link
            href="/admin/events/create"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm"
          >
            + Create Event
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">
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
                      ? "text-green-600"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Registrations
            </h3>
            <Link
              href="/admin/registrations"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Tracking ID</th>
                  <th className="p-4 font-medium">Participant</th>
                  <th className="p-4 font-medium">Event</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-mono font-medium text-gray-900">
                      {reg.trackingId}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{reg.name}</p>
                      <p className="text-xs text-gray-500">{reg.date}</p>
                    </td>
                    <td className="p-4 text-gray-600">{reg.event}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {reg.amount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          reg.status === "VERIFIED"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {reg.status === "VERIFIED" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 mr-1" />
                        )}
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Pending Tasks (Takes up 1 column) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-orange-100 bg-orange-50/50">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Verify Payments
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  45 pending manual payment verifications require attention.
                </p>
                <Link
                  href="/admin/payments"
                  className="text-xs font-medium text-orange-600 hover:text-orange-700 mt-2 inline-block"
                >
                  Review now &rarr;
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Project Submissions
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  12 new projects submitted for Hackathon 2026.
                </p>
                <Link
                  href="/admin/submissions"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
                >
                  View submissions &rarr;
                </Link>
              </div>
            </div>

            {/* Quick Link Item */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Manage Events
                </span>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
