import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Code,
  Gamepad2,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function JnUITFestLanding() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="font-serif text-xl font-bold tracking-wider flex items-center gap-2">
          <span className="text-amber-400">JnUITS</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About
          </a>
          <a
            href="#segments"
            className="hover:text-amber-400 transition-colors"
          >
            Segments
          </a>
          <a
            href="#schedule"
            className="hover:text-amber-400 transition-colors"
          >
            Schedule
          </a>
        </div>
        <Link href="/registration" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2 rounded font-semibold transition-all duration-300 shadow-sm">
          Register Now
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Classic Pattern Overlay (Optional CSS Background) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>

        <div className="relative z-10 max-w-4xl">
          <p className="text-amber-400 font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
            Jagannath University IT Society Presents
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
            National IT Fest <span className="text-amber-400">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A grand celebration of technology, innovation, and brilliance. Join
            the brightest minds across the nation to compete, collaborate, and
            conquer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>May 15 - 17, 2026</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Jagannath University Campus</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded text-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2">
              Explore Segments <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border border-slate-500 hover:border-white text-white px-8 py-3 rounded text-lg font-semibold transition-all">
              Download Rulebook
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-6 text-slate-900">
              Fostering the Tech Leaders of Tomorrow
            </h2>
            <div className="w-16 h-1 bg-amber-500 mb-6"></div>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              The National IT Fest organized by the Jagannath University IT
              Society is a flagship event designed to bring together technology
              enthusiasts, competitive programmers, and innovative thinkers from
              universities all over Bangladesh.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              With a legacy of excellence, this year&apos;s fest promises to be
              larger, more competitive, and packed with opportunities to learn,
              network, and showcase exceptional talent.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 text-center">
              <Users className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-3xl text-slate-900 mb-2">50+</h3>
              <p className="text-slate-500 font-medium">Universities</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 text-center mt-8">
              <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-3xl text-slate-900 mb-2">150k</h3>
              <p className="text-slate-500 font-medium">Prize Pool</p>
            </div>
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section
        id="segments"
        className="py-24 px-6 md:px-12 bg-white border-y border-slate-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4 text-slate-900">
              Event Segments
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-slate-500 text-lg">
              Compete in your area of expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group border border-slate-200 p-8 hover:border-amber-500 hover:shadow-xl transition-all duration-300 bg-slate-50">
              <Code className="w-12 h-12 text-slate-700 group-hover:text-amber-500 transition-colors mb-6" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Programming Contest
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Test your algorithmic and problem-solving skills in our flagship
                competitive programming battle.
              </p>
              <a
                href="#"
                className="text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="group border border-slate-200 p-8 hover:border-amber-500 hover:shadow-xl transition-all duration-300 bg-slate-50">
              <Lightbulb className="w-12 h-12 text-slate-700 group-hover:text-amber-500 transition-colors mb-6" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Project Showcasing
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Present your innovative software or hardware projects to a panel
                of industry experts and academia.
              </p>
              <a
                href="#"
                className="text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="group border border-slate-200 p-8 hover:border-amber-500 hover:shadow-xl transition-all duration-300 bg-slate-50">
              <Gamepad2 className="w-12 h-12 text-slate-700 group-hover:text-amber-500 transition-colors mb-6" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                Esports Tournament
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Battle it out in popular multiplayer games. Strategy, teamwork,
                and quick reflexes are required.
              </p>
              <a
                href="#"
                className="text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-4">
              JnUITS
            </h4>
            <p className="text-sm leading-relaxed mb-4">
              Jagannath University IT Society.
              <br />
              Empowering students through technology and innovation since
              inception.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Registration Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Campus Map
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@jnuits.org</li>
              <li>Phone: +880 1XXX XXXXXX</li>
              <li>Location: Jagannath University, Dhaka</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} Jagannath University IT Society. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
