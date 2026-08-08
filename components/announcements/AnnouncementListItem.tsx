"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { format, isToday } from "date-fns";
import type { Announcement } from "@/actions/announcement";

interface AnnouncementListItemProps {
  announcement: Announcement;
  onOpen: (announcement: Announcement) => void;
}

function getDateParts(dateString: string) {
  const date = new Date(dateString);
  if (isToday(date)) {
    return { primary: "Today", secondary: format(date, "HH:mm") };
  }
  return { primary: format(date, "MMM d"), secondary: format(date, "yyyy") };
}

export function AnnouncementListItem({
  announcement,
  onOpen,
}: AnnouncementListItemProps) {
  const { primary, secondary } = getDateParts(announcement.createdAt);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onOpen(announcement)}
      className="group -mx-3 flex cursor-pointer items-start gap-5 rounded-xl px-3 py-5 transition-colors duration-200 hover:bg-zinc-800/40 sm:gap-8"
    >
      {/* Date column */}
      <div className="w-14 shrink-0 pt-0.5 text-right sm:w-20">
        <div className="text-xs font-semibold text-zinc-300 sm:text-[13px]">
          {primary}
        </div>
        <div className="text-[11px] text-zinc-600">{secondary}</div>
      </div>

      {/* Title + preview */}
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-100 transition-colors duration-200 group-hover:text-violet-300 sm:text-base">
          {announcement.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {announcement.content}
        </p>
      </div>

      {/* Affordance arrow */}
      <ArrowRight
        className="mt-1 hidden h-4 w-4 shrink-0 text-zinc-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-violet-400 sm:block"
        strokeWidth={2.25}
      />
    </motion.article>
  );
}
