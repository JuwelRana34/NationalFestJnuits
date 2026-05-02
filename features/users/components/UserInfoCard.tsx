"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useUserSession";
import { Building2, Edit, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../queries";

type DbUser = {
  id: string;
  festId: string;
  name: string;
  email: string;
  image?: string | null;
};

export default function UserInfoCard() {
  const { user, userId } = useAuth();
  const [userinfo, setUserData] = useState<DbUser | null>(null);
  useEffect(() => {
    const fetchUserFromDB = async () => {
      const response = await getUserProfile({ id: userId || "" });

      if (response.success && response.data) {
        setUserData(response.data as DbUser);
      } else {
        console.error("Error fetching user:", response.error);
      }
    };

    fetchUserFromDB();
  }, [userId]);

  return (
    <Card className=" bg-slate-700 border-none shadow-sm">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 border-2 border-violet-400">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback className=" text-secondary text-2xl font-bold">
              RU
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-serif text-secondary">
          {user?.name}
        </CardTitle>
        <CardDescription className="text-amber-600 font-medium text-wrap">
          ID: {userinfo?.festId || "JNUITS-XX-XXXX"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <Building2 className="w-5 h-5 text-secondary" />
          <span className="text-sm text-slate-300">jagannth university</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <Mail className="w-5 h-5 text-secondary" />
          <span className="text-sm text-slate-300">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <Phone className="w-5 h-5 text-secondary" />
          <span className="text-sm text-slate-300">0175823641</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <MapPin className="w-5 h-5 text-secondary" />
          <span className="text-sm text-slate-300">Dhaka</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 bg-slate-700">
        <Button className="w-full text-white shadow-2xl">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
