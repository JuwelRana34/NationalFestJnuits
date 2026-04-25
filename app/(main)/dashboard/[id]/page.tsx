import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import RegisteredEventsCard from "@/features/dashboard/components/RegisteredEventsCard";
import UserInfoCard from "@/features/users/components/UserInfoCard";
import { getUserProfile } from "@/features/users/queries";
import { Metadata } from "next";

// ডায়নামিক মেটাডেটা জেনারেট
export async function generateMetadata(): Promise<Metadata> {
  const response = await getUserProfile();

  const userName =
    response.success && response.data ? response.data.name : "Participant";

  const userImage =
    response.success && response.data?.image
      ? response.data.image
      : "https://yourwebsite.com/images/default-fest-og.jpg";

  return {
    title: `${userName} | Dashboard - National IT Fest 2026`,
    description: `View ${userName}'s registered segments and fest profile for Jagannath University IT Society.`,
    openGraph: {
      title: `${userName}'s Fest Profile | JnUITS`,
      description: "Join the biggest IT Fest of 2026!",
      images: [
        {
          url: userImage,
          width: 1200,
          height: 630,
          alt: `${userName}'s Profile Picture`,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${userName}'s Fest Profile | JnUITS`,
      description: "Join the biggest IT Fest of 2026!",
      images: [userImage],
    },
  };
}

export default function Profile() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold ">Dashboard</h1>
            <p className=" text-slate-300 mt-1">
              Manage your fest profile and registrations.
            </p>
          </div>
          <Button className=" bg-secondary text-white hover:bg-secondary/90 font-medium">
            <Download className="w-4 h-4 mr-2" />
            Download ID Card
          </Button>
          <Button className=" bg-secondary text-white hover:bg-secondary/90 font-medium">
            verify email
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: User Info (Takes 1 column) */}
          <div className="lg:col-span-1">
            <UserInfoCard />
          </div>

          {/* Right Column: Registered Events & Stats (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <RegisteredEventsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
