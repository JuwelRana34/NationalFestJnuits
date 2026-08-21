import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Column 1: About */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            JnUITS
          </h4>
          <p className="text-sm leading-relaxed mb-4 text-slate-400">
            Jagannath University IT Society.
            <br />
            Empowering students through technology and innovation since
            inception.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link
                prefetch={false}
                href="/events"
                className="hover:text-indigo-400 transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href="/speakers"
                className="hover:text-indigo-400 transition-colors"
              >
                Speakers
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            Contact Us
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-slate-300 transition-colors">
              Email: itfest@jnuits.org.bd
            </li>
            {/* <li>Phone: +880 1XXX XXXXXX</li> */}
            <li className="hover:text-slate-300 transition-colors">
              Location: Jagannath University, Dhaka
            </li>
          </ul>
        </div>

        {/* Column 4: Campus Map (Google Maps Embed) */}
        <div id="map" className="flex flex-col h-full">
          <h4 className="font-serif text-xl font-bold text-white mb-4">
            Campus Map
          </h4>
          <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-slate-800/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
            {/* Map Placeholder Overlay for Glow Effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-indigo-500/30 rounded-xl transition-colors pointer-events-none z-10"></div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.8778401309855!2d90.40879551543118!3d23.714322494639913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900084f938f%3A0xc6c78e11e3b679!2sJagannath%20University!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) contrast(100%)",
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover"
              title="Jagannath University Campus Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; 2026 Jagannath University IT Society. All rights reserved.
      </div>
    </footer>
  );
}
