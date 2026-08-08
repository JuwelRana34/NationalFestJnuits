export interface Announcement {
  id: string;
  title: string;
  content: string;
  /** Optional cover image URL. Card and modal both gracefully handle its absence. */
  image?: string;
  /** ISO 8601 date string, e.g. "2026-08-01T10:00:00.000Z" */
  createdAt: string;
}
