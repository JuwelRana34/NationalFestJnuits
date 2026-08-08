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
    title: "Events",
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
  {
    title: "Anouncements",
    Path: "/announcement",
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

export const ambassadorPrograms = [
  {
    id: 1,
    title: "Campus Ambassador Program",
    description: `The **JnU AI & IT Fest 2026 Campus Ambassador Program** is an exclusive opportunity for enthusiastic student leaders to represent their universities in one of Bangladesh's premier national AI and technology festivals. In collaboration with university clubs across the country, Campus Ambassadors will serve as the official representatives of the festival, inspiring students to participate, promoting innovation, and building a vibrant nationwide tech community.

As a Campus Ambassador, you will play a key role in connecting your campus with **JnU AI & IT Fest 2026** by spreading awareness, encouraging participation in various competitions and activities, and acting as a bridge between your university and the organizing committee. 

## Campus Ambassador Responsibilities

* **Serve as the official representative** of JnU AI & IT Fest 2026 at your university. 
* **Collaborate with your university club** to promote the festival among students. 
* **Share official promotional materials**, announcements, and event updates through social media and campus communication channels. 
* **Arrange roadshows** and encourage students to participate in the festival's competitions. 
* **Organize or assist** in at least one promotional campaign (online or offline) in coordination with your university club. 
* **Guide interested participants** regarding registration, event information, and important deadlines. 
* **Maintain regular communication** with the organizing team and submit promotional updates when required. 
* **Support the organizing committee** during the promotion period and contribute to building a strong nationwide participant community. 

## Campus Ambassador Benefits

* **Official Campus Ambassador Certificate** from Jagannath University IT Society (JnUITS) upon successful completion of the program. 
* **Official recognition** as the Campus Ambassador representing your university. 
* **Networking opportunities** to connect with students, university clubs, industry professionals, and organizers from across Bangladesh. 
* **Exclusive Campus Ambassador Kit** containing promotional resources, social media materials, and official guidelines. 
* **Get featured** on the official JnU AI & IT Fest 2026 website and social media platforms for outstanding performance. 
* **Special Entry Pass** into the festival for the Top-5 performing Campus Ambassadors. 
* **Priority access** to selected workshops, networking sessions, and festival activities. 
* **Future recommendations** for leadership and organizing roles in upcoming JnUITS events.`,
    imageUrl: "/campus.jpeg",
    googleFormUrl: "https://forms.gle/9gqyuDoCXTfuW3Fo6",
    isOpen: true,
    deadline: "2026-08-15T23:59:59",
  },

  {
    id: 2,
    title: "Department Ambassador Program",
    description: `Become the voice of your department! The **Department Ambassador Program** is a unique leadership opportunity for passionate students to represent their faculty, inspire peers, and drive tech initiatives at the ground level.

As a Department Ambassador, you will work closely with the core organizing committee to ensure your department stays updated and actively participates in all upcoming events.

### 📌 Key Responsibilities
* **Act as the primary liaison** between your department and the central organizing committee.
* **Promote campaigns** and share official updates within your departmental groups and notice boards.
* **Form and guide teams** from your department for tech competitions, hackathons, and quizzes.
* **Boost engagement** by encouraging classmates and juniors to participate in tech activities.

### 🎁 Exclusive Perks
* **Official Recognition & Certificate** as the verified Ambassador for your department.
* **Leadership Development** through direct mentorship from senior organizers and alumni.
* **Priority Access** to workshops, networking events, and premium tech seminars.
* **Exclusive Swag Kit** and special rewards for top-performing ambassadors.`,
    imageUrl: "/department.jpeg",
    googleFormUrl: "https://forms.gle/JaE4Kgrx2knXnYN37",
    isOpen: true,
    deadline: "2026-08-15T23:59:59",
  },
];
