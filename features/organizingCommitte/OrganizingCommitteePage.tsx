import React from "react";
import {
  Award,
  Gavel,
  Star,
  UserCheck,
  Users,
  ChevronRight,
} from "lucide-react";

// Types for our data structure
type Member = {
  name: string;
  designations: string[];
};

type Category = {
  id: string;
  title: string;
  icon: React.ElementType;
  members: Member[];
  layout: "featured" | "grid" | "compact";
};

// Organized Data from your provided text
const committeeData: Category[] = [
  {
    id: "chief-guest",
    title: "Chief Guest",
    icon: Award,
    layout: "featured",
    members: [
      {
        name: "Prof. Dr. Md. Rais Uddin",
        designations: ["Vice-Chancellor", "Jagannath University"],
      },
    ],
  },
  {
    id: "special-guests",
    title: "Special Guests",
    icon: Star,
    layout: "grid",
    members: [
      {
        name: "Prof. Dr. Sabina Sharmin",
        designations: [
          "Treasurer, Jagannath University",
          "Dean, Faculty of Science, Jagannath University",
        ],
      },
      {
        name: "Prof. Dr. Imranul Hoque",
        designations: [
          "Chairman, Department of Marketing",
          "Jagannath University",
        ],
      },
      {
        name: "Prof. Dr. Azam Khan",
        designations: [
          "Professor, Department of Economics",
          "Director, Institute of Education & Research, JnU",
        ],
      },
      {
        name: "Dr. Mohammad Bilal Hossain",
        designations: [
          "Professor, Department of History",
          "Jagannath University",
        ],
      },
    ],
  },
  {
    id: "convener",
    title: "Convener",
    icon: UserCheck,
    layout: "featured",
    members: [
      {
        name: "Prof. Dr. Md. Abu Layek",
        designations: [
          "Professor & Chairman, Department of Computer Science & Engineering",
          "Moderator, Jagannath University IT Society (JnUITS)",
        ],
      },
    ],
  },
  {
    id: "co-convener",
    title: "Co-Convener",
    icon: Users,
    layout: "grid",
    members: [
      {
        name: "Prof. Dr. Uzzal Kumar Acharjee",
        designations: [
          "Professor, Department of CSE",
          "Immediate Past Moderator, JnUITS",
        ],
      },
      {
        name: "Prof. Dr. Mohammed Nasir Uddin",
        designations: [
          "Professor, Department of CSE",
          "Proctor, Jagannath University",
          "Director, ICT Cell",
        ],
      },
      {
        name: "Prof. Dr. Tabassum Zaman",
        designations: [
          "Professor, Department of Economics",
          "Jagannath University",
        ],
      },
    ],
  },
  {
    id: "judges",
    title: "Judges",
    icon: Gavel,
    layout: "compact",
    members: [
      { name: "Prof. Dr. Md. Zulfiker Mahmud", designations: [] },
      { name: "Prof. Dr. Selina Sharmin", designations: [] },
      { name: "Prof. Dr. Md. Manowarul Islam", designations: [] },
      { name: "Dr. Sajeeb Saha", designations: [] },
      { name: "Md. Aminul Islam", designations: [] },
      { name: "Nayeema Islam", designations: [] },
      { name: "Arnisha Akter", designations: [] },
    ],
  },
];

export default function OrganizingCommitteePage() {
  return (
    <section className="relative min-h-screen bg-[#09090b] py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Honorable Members</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-500 tracking-tight">
            Organizing Committee
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Meet the distinguished individuals guiding and organizing the
            National AI and IT Summit.
          </p>
        </div>

        {/* Categories Mapping */}
        <div className="space-y-24">
          {committeeData.map((category) => {
            const Icon = category.icon;

            return (
              <div key={category.id} className="relative">
                {/* Section Title */}
                <div className="flex items-center gap-4 mb-10 border-b border-zinc-800/60 pb-4">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                    {category.title}
                  </h2>
                </div>

                {/* Grid Layouts based on category */}
                <div
                  className={`grid gap-6 ${
                    category.layout === "featured"
                      ? "grid-cols-1 md:w-8/12 lg:w-7/12 mx-auto"
                      : category.layout === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // compact
                  }`}
                >
                  {category.members.map((member, idx) => {
                    // === FEATURED LAYOUT (For Chief Guest & Convener) ===
                    if (category.layout === "featured") {
                      return (
                        <div
                          key={idx}
                          className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 md:p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] hover:border-indigo-500/50 overflow-hidden"
                        >
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                          <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
                            {member.name}
                          </h3>
                          <ul className="space-y-2">
                            {member.designations.map((desig, i) => (
                              <li
                                key={i}
                                className={`text-zinc-400 ${i === 0 ? "font-medium text-indigo-300 text-lg" : "text-sm"}`}
                              >
                                {desig}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // === GRID LAYOUT (For Special Guests & Co-Conveners) ===
                    if (category.layout === "grid") {
                      return (
                        <div
                          key={idx}
                          className="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/40 hover:border-zinc-700 hover:shadow-xl flex flex-col h-full"
                        >
                          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                            <ChevronRight className="w-5 h-5 text-indigo-400" />
                          </div>

                          <h3 className="text-xl font-bold text-zinc-100 mb-3 pr-6">
                            {member.name}
                          </h3>
                          <div className="mt-auto space-y-1.5 pt-4 border-t border-zinc-800/50">
                            {member.designations.map((desig, i) => (
                              <p
                                key={i}
                                className={`text-sm leading-relaxed ${
                                  i === 0
                                    ? "text-indigo-300/90 font-medium"
                                    : "text-zinc-500"
                                }`}
                              >
                                {desig}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // === COMPACT LAYOUT (For Judges) ===
                    return (
                      <div
                        key={idx}
                        className="group flex items-center gap-4 bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-4 transition-all duration-300 hover:bg-indigo-500/5 hover:border-indigo-500/30"
                      >
                        <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors"></div>
                        <h3 className="text-base font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
