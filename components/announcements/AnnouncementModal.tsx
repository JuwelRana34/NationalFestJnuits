"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Announcement } from "@/actions/announcement";

interface AnnouncementModalProps {
  announcement: Announcement | null;
  onClose: () => void;
}

export function AnnouncementModal({
  announcement,
  onClose,
}: AnnouncementModalProps) {
  // Portals need a DOM node, which only exists after mount (not during SSR).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close on Escape key
  useEffect(() => {
    if (!announcement) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [announcement, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {announcement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop — click outside to close */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/60"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close announcement"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-md backdrop-blur transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            </button>

            {/* Scrollable body */}
            <div className="overflow-y-auto">
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="mb-3 flex items-center gap-1.5 text-sm text-zinc-500">
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  <span>
                    {format(new Date(announcement.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>

                <h2
                  id="announcement-modal-title"
                  className="mb-4 text-2xl font-bold leading-tight text-zinc-100 sm:text-3xl"
                >
                  {announcement.title}
                </h2>

                <p className="whitespace-pre-line text-[15px] leading-relaxed text-zinc-400">
                  {announcement.content}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
