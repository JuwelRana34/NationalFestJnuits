import { FormField, Segment } from "@/features/event/types";

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
  // {
  //   title: "Committee",
  //   Path: "/committee",
  // },
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
  {
    id: 3,
    name: "Ananya Zaman",
    designation: "Founder, PCB Store",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787236863/event_registrations/AnanyaZaman_tampqu.png",
  },
  {
    id: 4,
    name: "Sajeeb Ahamed",
    designation: "Vice President of Engineering, Ollyo",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787236861/event_registrations/Sajeeb_Ahamed_h95t1f.jpg",
  },
  {
    id: 5,
    name: "Zunaid Kazi, PhD",
    designation:
      "Technologist, researcher, and AI strategist. Founder and CEO of Knowtomation.",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787236861/event_registrations/zunaid-kazi_kd1i9u.jpg",
  },

  {
    id: 6,
    name: "Rezwan Habib",
    designation: "Head of Business at DBL Lifestyles Limited",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787283350/event_registrations/RezwanHabib_iw2bqr.jpg",
  },
  {
    id: 7,
    name: "Kingkor Ahsan",
    designation: "Writer, CEO, Havas Bangladesh",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787283352/event_registrations/Kingkor_ashan_dxuch5.png",
  },
  {
    id: 8,
    name: "Nazmul Huda",
    designation: "AVP, Compliance & HR, Startup Bangladesh Limited",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787283350/event_registrations/NazmulHuda_gtohhn.jpg",
  },
  {
    id: 9,
    name: "Rashed Rony",
    designation: "Former General Secretary- Jagannath University IT Society ",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787911591/event_registrations/drive-download-20260828T100531Z-1-001/IMG-20260823-WA0011_u8qdfg.jpg",
  },
  {
    id: 10,
    name: "Arafat Rahman",
    designation: "Senior Software Egnineer, BlueCloud Inc., Florida USA",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787911591/event_registrations/drive-download-20260828T100531Z-1-001/Arafat_Rahman_mv8tlv.png",
  },
  {
    id: 11,
    name: "Radia Rayan Chowdhury",
    designation:
      "Research Data Scientist- Teesside University, UK Technology & Innovation Secretary, Youth Connect Foundation",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787911590/event_registrations/drive-download-20260828T100531Z-1-001/RadiaRayanChowdhury_xq54n7.jpg",
  },
  {
    id: 12,
    name: "NASRAT SHARIF AVEEK",
    designation: "Mobile Engineer, Electrolux Group CoE, Malaysia",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787911591/event_registrations/drive-download-20260828T100531Z-1-001/Nasrat_sharif_Aveek_cauclj.png",
  },
  {
    id: 13,
    name: "Pavel Sarwar",
    designation: "SCo-Founder, Youth Hub Foundation Berhad, Malaysia",
    image:
      "https://res.cloudinary.com/dbwbwwteo/image/upload/v1787911591/event_registrations/drive-download-20260828T100531Z-1-001/Pavel_Sarwar_rqbg5p.png",
  },
  {
    id: 14,
    name: "Zakir Hossain",
    designation: "Senior Software Engineer, BlueCloud Inc., Florida USA",
    image:"",
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

export const prizePoolData: Segment[] = [
  {
    segmentName: "brainchild-season-20",
    prizes: [
      { position: "Champion", amount: 15000, currency: "BDT" },
      { position: "1st Runner Up", amount: 10000, currency: "BDT" },
      { position: "2nd Runner Up", amount: 5000, currency: "BDT" },
    ],
  },
  {
    segmentName: "ai-ad-venture",
    prizes: [
      { position: "Champion", amount: 10000, currency: "BDT" },
      { position: "1st Runner Up", amount: 5000, currency: "BDT" },
      { position: "2nd Runner Up", amount: 3000, currency: "BDT" },
    ],
  },
  {
    segmentName: "ai-it-olympiad",
    prizes: [
      { position: "Champion", amount: 5000, currency: "BDT" },
      { position: "1st Runner Up", amount: 3000, currency: "BDT" },
      { position: "2nd Runner Up", amount: 2000, currency: "BDT" },
    ],
  },
  {
    segmentName: "ai-it-olympiad",
    prizes: [
      { position: "Champion", amount: 5000, currency: "BDT" },
      { position: "1st Runner Up", amount: 3000, currency: "BDT" },
      { position: "2nd Runner Up", amount: 2000, currency: "BDT" },
    ],
  },
];

export const specialRewards = {
  totalPool: "1.1M+",
  giftHampers: "60K",
  aiTokens: "1M+",
  categories: ["People's Choice", "Best Team", "Other performance criteria"],
};

export type Partner = {
  name: string;
  role: string;
  imageUrl?: string;
};

export const partnersData: Partner[] = [
  {
    name: "PCB Store",
    role: "Tech Partner",
    imageUrl: "/sponsors/pcb.png",
  },
  {
    name: "Youth Connect Foundation",
    role: "Organizing Partner",
    imageUrl: "/sponsors/youthConnect.png",
  },
  {
    name: "Poridhi.io",
    role: "Knowledge Partner",
    imageUrl: "/sponsors/poridhi.png",
  },
  {
    name: "Nexaus cloud",
    role: "Olympiad Partner",
    imageUrl: "/sponsors/nexuxMultimidia.png",
  },
  {
    name: "IEEE JnU",
    role: "Organizing Partner",
    imageUrl: "/sponsors/IEEE.jpg",
  },
  {
    name: "Tech World",
    role: "Magazine Partner",
    imageUrl: "/sponsors/tw-logo.png",
  },
  {
    name: "iFix",
    role: "Segment Sponsor",
    imageUrl: "/sponsors/ifix.png",
  },
  {
    name: "আমাদের সময়",
    role: "Media Partner",
    imageUrl: "/sponsors/amaderSomoi.jpg",
  },
  {
    name: "BIIN",
    role: "Strategic Partner",
    imageUrl: "/sponsors/BIIN.png",
  },
];


export type RoadshowInstitution = {
  name: string;
  imageUrl?: string;
  role: string;
};

export const roadshowInstitutions: RoadshowInstitution[] = [
  {
    name: "American International University-Bangladesh",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "BRAC University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Daffodil International University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Dhaka International University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "East West University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "International University of Business Agriculture and Technology",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Jagannath University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Khulna University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Noakhali Science and Technology University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Rajshahi University of Engineering & Technology",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "United International University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "University of Frontier Technology, Bangladesh",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Chittagong University of Engineering & Technology",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "University of Asia Pacific",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Green University of Bangladesh",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Independent University, Bangladesh",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Bangladesh University of Professionals",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "University of Dhaka",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Presidency University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Uttara University",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Islamic University, Kushtia",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "NITER",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Barishal Engineering College",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Govt. Shahid Suhrawardy College",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Shaheed Bir Uttam Lt. Anwar Girls College",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
  {
    name: "Abu Jar Gifari (B.O.U)",
    imageUrl: "",
    role: "𝗥𝗼𝗮𝗱𝘀𝗵𝗼𝘄 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝘀",
  },
];
