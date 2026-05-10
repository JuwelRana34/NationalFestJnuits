// import type { NextConfig } from "next";
// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "cdn-icons-png.flaticon.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
//   cacheComponents: true,
//   // env: {
//   //   NEXT_PUBLIC_BETTER_AUTH_URL: "https://jnu-it-fest.rk370613.workers.dev",
//   // },
// };

// initOpenNextCloudflareForDev();

// export default nextConfig;



import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    minimumCacheTTL: 604800,
  },

  cacheComponents: true,

  // টার্বোপ্যাক এবং নেক্সট ১৬-এর জন্য সার্ভার সাইড অপ্টিমাইজেশন
  serverExternalPackages: ["@vercel/og", "resvg", "yoga"],

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "framer-motion",
      "@base-ui/react",
    ],
    serverMinification: true,
  },

};

initOpenNextCloudflareForDev();

export default nextConfig;