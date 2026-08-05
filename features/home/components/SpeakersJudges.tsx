"use client";

import { MagnetIcon, PhoneMissed, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const speakers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    designation: "Chief AI Scientist, TechCorp",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    designation: "VP of Engineering, StartupX",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Aisha Patel",
    designation: "Lead UI/UX Designer, CreativeStudio",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "Partner, Venture Capital",
    image: "https://i.pravatar.cc/150?img=33",
  },
];

export default function SpeakersJudges() {
  return (
    <section className="w-full py-24 px-6 md:px-12 font-sans bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] md:text-5xl">
            Speakers & Judges
          </h2>

          <p className="mx-auto mt-4 max-w-2xl bg-linear-to-b from-indigo-100 to-indigo-300/80 bg-clip-text text-lg text-transparent">
            Learn from industry veterans, visionaries, and expert judges who
            will be guiding and evaluating your work.
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(139,92,246,0.35)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
              </div>

              {/* Avatar */}
              <div className="relative z-10 mb-5 flex justify-center">
                <div className="h-24 w-24 overflow-hidden rounded-full border border-white/10 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={96}
                    height={96}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="mb-2 bg-linear-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-xl font-semibold text-transparent">
                {speaker.name}
              </h3>

              {/* Designation */}
              <p className="mb-6 grow text-sm leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-cyan-300">
                {speaker.designation}
              </p>

              {/* Icons */}
              <div className="mt-auto flex justify-center items-center gap-5 text-cyan-300">
                <Link
                  href="#"
                  className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                >
                  <MagnetIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="#"
                  className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                >
                  <StarHalf className="w-4 h-4" />
                </Link>

                <Link
                  href="#"
                  className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
                >
                  <PhoneMissed className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
