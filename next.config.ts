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
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "@base-ui/react",
      "three",
      "@react-three/fiber",
      "motion",
      "zod",
      "react-markdown",
      "remark-gfm",
    ],
    serverMinification: true,
  },
};

initOpenNextCloudflareForDev();
export default nextConfig;