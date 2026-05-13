
import { connection } from "next/server";
import EnhancedDashboard from "./DashboardClient";

// --- MOCK DATA (Server-side — could be replaced with DB/API calls) ---

export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Opening Ceremony er jayga poriborton kora hoyeche",
    message:
      "Kharap abhawa thakar karone, opening ceremony ekhon Main Auditorium e hobe.",
    time: "2 ghonta age",
  },
];

export const EVENTS = [
  {
    id: 1,
    title: "Hackathon Kickoff",
    date: "Oct 15, 2026",
    time: "09:00 AM",
    location: "Innovation Lab",
    category: "Competition",
    isTeamEvent: true,
    maxTeamSize: 4,
  },
  {
    id: 2,
    title: "UI/UX Masterclass",
    date: "Oct 16, 2026",
    time: "02:00 PM",
    location: "Design Studio B",
    category: "Workshop",
    isTeamEvent: false,
  },
  {
    id: 3,
    title: "Networking Mixer",
    date: "Oct 17, 2026",
    time: "07:00 PM",
    location: "Rooftop Lounge",
    category: "Social",
    isTeamEvent: false,
  },
  {
    id: 4,
    title: "Robotics Battle",
    date: "Oct 18, 2026",
    time: "10:00 AM",
    location: "Engineering Block",
    category: "Competition",
    isTeamEvent: true,
    maxTeamSize: 3,
  },
];

export const DashboardWraper = async () => {
  await connection();
  // FIXME:Call api to fetch registrations (mocked here as a static string for demonstration)

  const data = [{
    id: 1,
    eventId: 1,
    teamName: "Code Warriors",
    members: ["Alice", "Bob", "Charlie"],
    registrationTime: "2026-10-01T12:00:00Z",
  }]
  console.log("Fetched Registrations:", data);
  return (
    // <EnhancedDashboard
    //   announcements={ANNOUNCEMENTS}
    //   registrations={data || []}
    // />
    <h1>
       Hidden Title Text 
    </h1>
  );
};
