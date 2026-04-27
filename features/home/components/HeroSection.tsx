"use client";

import{ useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Zap, ChevronRight, Terminal, Code2, Timer } from "lucide-react";

export default function HeroSection() {
    
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Logic (Set to Nov 12, 2026)
  useEffect(() => {
    const targetDate = new Date("2026-11-12T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Custom HTML5 Canvas Particle System - Panir Buoot Buoot (Water Bubbles) effect
  // Eta external library chara run korbe tai kono compile error dibe na
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bubblesArray: Bubble[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    window.addEventListener("resize", resizeCanvas);

    // Bubble Class
    class Bubble {
      x: number=0;
      y: number=0;
      size: number=2;
      speedY: number = 0;
      color: string="rgba(255, 255, 255, 0.5)";
      angle: number=0;
      angleVelocity: number=0;

      constructor() {
        if (!canvas) return;
        this.size = Math.random() * 4 + 1; // Size of bubble
        this.x = Math.random() * canvas.width;
        // Start from below the screen
        this.y = canvas.height + Math.random() * canvas.height;
        this.speedY = Math.random() * 1.5 + 0.5; // Speed going up

        // Pick cyan or amber with low opacity for bubble effect
        const colors = [
          "rgba(6, 182, 212, 0.4)",
          "rgba(245, 158, 11, 0.3)",
          "rgba(148, 163, 184, 0.2)",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // For wobbling effect
        this.angle = Math.random() * Math.PI * 2;
        this.angleVelocity = Math.random() * 0.05 - 0.025;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        // Add a slight border to make it look more like a bubble
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = this.color
          .replace("0.4", "0.8")
          .replace("0.3", "0.6");
        ctx.stroke();
      }

      update() {
        if (!canvas) return;

        // Move up
        this.y -= this.speedY;

        // Wobble horizontally (Panir buoot effect)
        this.x += Math.sin(this.angle) * 1;
        this.angle += this.angleVelocity;

        // Reset to bottom if it goes off top screen
        if (this.y < 0 - this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
          this.size = Math.random() * 4 + 1;
        }

        this.draw();
      }
    }

    const initBubbles = () => {
      bubblesArray = [];
      const numberOfBubbles = (canvas.width * canvas.height) / 8000; // Adjust density

      for (let i = 0; i < numberOfBubbles; i++) {
        bubblesArray.push(new Bubble());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 font-sans pt-36 pb-12">
      {/* 1. Custom Canvas Background (Water Bubbles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
      />

      {/* 2. Fallback Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-20 pointer-events-none" />

      {/* 3. Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/80 to-slate-950" />

      {/* 4. Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      {/* 5. Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center p-1 pr-4 bg-slate-900/50 border border-slate-800 rounded-full backdrop-blur-md mb-8 hover:bg-slate-800/50 transition-colors"
        >
          <span className="px-3 py-1 bg-linear-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-full mr-3 uppercase tracking-wider flex items-center gap-1">
            <Zap size={12} fill="currentColor" /> Live
          </span>
          <span className="text-sm font-medium text-slate-300">
            Registration is officially open
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          className="max-w-5xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            National AI & IT <br />
            <span className="relative">
              <span className="absolute -inset-1 block bg-linear-to-r from-amber-500/20 to-cyan-500/20 blur-2xl animate-pulse"></span>
              <span className="relative text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-200 to-cyan-400">
                Summit 2026
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          The most anticipated National IT Fest is here. 36 hours of relentless
          innovation, coding, and design. Show the nation what you can build.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-16"
        >
          {/* Primary Amber Button */}
          <button className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-base transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 group active:scale-95">
            <Terminal
              size={20}
              className="group-hover:-rotate-12 transition-transform"
            />
            Enter the Arena
          </button>

          {/* Secondary Cyan Outline Button */}
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 border-2 border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] font-bold rounded-xl text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2 group active:scale-95">
            <Code2 size={20} />
            View Tracks
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>

        {/* RESPONSIVE SECTION: Countdown Timer & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl rounded-3xl p-6 lg:p-8"
        >
          {/* Live Countdown */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <Timer size={18} className="animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Fest Starts In
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 text-white">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((time, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-16 sm:w-20"
                >
                  <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
                    {time.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 mt-1 uppercase">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px lg:w-px lg:h-20 bg-slate-800"></div>

          {/* Core Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 text-sm font-medium text-slate-500">
            <div className="flex flex-col items-center gap-1 group cursor-default">
              <span className="text-white text-3xl sm:text-4xl font-bold group-hover:scale-105 transition-transform">
                500k+
              </span>
              Prize Pool
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-default">
              <span className="text-amber-400 text-3xl sm:text-4xl font-bold group-hover:scale-105 transition-transform">
                100+
              </span>
              Universities
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
