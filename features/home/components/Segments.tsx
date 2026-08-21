"use client";

import { Bot, Cpu, Lightbulb, Mic2, Wrench } from "lucide-react";

export default function Segments() {
  const segments = [
    {
      title: "BrainChild Season 2.0",
      subtitle: "National App, Web & AI Project Expo",
      icon: (
        <Cpu className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      description:
        "Top 15 shortlisted teams showcase their student-built applications and AI-powered solutions.",
      fee: "BDT 2,000 / Team",
      members: "2-3 Members",
      glowBg: "bg-cyan-500/20",
      hoverBorder: "hover:border-cyan-400/50",
      hoverShadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]",
      iconBg:
        "bg-cyan-950/50 border-cyan-500/20 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
      badgeText: "text-cyan-300",
      badgeBorder: "border-cyan-500/20",
    },
    {
      title: "AI Ad-Venture",
      subtitle: "Prompt to Production Challenge",
      icon: (
        <Lightbulb className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
      ),
      description:
        "Transform prompts into professional promotional advertisements. Top 10 showcased live.",
      fee: "BDT 300 / Team",
      members: "2-5 Members",
      glowBg: "bg-amber-500/20",
      hoverBorder: "hover:border-amber-400/50",
      hoverShadow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.25)]",
      iconBg:
        "bg-amber-950/50 border-amber-500/20 group-hover:border-amber-400/40 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-500/20",
    },
    {
      title: "TechCare Zone",
      subtitle: "Software Installation Booth",
      icon: (
        <Wrench className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
      ),
      description:
        "Essential software installation and computer setup services. Free for pass holders.",
      fee: "Free / BDT 100",
      members: "Individual",
      glowBg: "bg-emerald-500/20",
      hoverBorder: "hover:border-emerald-400/50",
      hoverShadow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.25)]",
      iconBg:
        "bg-emerald-950/50 border-emerald-500/20 group-hover:border-emerald-400/40 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]",
      badgeText: "text-emerald-300",
      badgeBorder: "border-emerald-500/20",
    },
    {
      title: "TechUncut",
      subtitle: "Talks with Creators & AI Pioneers",
      icon: (
        <Mic2 className="w-8 h-8 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
      ),
      description:
        "Keynote speeches and panel discussions with industry leaders and AI researchers.",
      fee: "Entry Pass Required",
      members: "Individual",
      glowBg: "bg-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-400/50",
      hoverShadow: "hover:shadow-[0_0_40px_rgba(232,121,249,0.25)]",
      iconBg:
        "bg-fuchsia-950/50 border-fuchsia-500/20 group-hover:border-fuchsia-400/40 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.4)]",
      badgeText: "text-fuchsia-300",
      badgeBorder: "border-fuchsia-500/20",
    },
    {
      title: "𝗔𝗜 & 𝗜𝗧 𝗢𝗹𝘆𝗺𝗽𝗶𝗮𝗱",
      subtitle: "Unleash Your Tech Potential",
      icon: (
        <Bot className="w-8 h-8 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
      ),
      description:
        "A national-level technology challenge designed for the next generation of tech enthusiasts.",
      fee: "fee: BDT 200",
      members: "Individual",
      glowBg: "bg-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-400/50",
      hoverShadow: "hover:shadow-[0_0_40px_rgba(232,121,249,0.25)]",
      iconBg:
        "bg-fuchsia-950/50 border-fuchsia-500/20 group-hover:border-fuchsia-400/40 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.4)]",
      badgeText: "text-fuchsia-300",
      badgeBorder: "border-fuchsia-500/20",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-950 text-zinc-100 overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative mx-auto px-6 max-w-7xl z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="bg-linear-to-b from-indigo-100 via-purple-200 to-cyan-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(167,139,250,0.3)] md:text-5xl mb-6">
            Festival Segments
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 leading-relaxed">
            Participate in our national-level competitions, technical services,
            and networking conferences.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`group relative flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] ${segment.hoverBorder} ${segment.hoverShadow}`}
            >
              {/* Internal Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-3xl">
                <div
                  className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${segment.glowBg} blur-[80px]`}
                />
              </div>

              {/* Content Header (Icon + Title) */}
              <div className="relative z-10 flex items-start gap-6 mb-6">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 ${segment.iconBg}`}
                >
                  {segment.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide mb-1.5 transition-colors duration-300">
                    {segment.title}
                  </h3>
                  <p
                    className={`text-sm font-semibold tracking-wide ${segment.badgeText}`}
                  >
                    {segment.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-zinc-400 leading-relaxed mb-8 grow">
                {segment.description}
              </p>

              {/* Badges / Footer */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 mt-auto">
                <div
                  className={`flex items-center gap-2 rounded-full border bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md ${segment.badgeBorder} ${segment.badgeText}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  {segment.members}
                </div>
                <div
                  className={`flex items-center gap-2 rounded-full border bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md ${segment.badgeBorder} ${segment.badgeText}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  {segment.fee}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
