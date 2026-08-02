import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isDev = process.env.NODE_ENV === 'development';
const DESTINATION_URL = isDev 
  ? 'http://localhost:5173' // লোকাল React Router পোর্ট
  : 'https://your-react-router-app.pages.dev'; // প্রোডাকশন লিংক

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: DESTINATION_URL,
      },
      {
        source: "/admin/:path*",
        destination: `${DESTINATION_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
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