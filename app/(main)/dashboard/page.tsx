// "use client";
// import React from "react";
// import { motion } from "motion/react";
// import {
//   Bell,
//   Calendar,
//   Clock,
//   MapPin,
//   User,
//   Users,
//   ChevronDown,
//   Megaphone,
//   Zap,
//   QrCode,
//   Star,
//   Sparkles,
// } from "lucide-react";
// import Image from "next/image";

// // --- MOCK DATA ---
// const USER = {
//   name: "Alex Rivera",
//   registeredEvents: 4,
//   festPoints: 350,
//   avatarUrl: "https://i.pravatar.cc/150?u=alex",
// };

// const ANNOUNCEMENTS = [
//   {
//     id: 1,
//     title: "Opening Ceremony er jayga poriborton kora hoyeche",
//     message:
//       "Kharap abhawa thakar karone, opening ceremony ekhon Main Auditorium e hobe.",
//     time: "2 ghonta age",
//   },
// ];

// const EVENTS = [
//   {
//     id: 1,
//     title: "Hackathon Kickoff",
//     date: "Oct 15, 2026",
//     time: "09:00 AM",
//     location: "Innovation Lab",
//     category: "Competition",
//     isTeamEvent: true,
//     maxTeamSize: 4,
//   },
//   {
//     id: 2,
//     title: "UI/UX Masterclass",
//     date: "Oct 16, 2026",
//     time: "02:00 PM",
//     location: "Design Studio B",
//     category: "Workshop",
//     isTeamEvent: false,
//   },
//   {
//     id: 3,
//     title: "Networking Mixer",
//     date: "Oct 17, 2026",
//     time: "07:00 PM",
//     location: "Rooftop Lounge",
//     category: "Social",
//     isTeamEvent: false,
//   },
//   {
//     id: 4,
//     title: "Robotics Battle",
//     date: "Oct 18, 2026",
//     time: "10:00 AM",
//     location: "Engineering Block",
//     category: "Competition",
//     isTeamEvent: true,
//     maxTeamSize: 3,
//   },
// ];

// // --- SHADCN-STYLE UI COMPONENTS ---
// const Card = ({
//   className = "",
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => (
//   <div
//     className={`rounded-md border bg-card text-card-foreground shadow-sm ${className}`}
//   >
//     {children}
//   </div>
// );

// const CardHeader = ({
//   className = "",
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
// );

// const CardTitle = ({
//   className = "",
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => (
//   <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
//     {children}
//   </h3>
// );

// const CardContent = ({
//   className = "",
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// const Badge = ({
//   children,
//   variant = "default",
// }: {
//   children: React.ReactNode;
//   variant?: "default" | "secondary" | "outline";
// }) => {
//   const variants = {
//     default:
//       "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
//     secondary:
//       "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
//     outline: "text-foreground",
//   };
//   return (
//     <div
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]}`}
//     >
//       {children}
//     </div>
//   );
// };

// // --- MAIN APPLICATION COMPONENT ---
// export default function App() {
//   return (
//     <>
//       {/* CSS Variables to simulate shadcn/ui theme context */}
//       {/* <style>{`
//         :root {
//           --background: 0 0% 100%;
//           --foreground: 222.2 84% 4.9%;
//           --card: 0 0% 100%;
//           --card-foreground: 222.2 84% 4.9%;
//           --popover: 0 0% 100%;
//           --popover-foreground: 222.2 84% 4.9%;
//           --primary: 221.2 83.2% 53.3%;
//           --primary-foreground: 210 40% 98%;
//           --secondary: 210 40% 96.1%;
//           --secondary-foreground: 222.2 47.4% 11.2%;
//           --muted: 210 40% 96.1%;
//           --muted-foreground: 215.4 16.3% 46.9%;
//           --accent: 210 40% 96.1%;
//           --accent-foreground: 222.2 47.4% 11.2%;
//           --destructive: 0 84.2% 60.2%;
//           --destructive-foreground: 210 40% 98%;
//           --border: 214.3 31.8% 91.4%;
//           --input: 214.3 31.8% 91.4%;
//           --ring: 221.2 83.2% 53.3%;
//           --radius: 0.5rem;
//         }
//         body {
//           font-family: 'Inter', sans-serif;
//           background-color: hsl(var(--background));
//           color: hsl(var(--foreground));
//         }
//       `}</style> */}

//       <div className="min-h-screen pt-20  pb-32">
//         {/* TOP NAVBAR */}

//         {/* MAIN CONTENT */}
//         <main className="container mx-auto max-w-6xl px-4 py-8 space-y-10">
//           {/* WELCOME SECTION */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="flex flex-col md:flex-row md:items-center justify-between gap-4"
//           >
//             <div className="space-y-2">
//               <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2">
//                 Welcome back, {USER.name.split(" ")[0]}!{" "}
//                 <span className="text-yellow-500">
//                   <Sparkles size={28} />
//                 </span>
//               </h1>
//               <p className="text-muted-foreground text-lg">
//                you have already registered for{" "}
//                 <strong className="text-primary font-semibold">
//                   {USER.registeredEvents} event
//                 </strong>{" "}
//                  ready to rock!
//               </p>
//             </div>

//             {/* Feature: Gamification & Digital Pass */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-4 py-2.5 rounded-xl font-semibold border border-yellow-200 dark:border-yellow-800">
//                 <Star size={18} className="fill-yellow-500 text-yellow-500" />
//                 <span>{USER.festPoints} Points</span>
//               </div>
//               <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-opacity">
//                 <QrCode size={18} />
//                 QR Pass Dekhun
//               </button>
//             </div>
//           </motion.section>

//           {/* ANNOUNCEMENTS SECTION */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//           >
//             <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900">
//               <CardContent className="p-4 sm:p-6 flex gap-4 items-start">
//                 <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex-shrink-0 mt-1">
//                   <Megaphone size={20} />
//                 </div>
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-semibold text-blue-900 dark:text-blue-100">
//                       Announcements
//                     </h3>
//                     <Badge variant="secondary">
//                       New
//                     </Badge>
//                   </div>
//                   {ANNOUNCEMENTS.map((announcement) => (
//                     <div key={announcement.id} className="pt-1">
//                       <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
//                         {announcement.title}
//                       </p>
//                       <p className="text-sm text-blue-600/80 dark:text-blue-300/80 mt-0.5 leading-relaxed">
//                         {announcement.message}
//                       </p>
//                       <span className="text-xs text-blue-500/70 block mt-2">
//                         {announcement.time}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.section>

//           {/* MY EVENTS GRID */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//             className="space-y-4"
//           >
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-semibold tracking-tight">
//                your registered segments
//               </h2>
//               <button className="text-sm font-medium text-primary hover:underline underline-offset-4">
//                 View All
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {EVENTS.map((event, index) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
//                 >
//                   <Card className="h-full hover:shadow-md transition-shadow group flex flex-col">
//                     <CardHeader className="pb-3">
//                       <div className="flex justify-between items-start mb-2">
//                         <Badge
//                           variant={
//                             event.category === "Competition"
//                               ? "default"
//                               : "secondary"
//                           }
//                         >
//                           {event.category}
//                         </Badge>
//                         <button className="text-muted-foreground hover:text-foreground transition-colors">
//                           <Bell size={16} />
//                         </button>
//                       </div>
//                       <CardTitle className="text-lg group-hover:text-primary transition-colors">
//                         {event.title}
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-3 mt-auto">
//                       <div className="flex items-center text-sm text-muted-foreground gap-2">
//                         <Calendar size={15} className="text-slate-400" />
//                         <span>{event.date}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-muted-foreground gap-2">
//                         <Clock size={15} className="text-slate-400" />
//                         <span>{event.time}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-muted-foreground gap-2">
//                         <MapPin size={15} className="text-slate-400" />
//                         <span className="truncate">{event.location}</span>
//                       </div>
//                     </CardContent>

//                     {/* Feature: Conditional Team Creation Option */}
//                     {event.isTeamEvent && (
//                       <div className="p-4 border-t bg-slate-50/50 mt-auto rounded-b-md flex items-center justify-between">
//                         <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
//                           <Users size={14} className="text-primary" /> Max{" "}
//                           {event.maxTeamSize} jon
//                         </span>
//                         <button className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md transition-colors font-semibold">
//                           Team Create Korun
//                         </button>
//                       </div>
//                     )}
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>
//         </main>

//         {/* FLOATING ACTION BUTTON - FEST HELPER AI */}
//         <motion.div
//           className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <motion.button
//             className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-full font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//             animate={{
//               boxShadow: [
//                 "0px 0px 0px 0px rgba(37, 99, 235, 0)",
//                 "0px 0px 20px 4px rgba(37, 99, 235, 0.4)",
//                 "0px 0px 0px 0px rgba(37, 99, 235, 0)",
//               ],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0px 0px 25px 8px rgba(37, 99, 235, 0.6)",
//               transition: { duration: 0.2 },
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Sparkles size={20} />
//             Fest Helper AI
//           </motion.button>
//         </motion.div>
//       </div>
//     </>
//   );
// }

// page.tsx — SERVER COMPONENT (default, no "use client")
// Static data, layout, and non-interactive sections live here.

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardWraper } from "@/features/dashboard/components/DashboardWraper";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

// Server Component — fetches/prepares data, passes to client
export default function Page() {
  return (
    <div className="min-h-screen pt-20 pb-32">
      {/*
        All interactive / animated UI is delegated to DashboardClient.
        This server component just passes pre-fetched data as props.
      */}
      <Suspense
        fallback={
          <div className="text-center py-20">
            <Skeleton className="mx-auto mb-4 h-10 w-48 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Skeleton className="mx-auto mb-4 h-6 w-64 rounded" />
            <Sparkles
              size={28}
              className="text-yellow-500 mx-auto mt-6 animate-pulse"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Loading your dashboard...
            </p>
          </div>
        }
      >
        <DashboardWraper />
      </Suspense>
    </div>
  );
}
