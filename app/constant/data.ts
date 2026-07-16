import { GetEventValues } from "@/features/event/types";

export const HeroSection = {
  title: "National AI & IT Summit 2026",
  action: "Register Now",
  eyeCatch: "Join the Future of Technology",
  action2: "Learn More",
};

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
    id: "evt_001",
    coverImage: "/images/event1.jpg",
    slug: "national-programming-contest-2026",
    title: "National Programming Contest 2026",
    eventType: "team",
    description: "National level competitive programming contest.",
    fee: 500, // বেস টিমের ফি
    baseTeamSize: 3, // অটোমেটিক ৩ জনের নাম, ইমেইল, ফোন চাইবে
    maxExtraMembers: 1, // ১ জন এক্সট্রা নেওয়া যাবে
    extraMemberFee: 200, 
    deadline: "2026-08-10",
    eventDate: "2026-08-15",
    venue: "Jagannath University",
    isActive: true,
    schemaFields: [
      // এখানে মেম্বারদের ব্যক্তিগত তথ্য বাদ দিয়ে শুধু টিমের কমন ফিল্ডগুলো রাখা হলো
      {
        id: "teamName",
        label: "Team Name",
        type: "text",
        required: true,
      },
      {
        id: "university",
        label: "University Name",
        type: "text",
        required: true,
      },
      {
        id: "department",
        label: "Department",
        type: "select",
        required: true,
        options: ["CSE", "EEE", "BBA", "Economics", "Physics"],
      },
      {
        id: "cf",
        label: "Team Codeforces Profile",
        type: "url",
        required: false,
      },
    ],
  },

  {
    id: "evt_002",
    coverImage: "/images/event2.jpg",
    slug: "ui-ux-design-workshop",
    title: "UI/UX Design Workshop",
    eventType: "seminar", 
    description: "Learn modern UI/UX design using Figma.",
    fee: 100,
    baseTeamSize: 0, // সেমিনারে টিম মেম্বার সেকশন রেন্ডার হবে না
    maxExtraMembers: 0,
    extraMemberFee: 0,
    deadline: "2026-07-20",
    eventDate: "2026-08-25",
    venue: "JNU IT Society Lab",
    isActive: true,
    schemaFields: [
      // যেহেতু এটি সেমিনার, তাই ফর্ম বিল্ডার থেকেই Name এবং Email নিতে হবে
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
    id: "evt_003",
    coverImage: "",
    slug: "startup-pitch-fest",
    title: "Startup Pitch Fest",
    eventType: "team",
    description: "Pitch your startup idea to judges.",
    fee: 1000,
    baseTeamSize: 2, // অটোমেটিক ২ জনের তথ্য চাইবে
    maxExtraMembers: 3, // আরও ৩ জন যোগ করা যাবে
    extraMemberFee: 300,
    deadline: "2026-07-01",
    eventDate: "2026-10-08",
    venue: "Innovation Hub",
    isActive: false,
    schemaFields: [
      {
        id: "startupName",
        label: "Startup Name",
        type: "text",
        required: true,
      },
      {
        id: "category",
        label: "Startup Category",
        type: "select",
        required: true,
        options: ["AI", "EdTech", "HealthTech", "FinTech", "SaaS"],
      },
      {
        id: "pitchDeck",
        label: "Pitch Deck (PDF)",
        type: "file",
        required: true,
      },
      {
        id: "github",
        label: "GitHub Repository (If any)",
        type: "url",
        required: false,
      },
    ],
  },
];