"use client";

import { Speakers } from "@/app/constant/data";
import { Button } from "@/components/ui/button";
import { MagnetIcon, PhoneMissed, StarHalf, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpeakersJudges({
  isComingSoon = false,
  isShowMore = false,
}: {
  isComingSoon?: boolean;
  isShowMore?: boolean;
}) {
  return (
    <section className="w-full py-24 px-6 md:px-12 font-sans ">
      <div className="max-w-7xl mx-auto">
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
          {/* Active Speaker Cards */}
          {Speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(139,92,246,0.35)] flex flex-col"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
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
              <div className="mt-auto flex justify-center items-center gap-5 text-cyan-300 relative z-10">
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

          {/* Coming Soon Card */}
          {isComingSoon && (
            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-white/5 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] flex flex-col justify-center items-center min-h-[320px]">
              {/* Subtle pulsing glow */}
              <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/10 blur-3xl animate-pulse" />
              </div>

              {/* Placeholder Avatar */}
              <div className="relative z-10 mb-5 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5 transition-all duration-300 group-hover:border-fuchsia-400/40 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  <User className="h-8 w-8 text-white/30 transition-colors duration-300 group-hover:text-fuchsia-300/80" />
                </div>
              </div>

              {/* Text */}
              <h3 className="mb-2 bg-linear-to-r from-white/70 via-white/50 to-white/70 bg-clip-text text-xl font-semibold text-transparent transition-colors duration-300 group-hover:from-white group-hover:to-fuchsia-200">
                More TBA
              </h3>

              <p className="text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/60">
                Exciting new speakers and expert judges will be announced soon.
                Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>

      {isShowMore && (
        <div>
          <Link href="/speakers" className="flex justify-center mt-8">
            <Button className="bg-indigo-500 "> Show More </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
