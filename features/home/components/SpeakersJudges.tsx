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
    <section className="w-full py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
            Speakers & Judges
          </h2>

          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Learn from industry veterans, visionaries, and expert judges who
            will be guiding and evaluating your work.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="relative overflow-hidden bg-card border border-border rounded-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 to-secondary/10 blur-2xl" />

              {/* Avatar */}
              <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mb-5 border border-border">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                  unoptimized
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {speaker.name}
              </h3>

              {/* Designation */}
              <p className="text-sm text-muted-foreground mb-6 grow transition-colors duration-300 group-hover:text-primary">
                {speaker.designation}
              </p>

              {/* Icons */}
              <div className="flex items-center gap-4 mt-auto text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">
                  <MagnetIcon className="w-4 h-4" />
                </Link>

                <Link href="#" className="hover:text-primary transition-colors">
                  <StarHalf className="w-4 h-4" />
                </Link>

                <Link href="#" className="hover:text-primary transition-colors">
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
