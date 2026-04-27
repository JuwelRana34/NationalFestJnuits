"use client";

import { Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

// Design Tokens
const colors = {
  primary: "oklch(82.8% 0.189 84.429)", // Vibrant Gold
  secondary: "oklch(0.7 0.1 200)", // Cool Teal
};

const About = () => {
  return (
    <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden font-['Inter',sans-serif] selection:bg-yellow-500/30">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-opacity-20 rounded-full blur-[150px] pointer-events-none bg-secondary hidden md:block animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Side: Proper Relatable Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-md overflow-hidden group border border-white/10 bg-slate-900"
          >
            <Image
              width={500}
              height={500}
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
              alt="Students collaborating at a tech event"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            {/* Gradient overlay to blend seamlessly into the dark background */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Side: Typography & Content (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest mb-6 text-primary">
              <div className="w-8 h-px bg-current" />
              About The Fest
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.15] text-slate-300">
              Empowering the Next Generation of{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-secondary/80">
                Tech Leaders
              </span>
            </h2>

            <div className="prose prose-invert prose-lg max-w-none text-slate-400 mb-8 leading-relaxed">
              <p>
                The 2026 National Fest, proudly hosted by the Jagannath
                University IT Society (JNUITS), is not merely an event—it&apos;s
                an ecosystem of innovation. We are uniting the brightest
                developers, visionary designers, and pioneering tech enthusiasts
                from across the nation to build solutions that matter.
              </p>
            </div>

            {/* Core Values / Impact Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-md transition-colors hover:bg-white/[0.04]">
                <div
                  className="mb-4 inline-flex p-3 rounded-md bg-white/5"
                  style={{ color: colors.secondary }}
                >
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Our Vision
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Cultivating a relentless culture of learning, collaboration,
                  and technological excellence within the academic community of
                  Bangladesh.
                </p>
              </div>

              {/* Impact */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-md transition-colors hover:bg-white/[0.04]">
                <div
                  className="mb-4 inline-flex p-3 rounded-md bg-white/5"
                  style={{ color: colors.primary }}
                >
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Core Impact
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Sparking dynamic collaborations that translate into real-world
                  solutions through rigorous hackathons, masterclasses, and
                  networking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
