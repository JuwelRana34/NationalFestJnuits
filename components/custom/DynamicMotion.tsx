"use client";

import dynamic from "next/dynamic";

export const AnimatedContainer = dynamic(
  () => import("./AnimatedWrappers").then((mod) => mod.AnimatedContainer),
  { ssr: false },
);

export const AnimatedItem = dynamic(
  () => import("./AnimatedWrappers").then((mod) => mod.AnimatedItem),
  { ssr: false },
);

// export const HeroSection = dynamic(
//   () => import("@/features/home/components/HeroSection"),
//   { ssr: false },
// );

export const About = dynamic(
  () => import("@/features/home/components/AboutSection"),
  { ssr: false },
);

export const EventSchedule = dynamic(
  () => import("@/features/home/components/EventSchedule"),
  { ssr: false },
);

export const Segments = dynamic(
  () => import("@/features/home/components/Segments"),
  { ssr: false },
);

export const SpeakersJudges = dynamic(
  () => import("@/features/home/components/SpeakersJudges"),
  { ssr: false },
);

export const CouponForm = dynamic(
  () => import("@/features/coupon/_components/CouponCreateion"),
  { ssr: false },
);

export const Navbar = dynamic(
  () => import("@/components/custom/navbar/navbar"),
  {
    ssr: false,
  },
);

// export const Events = dynamic(
//   () => import("@/features/Events/components/Events"),
//   { ssr: false },
// );
