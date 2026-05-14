"use client";

import { useAuth } from "@/hooks/useUserSession";
import {
  ArrowRight,
  Code2,
  Gamepad2,
  Lightbulb,
  Presentation,
} from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";


const themeStyles = {
  primary: {
    text: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    gradient: "from-primary/20",
    shadow: "hover:shadow-primary/10",
    iconBg: "group-hover:bg-primary/10",
  },
  secondary: {
    text: "text-secondary",
    bg: "bg-secondary",
    border: "border-secondary",
    gradient: "from-secondary/20",
    shadow: "hover:shadow-secondary/10",
    iconBg: "group-hover:bg-secondary/10",
  },
} as const;

type ThemeKey = keyof typeof themeStyles;

const segments = [
  {
    id: "hackathon",
    title: "Hackathon",
    description:
      "48 hours of intense coding. Build innovative solutions to real-world problems and win massive prizes.",
    icon: Code2,
    theme: "primary" as ThemeKey,
  },
  {
    id: "showcase",
    title: "Project Showcasing",
    description:
      "Exhibit your groundbreaking projects to industry leaders, investors, and tech enthusiasts.",
    icon: Presentation,
    theme: "secondary" as ThemeKey,
  },
  {
    id: "esports",
    title: "Esports",
    description:
      "Compete in top-tier gaming tournaments. Show off your tactical skills and dominate the leaderboard.",
    icon: Gamepad2,
    theme: "primary" as ThemeKey,
  },
  {
    id: "pitching",
    title: "Idea Pitching",
    description:
      "Pitch your startup ideas to a panel of expert judges and secure your first round of seed funding.",
    icon: Lightbulb,
    theme: "secondary" as ThemeKey,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function App() {
  const {user} = useAuth();
  return (
    <section className="min-h-screen w-full bg-slate-950 text-slate-300 py-24 px-6 md:px-12 font-sans relative overflow-hidden font-inter">
      {/* Background ambient glows using generic tokens */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-40 pointer-events-none bg-primary" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 pointer-events-none bg-violet-500" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Explore <span className="text-amber-400">Event Segments</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg"
            >
              Discover the perfect stage to showcase your talents. From coding
              marathons to strategic gaming, choose your arena.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all border border-slate-600 hover:border-cyan-400/50 hover:bg-slate-900 text-slate-300"
          >
            View Schedule <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {segments.map((segment) => {
            const Icon = segment.icon;
            const styles = themeStyles[segment.theme];

            return (
              <motion.div
                key={segment.id}
                variants={itemVariants}
                className={`group relative bg-slate-900/40 backdrop-blur-md border border-slate-600 p-6 rounded-md flex flex-col h-full overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-lg ${styles.shadow}`}
              >
                {/* Dynamic Inner Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${styles.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                {/* Top Border Highlight expanding on Hover */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${styles.bg}`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 relative">
                    {/* Icon Container with subtle color fill on hover */}
                    <div
                      className={`w-14 h-14 rounded-md flex items-center justify-center bg-slate-900/80 border border-slate-600/80 group-hover:border-transparent transition-all duration-500 relative z-10 ${styles.iconBg}`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${styles.text}`}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-slate-300 group-hover:text-white transition-colors duration-300">
                    {segment.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed grow mb-8 group-hover:text-zinc-300 transition-colors duration-300">
                    {segment.description}
                  </p>

                  <div
                    className={`mt-auto flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${styles.text}`}
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors duration-300">
                      View Details
                    </span>
                    <ArrowRight className="w-4 h-4 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 w-full md:hidden flex justify-center items-center gap-2 px-6 py-4 rounded-md font-medium border border-zinc-800 hover:bg-zinc-900 transition-colors"
        >
          View Schedule <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
