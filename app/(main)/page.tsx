import { Segments, SpeakersJudges } from "@/components/custom/DynamicMotion";
import { InfinitePartnerAndSponsors } from "@/features/event/_components/InfiniteScroll";
import Hero from "@/features/home/components/Hero";
import { partnersData } from "../constant/data";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function JnUITFestLanding() {
  return (
    <div className=" relative min-h-screen bg-linear-to-b from-slate-900 via-slate-950  text-slate-300">
      <Hero />
      {/* Floating Rainbow Button - Bottom Right */}
      <Link href="https://jnuits.github.io/frame/" target="_blank" className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
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
      {/* <EventSchedule /> */}
      <SpeakersJudges isComingSoon={true} isShowMore={true} />
      {/* <Suspense fallback={<div>Loading Campus Ambassador Program...</div>}>
      <CampusAmbassadorList />
      </Suspense> */}
    </div>
  );
}
