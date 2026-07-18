import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-800 font-['Inter',sans-serif] overflow-hidden">
      {/* Top gradient accent line, consistent with the rest of the site */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-primary via-secondary to-primary opacity-70" />

      {/* Faint ambient glow to avoid a flat black block */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[40%] h-[40%] rounded-full blur-[140px] opacity-10 pointer-events-none bg-secondary" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 relative z-10">
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            JnUITS
          </h4>
          <p className="text-sm leading-relaxed text-slate-400">
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
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:text-secondary"
              >
                Registration Guidelines
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:text-secondary"
              >
                Payment Methods
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:text-secondary"
              >
                Campus Map
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:info@jnuits.org"
                className="flex items-center gap-2.5 text-slate-400 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:text-secondary"
              >
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                info@jnuits.org
              </a>
            </li>
            <li>
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-center gap-2.5 text-slate-400 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:text-secondary"
              >
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                +880 1XXX XXXXXX
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-slate-400">
              <MapPin className="w-4 h-4 shrink-0 text-primary" />
              Jagannath University, Dhaka
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500 relative z-10">
        {/* © {new Date().getFullYear()} */}
        Jagannath University IT Society. All rights reserved.
      </div>
    </footer>
  );
}
