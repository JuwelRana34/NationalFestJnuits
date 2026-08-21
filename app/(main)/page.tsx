import { Segments, SpeakersJudges } from "@/components/custom/DynamicMotion";
import { InfinitePartnerAndSponsors } from "@/features/event/_components/InfiniteScroll";
import Hero from "@/features/home/components/Hero";
import { partnersData, roadshowInstitutions } from "../constant/data";

export default function JnUITFestLanding() {
  return (
    <div className=" min-h-screen bg-linear-to-b from-slate-900 via-slate-950  text-slate-300">
      <Hero />
      {/* <Segments />
      <HeroSection /> */}
      {/* About Section */}
      {/* <About /> */}
      {/* Segments Section */}
      <Segments />
      <InfinitePartnerAndSponsors data={partnersData} direction="right" title="Sponsors & partners" />
      {/* <InfinitePartnerAndSponsors data={roadshowInstitutions} direction="left" title="Roadshow Institutions" /> */}
      {/* <EventSchedule /> */}
      <SpeakersJudges isComingSoon={true} isShowMore={true} />
      {/* <Suspense fallback={<div>Loading Campus Ambassador Program...</div>}>
      <CampusAmbassadorList />
      </Suspense> */}
    </div>
  );
}
