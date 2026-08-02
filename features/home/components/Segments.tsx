"use client"; // components/Segments.tsx

import React from "react";
import { Cpu, Lightbulb, Wrench, Mic2 } from "lucide-react";

export default function Segments() {
  const segments = [
    {
      title: "BrainChild Season 2.0",
      subtitle: "National App, Web & AI Project Expo",
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      description:
        "Top 15 shortlisted teams showcase their student-built applications and AI-powered solutions.",
      fee: "BDT 1,500 - 2,000 / Team",
      members: "2-3 Members",
    }, //[cite: 1]
    {
      title: "AI Ad-Venture",
      subtitle: "Prompt to Production Challenge",
      icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
      description:
        "Transform prompts into professional promotional advertisements. Top 10 showcased live.",
      fee: "BDT 200 - 300 / Team",
      members: "2-5 Members",
    }, //[cite: 1]
    {
      title: "TechCare Zone",
      subtitle: "Software Installation Booth",
      icon: <Wrench className="w-8 h-8 text-emerald-400" />,
      description:
        "Essential software installation and computer setup services. Free for pass holders.",
      fee: "Free / BDT 100",
      members: "Individual",
    }, //[cite: 1]
    {
      title: "TechUncut",
      subtitle: "Talks with Creators & AI Pioneers",
      icon: <Mic2 className="w-8 h-8 text-purple-400" />,
      description:
        "Keynote speeches and panel discussions with industry leaders and AI researchers.",
      fee: "Entry Pass Required",
      members: "Individual",
    }, //[cite: 1]
  ];

  return (
    <section className="py-24 bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Festival Segments
          </h2>{" "}
          {/*[cite: 1] */}
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Participate in our national-level competitions, technical services,
            and networking conferences. {/*[cite: 1] */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group"
            >
              <div className="bg-zinc-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {segment.icon}
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-1">
                {segment.title}
              </h3>
              <p className="text-indigo-400 text-sm font-medium mb-4">
                {segment.subtitle}
              </p>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {segment.description}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80">
                <div className="bg-zinc-950 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300">
                  {segment.members}
                </div>
                <div className="bg-zinc-950 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300">
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
