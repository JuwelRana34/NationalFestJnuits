import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Building,
  GraduationCap,
  Hash,
  Mail,
  Phone,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import { Profile } from "../Types";
import { ProfileEditDialog } from "./ProfileEditDialog";
export const ProfileView = ({ profile }: { profile: Profile }) => {
  const details = [
    { icon: Hash, label: "Fest ID", value: profile.festId },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: profile.phone },
    { icon: Building, label: "Institution", value: profile.institution },
    { icon: GraduationCap, label: "Department", value: profile.department },
    { icon: Shirt, label: "T-Shirt Size", value: profile.tShirtSize },
  ];

  // প্রোফাইল অসম্পূর্ণ কিনা তা চেক করার লজিক
  const isProfileIncomplete =
    !profile.phone ||
    !profile.institution ||
    !profile.department ||
    profile.phone === "N/A" ||
    profile.institution === "N/A";



  return (
    <div className="space-y-6">
      {/* প্রোফাইল ইনকমপ্লিট থাকলে ওপরে সুন্দর একটি নোটিশ দেখাবে */}
      {isProfileIncomplete ? (
        <div className="md:flex space-y-2 items-start gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-400 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h5 className="font-semibold leading-none tracking-tight">
              Incomplete Profile
            </h5>
            <p className="mt-1 text-sm opacity-90">
              Please update your profile information (Phone, Institution, and
              Department) to get full access.
            </p>
          </div>
          <ProfileEditDialog profile={profile} triggerVariant="alert" />
        </div>
      ): (
        <ProfileEditDialog profile={profile}/>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-bold border-4 border-cyan-500/20 shadow-sm">
              {profile.image ? (
                <Image
                  src={profile.image || ""}
                  alt={profile.name}
                  width={500}
                  height={500}
                  className=" h-16 w-16  md:h-full md:w-full object-cover rounded-full"
                  unoptimized
                  loading="eager"
                />
              ) : (
                <>{profile.name.charAt(0)}</>
              )}
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-2xl font-bold text-gradient ">
                {profile.name}
              </h2>
              <p className="text-slate-500 font-medium">Role: {profile.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {details.map((detail, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
                <detail.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {detail.label}
                </p>
                <p className="text-slate-900 font-semibold">
                  {detail.value || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};;
