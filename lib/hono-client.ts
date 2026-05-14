// import { getCloudflareContext } from "@opennextjs/cloudflare";
// import { headers as nextHeaders } from "next/headers";

// export const honoFetch = async <T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> => {
//   const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

//   // ১. বর্তমান রিকোয়েস্টের হেডারগুলো নিন (যাতে কুকি থাকে)
//   const reqHeaders = await nextHeaders();
//   const cookie = reqHeaders.get("cookie");
//  console.log('🚀 ~ variable:', cookie);
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

export const honoFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  console.log("🚀 ~ Under check:", options.headers);
  // ১. একটি স্ট্যান্ডার্ড Headers অবজেক্ট তৈরি করুন
  const fetchHeaders = new Headers();
  fetchHeaders.set("Content-Type", "application/json");

  // ২. Next.js থেকে বর্তমান রিকোয়েস্টের হেডারগুলো নিন
  const reqHeaders = await nextHeaders();

  // ৩. নিরাপদ হেডারগুলো কপি করুন (Service Binding এর জন্য Host বা Connection হেডার বাদ দেওয়া জরুরি)
  reqHeaders.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (
      lowerKey !== "host" &&
      lowerKey !== "connection" &&
      lowerKey !== "content-length"
    ) {
      fetchHeaders.set(key, value);
    }
  });

  // ৪. Options থেকে আসা হেডারগুলোকে (যেমন আপনার পাঠানো better-auth কুকি) সর্বোচ্চ অগ্রাধিকার দিন
  if (options.headers) {
    const customHeaders = new Headers(options.headers as HeadersInit);
    customHeaders.forEach((value, key) => {
      fetchHeaders.set(key, value); // এটি Next.js এর ডিফল্ট কুকি/হেডারকে ওভাররাইট করবে
    });
  }

  let response: Response;

  if (process.env.NODE_ENV === "development") {
    response = await fetch(`http://localhost:8787${path}`, {
      ...options,
      headers: fetchHeaders,
    });
  } else {
    const { env } = getCloudflareContext();

    // ৫. Service Binding রিকোয়েস্ট
    response = await env.HONO_API.fetch(
      new Request(`https://hono-api${path}`, {
        ...options,
        headers: fetchHeaders,
      }),
    );
  }

  if (!response.ok) {
    const err = await response.text().catch(() => "Unknown error");
    throw new Error(`API Error [${response.status}] ${path}: ${err}`);
  }

  return response.json() as Promise<T>;
};
