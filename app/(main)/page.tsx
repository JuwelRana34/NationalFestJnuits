import { EventSchedule, Segments, SpeakersJudges } from "@/components/custom/DynamicMotion";
import { InfinitePartnerAndSponsors } from "@/features/event/_components/InfiniteScroll";
import Hero from "@/features/home/components/Hero";
import { partnersData } from "../constant/data";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import Image from "next/image";

export default function JnUITFestLanding() {
  return (
    <div className=" relative min-h-screen bg-linear-to-b from-slate-900 via-slate-950  text-slate-300">
      <Hero />
      {/* Floating Rainbow Button - Bottom Right */}
      <Link
        href="https://jnuits.github.io/frame/"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
      >
        <RainbowButton>Get Official Frame</RainbowButton>
      </Link>

      {/* https://jnuits.github.io/frame/ */}
      {/* <Segments />
      <HeroSection /> */}
      {/* About Section */}
      {/* <About /> */}
      {/* Segments Section */}
      <Segments />
      <InfinitePartnerAndSponsors
        data={partnersData}
        direction="right"
        title="Sponsors & partners"
      />
      {/* <InfinitePartnerAndSponsors data={roadshowInstitutions} direction="left" title="Roadshow Institutions" /> */}

      <EventSchedule />
      <SpeakersJudges isComingSoon={true} isShowMore={true} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2  p-2">
        <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-2 shadow-2xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/panelDisscussationImg/online_panel_discussion.jpeg"
              alt="Online Panel Discussion"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5">
              <span className="text-sm font-semibold text-cyan-300">
                SESSION 01
                 <span className="text-sm font-semibold font-mono  text-purple-300"> 28 aug 2026</span>
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">
                Online Panel Discussion
              </h3>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-2 shadow-2xl ">
          <div className="relative aspect-video overflow-hidden rounded-2xl ">
            <Image
              src="/panelDisscussationImg/panel_discussion.png"
              alt="Online Panel Discussion"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5">
              <span className="text-sm font-semibold text-purple-300">
                SESSION 02 
                <span className="text-sm font-semibold font-mono  text-cyan-300"> 30 aug 2026</span>
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">
                Expert Panel Discussion
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
