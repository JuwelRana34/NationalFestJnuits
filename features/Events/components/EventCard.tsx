"use client";

import RegistrationButton from "@/features/payments/Components/TestPayments";
import { SegmentType } from "@/features/payments/types";
import { formatDate, formatTime } from "@/lib/DateAndTimeFormater";
import { Calendar, Clock, MapPin } from "lucide-react";
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

  console.log("EventCard Props:", minMembers, maxMembers);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative w-90 rounded-[20px] overflow-hidden border border-amber-400/20 bg-[#0a0f1e]"
      style={{
        boxShadow:
          "0 0 40px rgba(251,191,36,0.08), 0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent opacity-60" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
        <div
          className="absolute top-0 right-0 w-0 h-0"
          style={{
            borderStyle: "solid",
            borderWidth: "0 64px 64px 0",
            borderColor:
              "transparent rgba(251,191,36,0.15) transparent transparent",
          }}
        />
      </div>
      <span
        className="absolute top-1 right-3 z-20 text-[8px] font-bold text-amber-400/60 tracking-widest uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        JNUITS
      </span>

      {/* Banner */}
      <div className="relative h-45 bg-linear-to-br from-[#0d1b3e] via-[#0a1628] to-[#0f1f3d] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="absolute w-62.5 h-62.5 rounded-full -top-16 left-1/2 -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1 mb-3">
            <motion.div
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            />
            <span className="text-[10px] font-semibold text-amber-400 tracking-[1.5px] uppercase">
              {title}
            </span>
          </div>
          <div
            className="font-black text-[22px] text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {/* {title} */}
            {/* <br /> */}
            <span className="text-amber-400">{subtitle}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-5 pb-6 bg-[#0c1220]">
        <div className="h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent mb-4 " />
        <div className="space-x-1.5">
          <span className="inline-flex items-center gap-1.5 bg-blue-400/8 border border-blue-400/20 rounded-md px-2.5 py-1 text-[11px] font-semibold text-blue-300 tracking-[0.8px] uppercase mb-3">
            ◈ &nbsp;{type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            { label: "Date", value: formatDate(date), icon: <Calendar size={12} /> },
            { label: "Time", value: formatTime(time), icon: <Clock size={12} /> },
            { label: "Venue", value: venue, icon: <MapPin size={12} /> },
            {
              label: "Entry Fee",
              value: fee === 0 ? `৳ ${fee}` : `৳${fee}`,
              green: fee === 0,
            },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-[1px]">
                {m.label}
              </span>
              <span
                className={`text-[13px] font-semibold flex items-center gap-1.5 ${m.green ? "text-green-400" : "text-white/85"}`}
              >
                {m.icon}
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Seats progress */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-white/40">Seats Filled</span>
            <span className="text-[11px] font-bold text-amber-400">
              {fillPercent}% — {seatsLeft} left
            </span>
          </div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col  gap-2.5">
          <RegistrationButton
            minMembers={minMembers || undefined}
            maxMembers={maxMembers || undefined}
            extraMemberFee={extraMemberFee || undefined}
            segmentId={String(id ?? "")}
            segmentName={title || "Event"}
            segmentCategory={type || "General"}
            isTeamEvent={isTeamEvent || false}
            baseFee={fee || 0}
            segmentType={(type as SegmentType) || "DEFAULT"}
          />

          <Link
            prefetch={false}
            href={`/events/${id}`}
            className="flex-1 py-2.5 text-center bg-cyan-600 text-slate-200  font-bold rounded-[10px] hover:bg-linear-to-r hover:from-cyan-400 hover:to-violet-400 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
