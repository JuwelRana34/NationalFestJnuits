"use client";

import {
  Award,
  Calendar,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface CampusAmbassadorCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  googleFormUrl: string;
  isOpen?: boolean;
  deadline?: string; 
//   "2026-08-30T23:59:59" 
}

export default function CampusAmbassadorCard({
  title = "Campus Ambassador Program 2026",
  description = "Represent your campus, lead the tech community, and unlock exclusive perks, swag, and leadership opportunities with JnUITS.",
  imageUrl = "/images/ambassador-hero.jpg", // তোমার মতো করে ইমেজ পাথ দিয়ে দিও
  googleFormUrl = "https://forms.gle/your-google-form-link",
  isOpen = true,
  deadline = "2026-08-30T23:59:59", // ডিফল্ট ডেডলাইন
}: CampusAmbassadorCardProps) {
  // 💡 টাইম এবং isOpen প্রপস এর উপর ভিত্তি করে অটো ডিসেবল লজিক
  const isRegistrationOpen = useMemo(() => {
    if (!isOpen) return false;
    if (deadline) {
      const currentTime = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      if (currentTime > deadlineTime) return false;
    }
    return true;
  }, [isOpen, deadline]);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 group flex flex-col justify-between">
      {/* Top Image & Badge Section */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-900">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg ${
              isRegistrationOpen
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isRegistrationOpen ? "bg-emerald-400" : "bg-rose-400"
              }`}
            ></span>
            {isRegistrationOpen ? "Applications Open" : "Closed"}
          </span>
        </div>

        {/* Floating Icon/Tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg backdrop-blur-md">
          <Sparkles size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Leadership
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {description}
          </p>

          {/* Perks / Highlights */}
          <div className="pt-2 flex flex-wrap gap-2">
            <span className="text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
              <Award size={12} className="text-amber-400" /> Exclusive Swag
            </span>
            <span className="text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-400" /> Direct
              Mentorship
            </span>
          </div>

          {/* Deadline info if available */}
          {deadline && isRegistrationOpen && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400/90 pt-1">
              <Calendar size={13} />
              <span>
                Deadline:{" "}
                {new Date(deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Action Button Section */}
        <div className="pt-4 border-t border-slate-900 mt-4">
          {isRegistrationOpen ? (
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 text-sm group/btn"
            >
              <span>Apply Now</span>
              <ExternalLink
                size={16}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </a>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 border border-slate-800 text-slate-500 font-medium rounded-xl cursor-not-allowed text-sm select-none"
            >
              <ShieldAlert size={16} />
              <span>Registration Closed</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
