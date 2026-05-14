"use client";
import { FileText, LayoutDashboard, User, Users } from "lucide-react";
import { useState } from "react";
import { DashboardData, TabKey } from "../Types";
import { ProfileView } from "./ProfileView";
import { EmptyState, RegistrationsView } from "./RegistrationsView";
import { TeamsView } from "./TeamsView";
import { useAuth } from "@/hooks/useUserSession";

// --- Main Dashboard Layout Component ---

export default function Dashboard({
  DashboardData,
}: {
  DashboardData: DashboardData;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const data = DashboardData;
   const {user} = useAuth();

 if(!user){
    return (
      <div className="pt-20 flex min-h-screen justify-center items-center rounded">
        Please log in to view your dashboard.
      </div>
    );
   }

  const navItems = [
    { id: "overview", label: "Profile Overview", icon: User },
    { id: "registrations", label: "Registrations", icon: FileText },
    { id: "teams", label: "My Teams", icon: Users },
    { id: "submissions", label: "Submissions", icon: LayoutDashboard },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col z-10 sticky top-0 md:h-screen">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-500">
            JnU Fest Portal
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto flex md:flex-col overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap md:whitespace-normal
                ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${activeTab === item.id ? "text-indigo-600" : "text-slate-400"}`}
              />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 hidden md:block">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
              {data.profile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">
                {data.profile.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {data.profile.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-w-6xl mx-auto w-full">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 capitalize tracking-tight">
            {activeTab.replace("-", " ")}
          </h2>
          <p className="text-slate-500 mt-1">
            Manage your fest participation and details.
          </p>
        </header>

        <div className="space-y-8">
          {activeTab === "overview" && <ProfileView profile={data.profile} />}
          {activeTab === "registrations" && (
            <RegistrationsView registrations={data.registrations} />
          )}
          {activeTab === "teams" && <TeamsView teams={data.teams} />}
          {activeTab === "submissions" && (
            <EmptyState
              icon={LayoutDashboard}
              title="No Submissions Yet"
              description="Project or task submissions will appear here once you make them."
            />
          )}
        </div>
      </main>
    </div>
  );
}
