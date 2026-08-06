import { FormField, GetEventValues } from "@/features/event/types";

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
    title: "Track Event",
    Path: "/event-tracker",
  },
  {
    title: "events",
    Path: "/events",
  },
  {
    title: "Speakers & Judges",
    Path: "/speakers",
  },
  {
    title: "Committee",
    Path: "/committee",
  },
];

export const DashboardNavItems = [
  {
    title: "Dashboard overview",
    Path: "/admin",
  },
  {
    title: "Event Management",
    Path: "/admin/events",
  },
  // {
  //   title: "Payment Management",
  //   Path: "/admin/payment-management",
  // },
  {
    title: "Registration Management",
    Path: "/admin/registrations",
  },
  {
    title: "User Management",
    Path: "/admin/UserManagement",
  },
  {
    title: "Cupon Management",
    Path: "/admin/cuponManagement",
  },
];

const speakers = [
  {
    id: 1,
    name: "M Manjur Mahmud",
    designation: "President, DataSoft Systems ",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1786019083/event_registrations/WhatsApp_Image_2026-07-31_at_6.56.56_PM_kkerwa.jpg",
  },
  {
    id: 2,
    name: "Nabila Khalid",
    designation: "Brand & Marketing Leader",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1786019083/event_registrations/WhatsApp_Image_2026-07-31_at_6.56.57_PM_x2psew.jpg",
  },
];

export const Speakers = speakers;


export const demoSubmissionSchema: FormField[] = [
  {
    id: "github_repo",
    label: "GitHub Repository Link",
    type: "url",
    required: true,
  },
  {
    id: "live_demo",
    label: "Live Demo URL (If deployed)",
    type: "url",
    required: false,
  },
  {
    id: "pitch_deck",
    label: "Pitch Deck (PDF)",
    type: "file",
    required: true,
  },
  {
    id: "project_desc",
    label: "Short Description of Project",
    type: "text",
    required: true,
  },
];