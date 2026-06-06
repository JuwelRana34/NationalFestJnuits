// "use client";

// import RegistrationButton from "@/features/payments/Components/TestPayments";
// import { SegmentType } from "@/features/payments/types";
// import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
// import { Calendar, Clock, MapPin } from "lucide-react";
// import { motion } from "motion/react";
// import Link from "next/link";
// import { FullEvent } from "../schema";

// export default function EventCard(events: Partial<FullEvent>) {
//   const {
//     id,
//     title,
//     subtitle,
//     type,
//     date,
//     time,
//     venue,
//     fee,
//     seatsTotal,
//     seatsFilled,
//     isTeamEvent,
//     minMembers,
//     maxMembers,
//     extraMemberFee,
//   } = events;

//   const safeSeatsFilled = Number(seatsFilled ?? 0);
//   const safeSeatsTotal = Number(seatsTotal ?? 0);
//   const fillPercent =
//     safeSeatsTotal > 0
//       ? Math.round((safeSeatsFilled / safeSeatsTotal) * 100)
//       : 0;
//   const seatsLeft = Math.max(0, safeSeatsTotal - safeSeatsFilled);

//   console.log("EventCard Props:", minMembers, maxMembers);
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.3 }}
//       className="relative w-90 rounded-[20px] overflow-hidden border border-primary"
//       style={{
//         boxShadow:
//           "0 0 40px rgba(251,191,36,0.08), 0 20px 60px rgba(0,0,0,0.6)",
//       }}
//     >
//       {/* Bottom glow line */}
//       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />

//       {/* Corner accent */}
//       <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
//         <div
//           className="absolute top-0 right-0 w-0 h-0"
//           style={{
//             borderStyle: "solid",
//             borderWidth: "0 64px 64px 0",
//             borderColor:
//               "transparent rgba(251,191,36,0.15) transparent transparent",
//           }}
//         />
//       </div>
//       <span
//         className="absolute top-1 right-3 z-20 text-[8px] font-bold text-amber-400/60 tracking-widest uppercase"
//         style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
//       >
//         JNUITS
//       </span>

//       {/* Banner */}
//       <div className="relative h-45 bg-linear-to-br from-[#0d1b3e] via-[#0a1628] to-[#0f1f3d] flex items-center justify-center overflow-hidden">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.06) 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         />
//         <div
//           className="absolute w-62.5 h-62.5 rounded-full -top-16 left-1/2 -translate-x-1/2"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
//           }}
//         />

//         <div className="relative z-10 text-center">
//           <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1 mb-3">
//             <motion.div
//               animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-1.5 h-1.5 rounded-full bg-amber-400"
//             />
//             <span className="text-[10px] font-semibold text-amber-400 tracking-[1.5px] uppercase">
//               {title}
//             </span>
//           </div>
//           <div
//             className="font-black text-[22px] text-gray-500 leading-tight tracking-tight"
//             style={{ fontFamily: "'Orbitron', sans-serif" }}
//           >
//             {/* {title} */}
//             {/* <br /> */}
//             <span className="text-amber-400">{subtitle}</span>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="px-5 pt-5 pb-6 bg-gradient  ">
//         <div className="h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent mb-4 " />
//         <div className="space-x-1.5">
//           <span className="inline-flex items-center gap-1.5 bg-blue-400/8 border border-blue-400/20 rounded-md px-2.5 py-1 text-[11px] font-semibold text-blue-300 tracking-[0.8px] uppercase mb-3">
//             ◈ &nbsp;{type}
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-2.5 mb-4">
//           {[
//             { label: "Date", value: formatDate(date), icon: <Calendar size={12} /> },
//             { label: "Time", value: formatTime(time), icon: <Clock size={12} /> },
//             { label: "Venue", value: venue, icon: <MapPin size={12} /> },
//             {
//               label: "Entry Fee",
//               value: fee === 0 ? `৳ ${fee}` : `৳${fee}`,
//               green: fee === 0,
//             },
//           ].map((m) => (
//             <div key={m.label} className="flex flex-col gap-0.5">
//               <span className="text-[10px] font-semibold text-gray-500/30 uppercase tracking-[1px]">
//                 {m.label}
//               </span>
//               <span
//                 className={`text-[13px] font-semibold flex items-center gap-1.5 ${m.green ? "text-green-400" : "text-gray-500/85"}`}
//               >
//                 {m.icon}
//                 {m.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Seats progress */}
//         <div className="mb-5">
//           <div className="flex justify-between items-center mb-1.5">
//             <span className="text-[11px] text-gray-500/40">Seats Filled</span>
//             <span className="text-[11px] font-bold text-amber-400">
//               {fillPercent}% — {seatsLeft} left
//             </span>
//           </div>
//           <div className="h-1 bg-white/8 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${fillPercent}%` }}
//               transition={{ duration: 1.2, ease: "easeOut" }}
//               className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
//             />
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col  gap-2.5">
//           <RegistrationButton
//             minMembers={minMembers || undefined}
//             maxMembers={maxMembers || undefined}
//             extraMemberFee={extraMemberFee || undefined}
//             segmentId={String(id ?? "")}
//             segmentName={title || "Event"}
//             segmentCategory={type || "General"}
//             isTeamEvent={isTeamEvent || false}
//             baseFee={fee || 0}
//             segmentType={(type as SegmentType) || "DEFAULT"}
//           />

//           <Link
//             prefetch={false}
//             href={`/events/${id}`}
//             className="flex-1 py-2.5 text-center bg-yellow-600 text-slate-200  font-bold rounded-[10px] hover:bg-linear-to-r hover:from-cyan-400 hover:to-violet-400 transition-colors"
//           >
//             Details
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import RegistrationButtonHiger from "@/features/payments/Components/RegistrationManager";
import { SegmentType } from "@/features/payments/types";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { Calendar, Clock, Info, MapPin, Ticket } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FullEvent } from "../schema";

export default function EventCard(events: Partial<FullEvent>) {
  const {
    id,
    title,
    subtitle,
    type,
    date,
    time,
    venue,
    fee,
    seatsTotal,
    seatsFilled,
    isTeamEvent,
    minMembers,
    maxMembers,
    extraMemberFee,
  } = events;

  const safeSeatsFilled = Number(seatsFilled ?? 0);
  const safeSeatsTotal = Number(seatsTotal ?? 0);
  const fillPercent =
    safeSeatsTotal > 0
      ? Math.round((safeSeatsFilled / safeSeatsTotal) * 100)
      : 0;
  const seatsLeft = Math.max(0, safeSeatsTotal - safeSeatsFilled);

  const isFree = (fee ?? 0) === 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-85 rounded-[20px] overflow-hidden bg-white border border-slate-200"
      style={{
        boxShadow:
          "0 8px 32px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Banner with gradient ── */}
      <div
        className="relative px-6 pt-7 pb-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
        <div
          className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full opacity-10"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />

        {/* Type pill */}
        <div className="relative inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0"
          />
          <span className="text-[10px] font-bold tracking-[1.6px] uppercase text-white">
            {type}
          </span>
        </div>

        {/* Title */}
        <h2 className="relative text-[22px] font-bold text-white leading-tight tracking-tight drop-shadow-sm">
          {title}
        </h2>
        {subtitle && (
          <p className="relative mt-1.5 text-sm font-medium text-white/70">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-6 pt-5 pb-6 space-y-5 bg-white">
        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {[
            {
              label: "Date",
              value: formatDate(date),
              icon: <Calendar size={12} className="text-indigo-400" />,
              color: "text-slate-700",
            },
            {
              label: "Time",
              value: formatTime(time),
              icon: <Clock size={12} className="text-indigo-400" />,
              color: "text-slate-700",
            },
            {
              label: "Venue",
              value: venue,
              icon: <MapPin size={12} className="text-pink-400" />,
              color: "text-slate-700",
            },
            {
              label: "Entry Fee",
              value: isFree ? "Free" : `৳${fee}`,
              icon: (
                <Ticket
                  size={12}
                  className={isFree ? "text-emerald-500" : "text-indigo-400"}
                />
              ),
              color: isFree
                ? "text-emerald-600 font-semibold"
                : "text-slate-700",
            },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-slate-400 mb-1">
                {m.label}
              </p>
              <p
                className={`text-[13px] font-medium flex items-center gap-1.5 ${m.color}`}
              >
                {m.icon}
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Seats progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-slate-400">Seats filled</span>
            <span className="text-[11px] font-semibold text-slate-500">
              <span className="text-indigo-500">{fillPercent}%</span>
              {" — "}
              {seatsLeft} left
            </span>
          </div>
          <div className="h-[4px] bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #6366f1, #ec4899)",
              }}
            />
          </div>
          <p className="text-[10px] text-slate-300 mt-1.5 text-right">
            {safeSeatsFilled} / {safeSeatsTotal} registered
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 pt-1">
          <RegistrationButtonHiger
            minMembers={minMembers || undefined}
            maxMembers={maxMembers || undefined}
            extraMemberFee={extraMemberFee || undefined}
            segmentId={String(id ?? "")}
            segmentName={title || "Event"}
            isTeamEvent={isTeamEvent || false}
            baseFee={fee || 0}
            segmentType={(type as SegmentType) || "DEFAULT"}
          />

          <Link
            prefetch={false}
            href={`/events/${id}`}
            className="flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium rounded-[10px] border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Info size={13} />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
