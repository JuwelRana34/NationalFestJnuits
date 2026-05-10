"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getUserRegistrations } from "@/features/users/queries";
import { useAuth } from "@/hooks/useUserSession";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Clock3,
  MapPin,
  Megaphone,
  QrCode,
  Receipt,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
type FetchedResponse = Awaited<ReturnType<typeof getUserRegistrations>>;
export type Registration = NonNullable<FetchedResponse["data"]>[number];


// ==========================================
// 1. TYPES & INTERFACES (Mapped to your JSON)
// ==========================================

export type Announcement = {
  id: number;
  title: string;
  message: string;
  time: string;
  isNew?: boolean;
};

export interface UserProfile {
  name: string;
  festPoints: number;
}

// export interface Registration {
//   registrationId: string;
//   trackingNumber: string;
//   status: "PENDING" | "SELECTED" | "REJECTED" | string | null;
//   category: "UNIVERSITY" | "SCHOOL_COLLEGE" | string | null;

//   participant: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string | null;
//     institution: string | null;
//   } | null;

//   event: {
//     id: string;
//     title: string;
//     date: string | null;
//     time: string | null;
//     venue: string | null;
//     baseFee: number | null;
//   };

//   team: {
//     id: string;
//     name: string;
//     code: string;
//     teamLead: {
//       id: string;
//       name: string;
//       email: string;
//       phone: string | null;
//       institution: string | null;
//     } | null;
//   };
//   members: {
//     id: string;
//     name: string;
//     phone: string;
//     institution: string | null;
//     department: string | null;
//     createdAt: Date;
//     userId: string | null;
//     teamId: string;
//     studentIdScan: string;
//     isLeader: boolean;
//   }[];

//   finance: {
//     paymentStatus: "SUCCESS" | "PENDING" | "FAILED" | string | null;
//     paidAmount: number;
//     baseAmount: number;
//     paymentMethod: string | null;
//     transactionId: string | null;
//     couponApplied: string | null;
//     discountPercentage: number;
//   };
// }



export default function EnhancedDashboard({
  announcements,
  registrations,
}: {
  announcements: Announcement[];
  registrations: Registration[];
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 },
    },
  };

  const {user}= useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 pb-20">
      {/* Decorative Background Blur */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent pointer-events-none z-0" />

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12 space-y-10 relative z-10">
        {/* --- HEADER SECTION --- */}
        <motion.header
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold tracking-wide uppercase mb-1 border border-blue-200/50 dark:border-blue-800/50">
              <Sparkles size={14} /> Participant Portal
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {user?.name}
              </span>
              !
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              You are managing{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                {registrations.length} registrations
              </strong>{" "}
              for upcoming events.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <Star size={18} className="fill-amber-500 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Fest Points
                </p>
                <p className="text-lg font-black leading-none mt-0.5">
                  {/* {user.} */}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-md transition-all active:scale-95 text-sm">
              <QrCode size={18} />
              QR Pass Dekhun
            </button>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {}
          {/* --- LEFT COLUMN: REGISTRATIONS --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Ticket className="text-slate-400" size={22} /> My Events
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence>
                {registrations.map((reg) => (
                  <motion.div
                    key={reg.registrationId}
                    variants={itemVariants}
                    layout
                  >
                    <Card className="flex flex-col overflow-hidden border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/50 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row">
                        {/* Event Info Section (Left/Top) */}
                        <div className="p-6 md:w-3/5 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/80 relative">
                          {/* Status Indicators */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                              {reg.status === "SELECTED" ? (
                                <Badge
                                  variant="success"
                                  className="gap-1 shadow-sm"
                                >
                                  <CheckCircle2 size={12} /> Selected
                                </Badge>
                              ) : reg.status === "PENDING" ? (
                                <Badge
                                  variant="warning"
                                  className="gap-1 shadow-sm"
                                >
                                  <Clock3 size={12} /> Reviewing
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="gap-1 shadow-sm"
                                >
                                  <AlertCircle size={12} /> {reg.status}
                                </Badge>
                              )}

                              <Badge
                                variant={
                                  reg.category === "UNIVERSITY"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-[10px] uppercase tracking-wider"
                              >
                                {reg.category || "General"}
                              </Badge>
                            </div>
                            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                              {reg.trackingNumber}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold leading-tight mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {reg.event.title}
                          </h3>

                          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <CalendarDays size={14} />
                              </div>
                              <span className="font-medium">
                                {reg.event.date
                                  ? new Date(reg.event.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      },
                                    )
                                  : "TBA"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <Clock size={14} />
                              </div>
                              <span className="font-medium">
                                {reg.event.time || "TBA"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 w-full mt-1">
                              <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <MapPin size={14} />
                              </div>
                              <span className="truncate font-medium capitalize">
                                {reg.event.venue || "TBA"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Finance & Team Section (Right/Bottom) */}
                        <div className="md:w-2/5 flex flex-col bg-slate-50/50 dark:bg-slate-900/30">
                          {/* Finance Receipt Block */}
                          <div className="p-5 border-b border-slate-100 dark:border-slate-800 grow">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                <Receipt size={16} className="text-slate-400" />{" "}
                                Payment Status
                              </span>
                              {reg.finance.paymentStatus === "SUCCESS" ? (
                                <Badge
                                  variant="success"
                                  className="text-[10px] uppercase gap-1 bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                                >
                                  <ShieldCheck size={10} /> Paid
                                </Badge>
                              ) : (
                                <Badge
                                  variant="destructive"
                                  className="text-[10px] uppercase gap-1 bg-red-100/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                                >
                                  <AlertCircle size={10} /> Unpaid
                                </Badge>
                              )}
                            </div>

                            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 shadow-sm">
                              <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                  <p className="text-xs text-slate-500 flex items-center gap-1">
                                    Base Fee: ৳{reg.finance.baseAmount}
                                  </p>
                                  {reg.finance.couponApplied && (
                                    <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                      <Tag size={10} />{" "}
                                      {reg.finance.couponApplied} (-
                                      {reg.finance.discountPercentage}%)
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] text-slate-400 font-medium mb-0.5 uppercase tracking-wider">
                                    Total Paid
                                  </p>
                                  <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                    ৳{reg.finance.paidAmount}
                                  </p>
                                </div>
                              </div>
                              {reg.finance.paymentMethod &&
                                reg.finance.transactionId && (
                                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                                    <p className="text-[10px] text-slate-400 font-mono">
                                      TNX: {reg.finance.transactionId}
                                    </p>
                                  </div>
                                )}
                            </div>

                            {reg.finance.paymentStatus !== "SUCCESS" && (
                              <button className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                                Pay Now (৳{reg.finance.baseAmount})
                              </button>
                            )}
                          </div>

                          {/* Participation Type (Footer of Right Column) */}
                          <div className="px-5 py-3.5 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/50 mt-auto">
                            {reg.team ? (
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center">
                                  <Users size={14} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    {reg.team.name}
                                  </p>
                                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                    {reg.team.members.length + 1} Members •{" "}
                                    {reg.team.code}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center">
                                  <User size={14} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    Solo Entry
                                  </p>
                                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                                    {reg.participant?.name}
                                  </p>
                                </div>
                              </div>
                            )}
                            <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                              <ChevronRight size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {}
          {/* --- RIGHT COLUMN: SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-6">
            {/* Announcements Card */}
            <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 overflow-hidden relative text-white">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl shadow-sm">
                    <Megaphone size={18} />
                  </div>
                  <h2 className="text-lg font-bold">Latest Updates</h2>
                </div>

                <div className="space-y-5">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="relative pl-4 border-l-2 border-white/20"
                    >
                      {announcement.isNew && (
                        <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white text-sm">
                          {announcement.title}
                        </h3>
                      </div>
                      <p className="text-xs text-blue-100 leading-relaxed mb-1.5 opacity-90">
                        {announcement.message}
                      </p>
                      <span className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">
                        {announcement.time}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2.5 text-sm font-bold text-blue-700 bg-white rounded-xl shadow-sm hover:bg-blue-50 transition-colors">
                  View All Announcements
                </button>
              </div>
            </Card>

            {/* Quick Support Card */}
            <Card className="p-6 border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="text-center space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-1">
                  <AlertCircle className="text-slate-500" size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Need Help?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto leading-relaxed">
                  Having trouble with your team registration or payment? We are
                  here.
                </p>
                <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 mt-2">
                  Contact Support
                </button>
              </div>
            </Card>
          </div>
        </motion.div>

        {}
        {/* --- FLOATING ACTION BUTTON --- */}
        <motion.div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <motion.button
            className="flex items-center gap-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-full font-bold shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all border border-slate-700 dark:border-slate-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} className="text-amber-400" />
            <span>Fest AI</span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
