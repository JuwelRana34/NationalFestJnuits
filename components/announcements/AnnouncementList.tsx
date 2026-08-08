"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Announcement } from "@/actions/announcement";
import { AnnouncementListItem } from "@/components/announcements/AnnouncementListItem";
import { AnnouncementModal } from "@/components/announcements/AnnouncementModal";

interface AnnouncementListProps {
  announcements: Announcement[];
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Announcement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? announcements.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q),
        )
      : announcements;

    // Newest first
    return [...base].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [query, announcements]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)] backdrop-blur-md sm:p-8">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500" />

      {/* Search */}
      <div className="relative mb-6 sm:mb-8">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
          strokeWidth={2}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-zinc-100 outline-none transition-colors duration-200 placeholder:text-zinc-500 focus:border-violet-500/50 focus:bg-zinc-900 focus:ring-4 focus:ring-violet-500/10"
        />
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="flex flex-col divide-y divide-zinc-800/60">
          {filtered.map((announcement) => (
            <AnnouncementListItem
              key={announcement.id}
              announcement={announcement}
              onOpen={setSelected}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-zinc-500">
          No announcements match &ldquo;{query}&rdquo;.
        </p>
      )}

      <AnnouncementModal
        announcement={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
