// import { getCloudflareContext } from "@opennextjs/cloudflare";
// // Next.js এর headers ফাংশন ইম্পোর্ট করুন
// import { headers as nextHeaders } from "next/headers";

// export const honoFetch = async <T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> => {
//   const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

//   // ১. বর্তমান রিকোয়েস্টের হেডারগুলো নিন (যাতে কুকি থাকে)
//   const reqHeaders = await nextHeaders();
//   const cookie = reqHeaders.get("cookie");

//   // ২. হেডার মার্জ করুন
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...Object.fromEntries(reqHeaders.entries()), // সব হেডার পাস করুন
//     ...(options.headers as Record<string, string>),
//   };

//   // যদি কুকি থাকে তবে সেটি নিশ্চিতভাবে সেট করুন
//   if (cookie) {
//     headers["cookie"] = cookie;
//   }

//   let response: Response;

//   if (process.env.NODE_ENV === "development") {
//     response = await fetch(`http://localhost:8787${path}`, {
//       ...options,
//       headers,
//     });
//   } else {
//     const { env } =  getCloudflareContext();

//     // ৩. Service Binding রিকোয়েস্টে হেডার পাস করা
//     // এখানে https://hono-api একটি ডামি ডোমেইন, এটি শুধু বাইন্ডিং ট্রিগার করে
//     response = await env.HONO_API.fetch(
//       new Request(`https://hono-api${path}`, {
//         ...options,
//         headers,
//       }),
//     );
//   }

//   if (!response.ok) {
//     const err = await response.text().catch(() => "Unknown error");
//     throw new Error(`API Error [${response.status}] ${path}: ${err}`);
//   }

//   return response.json() as Promise<T>;
// };


import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers as nextHeaders } from "next/headers";
import { cookies } from "next/headers"; // ← নতুন import

export const honoFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // কুকি দুইভাবে নেওয়ার চেষ্টা করো
  const reqHeaders = await nextHeaders();
  let cookie = reqHeaders.get("cookie");

  // যদি nextHeaders থেকে না পাও, cookies() দিয়ে manually বানাও
  if (!cookie) {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
    console.log("🍪 Manually built cookie:", cookie);
  } else {
    console.log("🍪 Cookie from headers:", cookie);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(cookie ? { cookie } : {}),
    ...(options.headers as Record<string, string>),
  };

  let response: Response;

  if (process.env.NODE_ENV === "development") {
    response = await fetch(`http://localhost:8787${path}`, {
      ...options,
      headers,
    });
  } else {
    const { env } = getCloudflareContext();

    if (!env.HONO_API) {
      throw new Error("HONO_API service binding missing");
    }

    response = await env.HONO_API.fetch(
      new Request(`https://hono-api${path}`, {
        ...options,
        headers,
      }),
    );
  }

  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`API Error [${response.status}] ${path}: ${err}`);
  }

  return response.json() as Promise<T>;
};