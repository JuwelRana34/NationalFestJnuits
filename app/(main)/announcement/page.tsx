import type { Metadata } from "next";
import { Megaphone, Sparkles } from "lucide-react";
import { announcements } from "@/lib/data/announcements";
import { AnnouncementList } from "@/components/announcements/AnnouncementList";

export const metadata: Metadata = {
  title: "Announcements | National AI & IT Festival",
  description:
    "Stay up to date with the latest news, schedule updates, and highlights from the National AI & IT Festival.",
};

export default function AnnouncementPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-4 py-20 font-sans sm:px-6 lg:px-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-fuchsia-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 space-y-5 text-center sm:mb-16">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
            <Sparkles className="h-4 w-4" />
            <span>Festival Updates</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-400 via-violet-400 to-blue-400 shadow-lg shadow-violet-900/40 sm:flex sm:h-14 sm:w-14">
              <Megaphone className="h-6 w-6 text-white" strokeWidth={2.25} />
            </div>
            <h1 className="bg-linear-to-b from-fuchsia-400 via-violet-400 to-blue-400 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
              Announcements
            </h1>
          </div>

          <p className="mx-auto max-w-xl text-base font-light text-zinc-400 sm:text-lg">
            The latest news, schedule changes, and highlights from the National
            AI &amp; IT Festival — all in one place.
          </p>
        </div>

        {/* Search + list */}
        <AnnouncementList announcements={announcements} />
      </div>
    </main>
  );
}
