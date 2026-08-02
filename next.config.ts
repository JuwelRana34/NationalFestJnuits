import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isDev = process.env.NODE_ENV === 'development';
const DESTINATION_URL = isDev
  ? "http://localhost:5173" 
  : "http://localhost:5173";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/adminDashboard",
        destination: `${DESTINATION_URL}/adminDashboard/`,
      },
      {
        source: "/adminDashboard/:path*",
        destination: `${DESTINATION_URL}/adminDashboard/:path*`,
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