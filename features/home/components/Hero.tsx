// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import heroImage from "@/public/hero5.png";

// // 30 Aug 2026, 9:00 AM Bangladesh time
// const EVENT_DATE = new Date("2026-08-30T09:00:00+06:00").getTime();

// function useCountdown(target: number) {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const tick = () => {
//       const diff = Math.max(target - Date.now(), 0);
//       setTimeLeft({
//         days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((diff / (1000 * 60)) % 60),
//         seconds: Math.floor((diff / 1000) % 60),
//       });
//     };

//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, [target]);

//   return timeLeft;
// }

// function CalendarIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       className="h-4 w-4 text-cyan-300"
//     >
//       <rect x="3" y="4" width="18" height="18" rx="2" />
//       <path d="M16 2v4M8 2v4M3 10h18" />
//     </svg>
//   );
// }

// function PinIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       className="h-4 w-4 mt-0.5 shrink-0 text-cyan-300"
//     >
//       <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
//       <circle cx="12" cy="10" r="2.5" />
//     </svg>
//   );
// }

// function SparkIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.6"
//       className="h-4 w-4 text-white"
//     >
//       <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
//       <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
//     </svg>
//   );
// }

// export default function Hero() {
//   const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

//   const countdownItems = [
//     { label: "Days", value: days },
//     { label: "Hours", value: hours },
//     { label: "Minutes", value: minutes },
//     { label: "Seconds", value: seconds },
//   ];

//   return (
//     <section className="relative h-screen w-full overflow-hidden bg-black">
//       <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:40px_40px]" />

//       <Image
//         src={heroImage}
//         alt="Hero"
//         fill
//         priority
//         className="object-contain hidden md:block md:object-cover  opacity-90"
//       />

//       {/* Subtle vignette instead of a gradient orb */}
//       <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/20" />
//       <div className="absolute inset-0 bg-black/20" />

//       {/* ===== Only this section was redesigned ===== */}
//       <div className="relative z-10 flex h-full items-center px-4 py-24 sm:px-8 lg:px-16">
//         <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-14">
//           {/* ---------- Middle decorative divider (desktop only) ---------- */}
//           <div className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full -translate-x-1/2 flex-col items-center justify-center md:flex">
//             <span className="h-1/3 w-px bg-linear-to-b from-transparent via-white/20 to-white/40" />
//             <span className="relative my-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-linear-to-br from-fuchsia-500/80 via-violet-500/80 to-cyan-400/80 shadow-[0_0_25px_rgba(139,92,246,0.6)]">
//               <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/40" />
//               <SparkIcon />
//             </span>
//             <span className="h-1/3 w-px bg-linear-to-t from-transparent via-white/20 to-white/40" />
//           </div>

//           {/* ---------- Left column: text (top aligned) ---------- */}
//           <div className="flex flex-col items-start justify-start text-left md:pt-2">
//             <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-200/90 backdrop-blur-md opacity-0 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards]">
//               <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
//               Jagannath University Presents
//             </span>

//             <h1 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl md:text-6xl lg:text-7xl">
//               JnU AI & IT Fest 2026
//             </h1>

//             <p className="mt-4 max-w-lg bg-linear-to-b from-indigo-100 to-indigo-300/80 bg-clip-text text-lg font-light text-transparent opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] sm:text-xl md:text-2xl">
//               Where Ideas Meet Intelligence
//             </p>

//             <div className="mt-6 flex flex-col items-start gap-2.5 text-sm text-white/70 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.55s_forwards] sm:text-base">
//               <p className="flex items-center gap-2 font-medium text-white/85">
//                 <CalendarIcon />
//                 30 August 2026
//               </p>
//               <p className="flex max-w-md items-start gap-2 text-left leading-relaxed text-white/60">
//                 <PinIcon />
//                 <span>
//                   Ground Floor, Shahid Sajid Building &amp; Central Auditorium,
//                   Jagannath University
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* ---------- Right column: countdown + CTAs (bottom aligned) ---------- */}
//           <div className="relative flex items-end justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards] md:justify-end">
//             {/* glow behind the card */}
//             <div className="pointer-events-none absolute -inset-6 bottom-0 -z-10 rounded-[2rem] bg-linear-to-tr from-fuchsia-500/30 via-violet-500/20 to-cyan-400/30 blur-3xl animate-pulse" />
//             <div className=" md:hidden pointer-events-none absolute right-4 bottom-24 -z-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl animate-[floatGlow_6s_ease-in-out_infinite]" />

//             <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur transition-shadow duration-500 hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] sm:p-7">
//               <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
//                 {countdownItems.map((item) => (
//                   <div
//                     key={item.label}
//                     className="flex flex-col items-center rounded-xl border border-white/10 bg-black/30 py-3 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:py-4"
//                   >
//                     <span className="bg-linear-to-b from-white to-cyan-200 bg-clip-text font-mono text-2xl font-semibold tabular-nums text-transparent sm:text-4xl">
//                       {String(item.value).padStart(2, "0")}
//                     </span>
//                     <span className="mt-1 text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
//                       {item.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
//                 <button
//                   type="button"
//                   className="group relative overflow-hidden rounded-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(139,92,246,0.75)] active:scale-[0.98]"
//                 >
//                   <span className="relative z-10">Register Now</span>
//                   <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
//                 </button>
//                 <button
//                   type="button"
//                   className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/50 hover:bg-white/10"
//                 >
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ===== end redesigned section ===== */}

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(18px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes floatGlow {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(-10px, 12px);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }



"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import heroImage from "@/public/hero5.png";
import Link from "next/link";

// 30 Aug 2026, 9:00 AM Bangladesh time
const EVENT_DATE = new Date("2026-08-30T09:00:00+06:00").getTime();

function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 text-cyan-300"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 mt-0.5 shrink-0 text-cyan-300"
    >
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4 text-white"
    >
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  const countdownItems = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:40px_40px]" />

      <Image
        src={heroImage}
        alt="Hero"
        fill
        priority
        className="object-contain hidden md:block md:object-cover opacity-90"
      />

      {/* Subtle vignette instead of a gradient orb */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-black/20" />

      {/* ===== Only this section was redesigned ===== */}
      <div className="relative z-10 flex h-full items-start px-4 py-10  sm:px-8 lg:px-16">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8">
          {/* ---------- Left aligned: text ---------- */}
          <div className="flex w-full max-w-2xl flex-col items-start justify-start text-left md:pt-2">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-200/90 backdrop-blur-md opacity-0 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards]">
              <span className="h-1.5  w-1.5 animate-pulse rounded-full bg-cyan-400" />
              Jagannath University Presents
            </span>

            <h1 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-4xl md:text-5xl lg:text-6xl">
              JnU AI & IT Fest 2026
            </h1>

            <p className="mt-2 max-w-lg bg-linear-to-b from-indigo-100 to-indigo-300/80 bg-clip-text text-lg font-light text-transparent opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] sm:text-xl md:text-2xl">
              Where Ideas Meet Intelligence
            </p>

            <div className="mt-3 flex flex-col items-start gap-2.5 text-sm text-white/70 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.55s_forwards] sm:text-base">
              <p className="flex items-center gap-2 font-medium text-white/85">
                <CalendarIcon />
                30 August 2026
              </p>
              <p className="flex max-w-md items-start gap-2 text-left leading-relaxed text-white/60">
                <PinIcon />
                <span>
                  Ground Floor, Shahid Sajid Building &amp; Central Auditorium,
                  Jagannath University
                </span>
              </p>
            </div>
          </div>

          {/* ---------- Left aligned: countdown + CTAs ---------- */}
          <div className="relative w-full max-w-md opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
            {/* glow behind the card */}
            <div className="pointer-events-none absolute -inset-6 bottom-0 -z-10 rounded-[2rem] bg-linear-to-tr from-fuchsia-500/30 via-violet-500/20 to-cyan-400/30 blur-3xl animate-pulse" />
            <div className="md:hidden pointer-events-none absolute right-4 bottom-24 -z-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl animate-[floatGlow_6s_ease-in-out_infinite]" />

            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur transition-shadow duration-500 hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] sm:p-5">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {countdownItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center rounded-xl border border-white/10 bg-black/30 py-2 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:py-4"
                  >
                    <span className="bg-linear-to-b from-white to-cyan-200 bg-clip-text font-mono text-xl font-semibold tabular-nums text-transparent sm:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
                <Link href="/events">
                  <button
                    type="button"
                    className="group relative overflow-hidden rounded-full bg-linear-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(139,92,246,0.75)] active:scale-[0.98]"
                  >
                    <span className="relative z-10">Register Now</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                  </button>
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/50 hover:bg-white/10"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== end redesigned section ===== */}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatGlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, 12px);
          }
        }
      `}</style>
    </section>
  );
}
