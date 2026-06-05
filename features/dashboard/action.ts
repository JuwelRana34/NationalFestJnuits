"use server";

import { honoFetch } from "@/lib/hono-client";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

interface UpdateProfileResponse {
  message: string;
  data: [] | null;
  status: number;
}

export const UpdateProfileAction = async (formData: {
  phone: string;
  institution: string;
  department: string;
  tShirtSize: string;
}) => {
 const cookie = await cookies();
  const res = await honoFetch<UpdateProfileResponse>(
    `/api/users/update-profile`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
        Cookie: cookie.toString()
       },
      credentials: "include",
      body: JSON.stringify(formData),
    },
  );

  if (res.status !== 200) {
    throw new Error("Failed to update profile");
  }
  revalidatePath("/dashboard");

  return res.response;
};
