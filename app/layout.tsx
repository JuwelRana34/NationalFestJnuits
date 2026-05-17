import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://jnuits.org.bd"),
  title: "National AI & IT Summit 2026|JnUITS",
  description:
    "Welcome to the official portal for the National AI & IT Summit 2026 organized by the Jagannath University IT Society (JnUITS). Register now to compete, showcase your projects, and join the biggest tech celebration.",
  keywords: [
    "National AI & IT Summit 2026",
    "JnUITS Summit",
    "JnU IT Society",
    "Jagannath University IT Society",
    "Tech Fest Bangladesh",
    "Programming Contest",
    "IT Fest Registration",
    "JNU student organization",
  ],
  icons: {
    icon: "/MainLogo.svg",
  },
  openGraph: {
    title: "National AI & IT Summit 2026 | JnU IT Society",
    description:
      "Join the brightest minds at the National AI & IT Summit 2026 hosted by JnUITS. Register your team for programming contests, project showcases, and esports tournaments.",
    url: "https://jnuits.org.bd/",
    siteName: "JnUITS National AI & IT Summit",
    images: [
      {
        url: "https://res.cloudinary.com/dp4fgwjik/image/upload/v1776816318/WhatsApp_Image_2026-04-22_at_6.02.24_AM_hnszse.jpg",
        width: 1200,
        height: 630,
        alt: "JnUITS National AI & IT Summit 2026 Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "National IT Fest 2026 | JnU IT Society",
    description:
      "Join the brightest minds at the National IT Fest 2026 hosted by JnUITS. Register your team for programming contests, project showcases, and esports tournaments.",
    images: [
      "https://res.cloudinary.com/dp4fgwjik/image/upload/v1776816318/WhatsApp_Image_2026-04-22_at_6.02.24_AM_hnszse.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" closeButton richColors />
        {children}
      </body>
    </html>
  );
}
