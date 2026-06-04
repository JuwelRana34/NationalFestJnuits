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
    <section className="relative min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[length:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
              Event Schedule
            </h2>

            <p className="max-w-xl mx-auto text-muted-foreground">
              Plan your experience. Two days of expert keynotes, technical deep
              dives, and networking opportunities.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative flex bg-card text-muted-foreground rounded-full p-1 shadow-sm border border-border">
            {[1, 2].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day as 1 | 2)}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeDay === day
                    ? "text-primary-foreground"
                    : "hover:text-primary"
                }`}
              >
                {activeDay === day && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
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

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 sm:left-10 top-4 bottom-4 w-px bg-border hidden sm:block" />

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
function TimelineItem({ event, index }: { event: EventItem; index: number }) {
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col sm:flex-row items-start group"
    >
      {/* LEFT SIDE (FIXED ALIGNMENT) */}
      <div className="hidden sm:flex items-center gap-6 mr-6 relative z-10">
        {/* Time */}
        <div className="w-20 text-right text-sm font-semibold text-primary">
          {event.time}
        </div>

        {/* Icon */}
        <div className="relative">
          <div className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center group-hover:border-primary transition-colors duration-300 shadow-sm">
            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="flex-1 w-full sm:ml-11">
        {/* Mobile time */}
        <div className="flex sm:hidden items-center gap-2 mb-3 text-sm font-semibold text-primary">
          <Clock className="w-4 h-4" />
          {event.time}
        </div>

        <div className="bg-card border border-border rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {event.title}
          </h3>

          {event.speaker && (
            <div className="flex items-center gap-2 text-sm text-primary mb-3 font-medium">
              <User className="w-4 h-4" />
              {event.speaker}
            </div>
          )}

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
