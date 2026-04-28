"use client";
import { MagnetIcon, PhoneMissed, StarHalf } from "lucide-react";
// import { Linkedin, Twitter } from "lucide-react";
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
    <section className="w-full py-24 px-6 md:px-12 bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight  mb-4 text-amber-400">
            Speakers & Judges
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Learn from industry veterans, visionaries, and expert judges who
            will be guiding and evaluating your work.
          </p>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="relative overflow-hidden bg-slate-800 border border-cyan-800/50 rounded-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:bg-cyan-800 hover:shadow-xl hover:shadow-black/20 group"
            >
              <div
               className="hidden transition-all group-hover:block  absolute z-0 h-20 w-20 blur-3xl bg-linear-to-tr from-lime-500 to-emerald-500"
              />
              {/* Circular Avatar Placeholder */}
              <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-slate-800">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                  unoptimized
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-300 mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-secondary mb-6 grow">
                {speaker.designation}
              </p>

              {/* Subtle Social Media Icons */}
              <div className="flex items-center gap-4 mt-auto">
                <Link
                  href="#"
                  className="text-slate-300 hover:text-violet-500 transition-colors"
                >
                  <MagnetIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-violet-500 transition-colors"
                >
                  <StarHalf className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-violet-500 transition-colors"
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
