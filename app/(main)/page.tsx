import {
  EventSchedule,
  HeroSection,
  Segments,
  SpeakersJudges,
} from "@/components/custom/DynamicMotion";
import About from "@/features/home/components/AboutSection";

export default function JnUITFestLanding() {
  return (
    <div className=" min-h-screen bg-slate-50 font-sans text-slate-900">
      <HeroSection />
      {/* About Section */}

      <About />
      {/* Segments Section */}
      <Segments />
      <EventSchedule />
      <SpeakersJudges />
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-700">
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
          {/* © {new Date().getFullYear()}  */}
          Jagannath University IT Society. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
