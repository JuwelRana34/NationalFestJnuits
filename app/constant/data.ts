import { GetEventValues } from "@/features/event/types";

export const HeroSection ={
    title: 'National AI & IT Summit 2026',
    action: 'Register Now',
    eyeCatch: 'Join the Future of Technology',
    action2: 'Learn More',
}

export const NaveItems = [
  {
    title: "Home",
    Path: "/",
  },
  {
    title: "About",
    Path: "/about",
  },
  {
    title: "Track Event",
    Path: "/track-event",
  },
  {
    title: "events",
    Path: "/events",
  },
  {
    title: "Dashboard",
    Path: "/admin",
  },
];


export const DashboardNavItems = [
  {
    title: "Dashboard overview",
    Path: "/admin",
  },
  {
    title: "Event Management",
    Path: "/admin/event-management",
  },
  {
    title: "Payment Management",
    Path: "/admin/payment-management",
  },
  {
    title: "Create Event",
    Path: "/admin/create-event",
  },
];


export const demoEvents: GetEventValues[] = [
  {
    coverImage: "/images/event1.jpg",
    id: "evt_001",
    slug: "national-programming-contest-2026",
    title: "National Programming Contest 2026",
    eventType: "Competition",
    description: "National level competitive programming contest.",
    fee: 200,
    deadline: "2026-08-10",
    eventDate: "2026-08-15",
    venue: "Jagannath University",
    isActive: true,
    schemaFields: [
      {
        id: "university",
        label: "University Name",
        type: "text",
        required: true,
      },
      {
        id: "studentId",
        label: "Student ID",
        type: "text",
        required: true,
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "text",
        required: true,
      },
      {
        id: "department",
        label: "Department",
        type: "select",
        required: true,
        options: [
          "CSE",
          "EEE",
          "BBA",
          "Economics",
          "Physics",
        ],
      },
      {
        id: "cf",
        label: "Codeforces Profile",
        type: "url",
        required: false,
      },
    ],
  },

  {
    coverImage: "/images/event2.jpg",
    id: "evt_002",
    slug: "ui-ux-design-workshop",
    title: "UI/UX Design Workshop",
    eventType: "Workshop",
    description: "Learn modern UI/UX design using Figma.",
    fee: 100,
    deadline: "2026-07-20",
    eventDate: "2026-08-25",
    venue: "JNU IT Society Lab",
    isActive: true,
    schemaFields: [
      {
        id: "fullname",
        label: "Full Name",
        type: "text",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        required: true,
      },
      {
        id: "experience",
        label: "Figma Experience",
        type: "select",
        required: true,
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        id: "portfolio",
        label: "Portfolio URL",
        type: "url",
        required: false,
      },
    ],
  },

  {
    coverImage: "",
    id: "evt_003",
    slug: "startup-pitch-fest",
    title: "Startup Pitch Fest",
    eventType: "Hackathon",
    description: "Pitch your startup idea to judges.",
    fee: 300,
    deadline: "2026-7-01",
    eventDate: "2026-10-08",
    venue: "Innovation Hub",
    isActive: false,
    schemaFields: [
      {
        id: "teamName",
        label: "Team Name",
        type: "text",
        required: true,
      },
      {
        id: "teamSize",
        label: "Team Size",
        type: "number",
        required: true,
      },
      {
        id: "category",
        label: "Startup Category",
        type: "select",
        required: true,
        options: [
          "AI",
          "EdTech",
          "HealthTech",
          "FinTech",
          "SaaS",
        ],
      },
      {
        id: "pitchDeck",
        label: "Pitch Deck",
        type: "file",
        required: true,
      },
      {
        id: "github",
        label: "GitHub Repository",
        type: "url",
        required: false,
      },
    ],
  },
];