import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
  // env: {
  //   NEXT_PUBLIC_BETTER_AUTH_URL: "https://jnu-it-fest.rk370613.workers.dev",
  // },
};


initOpenNextCloudflareForDev();

export default nextConfig;




