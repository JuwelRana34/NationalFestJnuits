"use client"; // components/PremiumCountdown.tsx

import React, { useState, useEffect } from "react";

export default function PremiumCountdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    // Target date: 30 August 2026[cite: 1]
    const targetDate = new Date("2026-08-30T00:00:00").getTime();

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
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null; // Prevents hydration mismatch

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 mt-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="relative group">
            {/* Subtle glow effect behind the box */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-2xl group-hover:bg-indigo-500/30 transition-colors duration-500" />

            <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-white/10 w-20 h-24 sm:w-24 sm:h-28 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
              <span className="text-3xl sm:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                {value.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
          <span className="text-zinc-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mt-4">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
