"use client";

import { ambassadorPrograms } from "@/app/constant/data";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import {
  Award,
  Calendar,
  ExternalLink,
  FileText,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface CampusAmbassadorCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  googleFormUrl: string;
  isOpen?: boolean;
  deadline?: string;
}

export default function CampusAmbassadorList() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Join Our Ambassador Programs
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore our open programs and become a leader in your campus tech
          community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambassadorPrograms.map((program) => (
          <CampusAmbassadorCard
            key={program.id}
            title={program.title}
            description={program.description}
            imageUrl={program.imageUrl}
            googleFormUrl={program.googleFormUrl}
            isOpen={program.isOpen}
            deadline={program.deadline}
          />
        ))}
      </div>
    </div>
  );
}

function CampusAmbassadorCard({
  title = "Campus Ambassador Program 2026",
  description = "Represent your campus, lead the tech community, and unlock exclusive perks, swag, and leadership opportunities with JnUITS.",
  imageUrl = "/images/ambassador-hero.jpg",
  googleFormUrl = "https://forms.gle/your-google-form-link",
  isOpen = true,
  deadline = "2026-08-30T23:59:59",
}: CampusAmbassadorCardProps) {
  // 💡 Modal-এর State
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      {/* ---------------- CARD SECTION ---------------- */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 group flex flex-col justify-between">
        <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-900 shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

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

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg backdrop-blur-md">
            <Sparkles size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Leadership
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3 flex-1 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>

            {/* 💡 ফিক্স: কার্ডে শুধুমাত্র ৩ লাইন দেখাবে (line-clamp-3) */}
            <div>
              <div className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                <MarkdownRenderer content={description} />
              </div>
              {/* Details Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <FileText size={14} /> View Full Details
              </button>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 mt-auto">
              <span className="text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Award size={12} className="text-amber-400" /> Exclusive Swag
              </span>
              <span className="text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Sparkles size={12} className="text-indigo-400" /> Direct
                Mentorship
              </span>
            </div>

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

          <div className="pt-4 border-t border-slate-900 mt-4 shrink-0">
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

      {/* ---------------- MODAL SECTION ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50 shrink-0">
              <h3 className="text-xl font-bold text-white pr-4">{title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable Description) */}
            <div className="p-6 overflow-y-auto text-slate-300 text-sm leading-relaxed [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              <MarkdownRenderer content={description} />
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              {isRegistrationOpen && (
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 text-sm"
                >
                  <span>Apply Now</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
