export interface EventData {
  trackingId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  status: "Upcoming" | "Ongoing" | "Completed";

  timeline: {
    title: string;
    date: string;
  }[];
}

export const events: EventData[] = [
  {
    trackingId: "JNU250001",
    eventName: "Tech Carnival 2025",
    eventDate: "2025-12-10",
    venue: "Central Auditorium",
    status: "Upcoming",

    timeline: [
      {
        title: "Registration Opened",
        date: "2025-11-01",
      },
      {
        title: "Event Scheduled",
        date: "2025-12-10",
      },
    ],
  },

  {
    trackingId: "JNU250002",
    eventName: "Programming Contest",
    eventDate: "2025-10-20",
    venue: "ICT Building",
    status: "Ongoing",

    timeline: [
      {
        title: "Registration Closed",
        date: "2025-10-15",
      },
      {
        title: "Contest Started",
        date: "2025-10-20",
      },
    ],
  },

  {
    trackingId: "JNU250003",
    eventName: "Hackathon 2025",
    eventDate: "2025-09-12",
    venue: "Innovation Lab",
    status: "Completed",

    timeline: [
      {
        title: "Team Formation",
        date: "2025-08-01",
      },
      {
        title: "Hackathon Completed",
        date: "2025-09-12",
      },
    ],
  },

  {
    trackingId: "JNU250004",
    eventName: "AI Workshop",
    eventDate: "2025-08-05",
    venue: "Seminar Room",
    status: "Completed",

    timeline: [
      {
        title: "Workshop Started",
        date: "2025-08-05",
      },
      {
        title: "Workshop Ended",
        date: "2025-08-05",
      },
    ],
  },

  {
    trackingId: "JNU250005",
    eventName: "Cyber Security Seminar",
    eventDate: "2025-11-25",
    venue: "Conference Hall",
    status: "Upcoming",

    timeline: [
      {
        title: "Speaker Confirmed",
        date: "2025-11-01",
      },
      {
        title: "Seminar Scheduled",
        date: "2025-11-25",
      },
    ],
  },
];
