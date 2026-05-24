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
  2: [
    {
      id: "2-1",
      time: "09:30 AM",
      title: "Advanced Animations Masterclass",
      speaker: "Sarah Lee, Motion Designer",
      description:
        "Bringing interfaces to life with Framer Motion. We'll cover layout animations, micro-interactions, and performance.",
      icon: Sparkles,
    },
    {
      id: "2-2",
      time: "11:00 AM",
      title: "Accessibility (A11y) Deep Dive",
      speaker: "Alex Chen, A11y Advocate",
      description:
        "Ensuring your applications are usable by everyone. Legal requirements, ARIA patterns, and testing strategies.",
      icon: User,
    },
    {
      id: "2-3",
      time: "01:30 PM",
      title: "Closing Remarks & Networking",
      description:
        "Final thoughts, roadmap reveals, and open networking sessions with industry leaders.",
      icon: MapPin,
    },
  ],
};

export default function EventSchedule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  return (
    <section className=" relative min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-40 pointer-events-none" />

      <div className=" relative z-10 max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-l from-cyan-500 to-fuchsia-500">
              Event Schedule
            </h2>
            <p className=" max-w-xl mx-auto text-slate-400">
              Plan your experience. Two days of expert keynotes, technical deep
              dives, and networking opportunities.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative flex bg-slate-800 text-slate-300 rounded-full p-1 shadow-sm border  border-cyan-400/40">
            {[1, 2].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day as 1 | 2)}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-slate-300 ${
                  activeDay === day
                    ? "text-slate-800 bg-cyan-500 shadow-md"
                    : "text-muted-foreground hover:text-violet-400"
                }`}
              >
                {activeDay === day && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-20 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day {day}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-29.75 md:left-29.75 top-4 bottom-4 w-px bg-border/60 hidden sm:block" />

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

// --- Subcomponents ---

function TimelineItem({ event, index }: { event: EventItem; index: number }) {
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col sm:flex-row items-start group"
    >
      {/* Time & Icon indicator (Desktop) */}
      <div className="hidden sm:flex flex-col items-center mr-6 relative z-10 pt-1">
        <div className="w-20 text-right mr-4 text-md font-semibold text-secondary">
          {event.time}
        </div>
        <div className="absolute left-25 top-0.5 w-10 h-10 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center group-hover:border-cyan-500 transition-colors duration-300 shadow-sm">
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors duration-300" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 w-full sm:ml-11">
        {/* Mobile Time Header */}
        <div className="flex sm:hidden items-center gap-2 mb-3 text-md font-semibold text-secondary">
          <Clock className="w-4 h-4" />
          {event.time}
        </div>

        <div className="bg-slate-800 border border-slate-600 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-slate-300 mb-1">
            {event.title}
          </h3>

          {event.speaker && (
            <div className="flex items-center gap-2 text-sm text-cyan-400 mb-3 font-medium">
              <User className="w-4 h-4" />
              {event.speaker}
            </div>
          )}

          <p className="leading-relaxed text-sm sm:text-base">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
