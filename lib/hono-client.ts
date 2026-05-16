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

// ১. রিটার্ন টাইপ ইন্টারফেস
export interface FetchResult<T> {
  status: number;
  response: T | null; // হুবহু এপিআই রেসপন্স এখানে থাকবে
}

export const honoFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<FetchResult<T>> => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const fetchHeaders = new Headers();
  fetchHeaders.set("Content-Type", "application/json");

  const reqHeaders = await nextHeaders();
  reqHeaders.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (!["host", "connection", "content-length"].includes(lowerKey)) {
      fetchHeaders.set(key, value);
    }
  });

  if (options.headers) {
    const customHeaders = new Headers(options.headers as HeadersInit);
    customHeaders.forEach((value, key) => {
      fetchHeaders.set(key, value);
    });
  }

  let fetchResponse: Response;

  if (process.env.NODE_ENV === "development") {
    fetchResponse = await fetch(`http://localhost:8787${path}`, {
      ...options,
      headers: fetchHeaders,
    });
  } else {
    const { env } = getCloudflareContext();
    fetchResponse = await env.HONO_API.fetch(
      new Request(`https://hono-api${path}`, {
        ...options,
        headers: fetchHeaders,
      }),
    );
  }

  // যদি বডি না থাকে (যেমন ৪01 বা ৫00 এরর যেখানে বডি নেই)
  if (fetchResponse.status >= 400 && fetchResponse.status !== 401) {
    // ৪0১ বাদে অন্য বড় এরর হলে null দিচ্ছি
    return { status: fetchResponse.status, response: null };
  }

  // সব ঠিক থাকলে বা ৪0১ হলেও বডি থাকলে (Hono sendError বডি পাঠায়)
  const result = (await fetchResponse.json()) as T;
  return { status: fetchResponse.status, response: result };
};