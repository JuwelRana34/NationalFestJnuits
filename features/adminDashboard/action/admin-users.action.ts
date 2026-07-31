"use server";

import { revalidatePath } from "next/cache";
import { CreateUserInput, createUserSchema } from "../admin.schema";
// তোমার honoFetch ইমপোর্ট করে নাও
import { honoFetch } from "@/lib/hono-client";
import { cookies } from "next/headers"; 

export async function createAdminUserAction(data: CreateUserInput) {
  try {
    // ১. Validate Data Input with Zod
    const validatedData = createUserSchema.parse(data);

      

   const  cookie = (await cookies()).getAll();
    console.log("Cookie from Next.js headers:", cookie);

      const cookieString = cookie.map(c => `${c.name}=${c.value}`).join('; ');
      console.log("Cookie String:", cookieString);

    const { status, response } = await honoFetch("api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
        Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
        role: validatedData.role,
      }),
    });

    console.log("Response from honoFetch:", response);
    // ৪. Hono/Better Auth থেকে যদি সাকসেস না আসে (Better Auth সাধারণত 200 বা 201 রিটার্ন করে)
    if (status !== 200 && status !== 201) {
      // Better Auth এরর হলে response.message এর মধ্যে এরর মেসেজ থাকে
      throw new Error( "Failed to create user on backend");
    }

    // ৫. Update UI instantly
    revalidatePath("/admin/users");

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error("User Creation Error:", );
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
