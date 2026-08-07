"use client";

import {
  Calendar,
  Clock,
  Code,
  Coffee,
  MapPin,
  Mic,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

// --- Types ---
type EventItem = {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  description: string;
  icon: React.ElementType;
};

type ScheduleData = {
  [key: number]: EventItem[];
};

// --- Dummy Data ---
const scheduleData: ScheduleData = {
  1: [
    {
      id: "1-1",
      time: "09:00 AM",
      title: "Registration & Breakfast",
      description:
        "Check-in, grab your badge, and enjoy some morning refreshments before the kickoff.",
      icon: Coffee,
    },
    {
      id: "1-2",
      time: "10:00 AM",
      title: "Opening Keynote: Future of Web UI",
      speaker: "Jane Doe, Head of Design",
      description:
        "A comprehensive look at where design systems and frontend architectures are heading over the next 5 years.",
      icon: Mic,
    },
    {
      id: "1-3",
      time: "11:30 AM",
      title: "Component Driven Architecture",
      speaker: "John Smith, Lead Engineer",
      description:
        "Building scalable, accessible, and maintainable UI libraries using Next.js and Tailwind CSS.",
      icon: Code,
    },
  ],
  
};

export default function EventSchedule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  return (
    <section className="relative min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[length:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] md:text-5xl">
              Event Schedule
            </h2>

            <p className="mx-auto mt-4 max-w-xl bg-linear-to-b from-indigo-100 to-indigo-300/80 bg-clip-text text-lg text-transparent">
              Plan your experience. Two days of expert keynotes, technical deep
              dives, and networking opportunities.
            </p>
          </motion.div>
        </div>
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            {[1].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day as 1 | 2)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeDay === day
                    ? "text-white"
                    : "text-white/70 hover:text-cyan-300"
                }`}
              >
                {activeDay === day && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-blue-500 shadow-[0_0_25px_rgba(139,92,246,0.55)]"
                  />
                )}

                <span className="relative z-20 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Day {day}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-4 bottom-4 hidden w-px bg-linear-to-b from-fuchsia-500/20 via-violet-400/70 to-cyan-400/40 sm:left-10 sm:block" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-8"
            >
              {scheduleData[activeDay].map((event, index) => (
                <TimelineItem key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- Timeline Item ---
// --- Timeline Item ---
function TimelineItem({ event, index }: { event: EventItem; index: number }) {
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col items-start sm:flex-row"
    >
      {/* Desktop Timeline */}
      <div className="relative z-10 mr-6 hidden items-center gap-6 sm:flex">
        {/* Time */}
        <div className="w-24 bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-right text-sm font-bold tracking-wide text-transparent">
          {event.time}
        </div>

        {/* Icon */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]">
            <Icon className="h-5 w-5 text-cyan-300 transition-colors duration-300 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex-1 sm:ml-11">
        {/* Mobile Time */}
        <div className="mb-3 flex items-center gap-2 bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-sm font-semibold text-transparent sm:hidden">
          <Clock className="h-4 w-4 text-cyan-300" />
          {event.time}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]">
          {/* Title */}
          <h3 className="mb-2 bg-linear-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-xl font-semibold text-transparent">
            {event.title}
          </h3>

          {/* Speaker */}
          {event.speaker && (
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-300">
              <User className="h-4 w-4" />
              {event.speaker}
            </div>
          )}

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/65 sm:text-base">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
