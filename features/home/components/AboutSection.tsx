"use client";

import { Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const About = () => {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden font-['Inter',sans-serif] selection:bg-yellow-500/30">
      {/* Background ambient glow — two-tone for depth, drawn from the theme's primary/secondary pair */}
      <div className="absolute top-1/4 -left-24 w-[28rem] h-[28rem] rounded-full blur-[160px] pointer-events-none bg-primary/20 hidden md:block" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[160px] pointer-events-none bg-secondary/20 hidden md:block" />

      {/* Faint grid texture to give the section some structural grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Left Side: Image with an angular framing accent */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Corner bracket accents — subtle nod to circuit-trace corners */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-primary/60 rounded-tl-lg pointer-events-none z-20" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-secondary/60 rounded-br-lg pointer-events-none z-20" />

            <div className="relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-md overflow-hidden group ring-1 ring-white/10 shadow-2xl shadow-black/40">
              <Image
                width={500}
                height={500}
                src="https://images.pexels.com/photos/29253461/pexels-photo-29253461.jpeg"
                alt="Students collaborating at a tech event"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                unoptimized
              />
              {/* Gradient overlay to blend seamlessly into the dark background */}
              <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-violet-950/20 to-transparent pointer-events-none" />
            </div>
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

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.15] text-black">
              Empowering the Next Generation of{" "}
              <span className="text-gradient">Tech Leaders</span>
            </h2>

            <p className="text-black text-lg leading-relaxed mb-10 max-w-none">
              The 2026 National Fest, proudly hosted by the Jagannath University
              IT Society (JNUITS), is not merely an event—it&apos;s an ecosystem
              of innovation. We are uniting the brightest developers, visionary
              designers, and pioneering tech enthusiasts from across the nation
              to build solutions that matter.
            </p>

            {/* Core Values / Impact Grid — unified card treatment, gradient lives on the icon badge instead of clashing card fills */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="relative p-6 rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.06]">
                <div className="mb-4 inline-flex p-3 rounded-md bg-gradient shadow-lg shadow-primary/20">
                  <Target size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  Our Vision
                </h3>
                <p className="text-black text-sm leading-relaxed text-justify">
                  Cultivating a relentless culture of learning, collaboration,
                  and technological excellence within the academic community of
                  Bangladesh.
                </p>
              </div>

              {/* Impact */}
              <div className="relative p-6 rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-secondary/40 hover:bg-white/[0.06]">
                <div className="mb-4 inline-flex p-3 rounded-md bg-linear-to-br from-secondary to-primary shadow-lg shadow-secondary/20">
                  <Zap size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  Core Impact
                </h3>
                <p className="text-black text-sm leading-relaxed text-justify">
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
