// import { getCloudflareContext } from "@opennextjs/cloudflare";
// import { headers as nextHeaders } from "next/headers";

// // ১. রিটার্ন টাইপ ইন্টারফেস
// export interface FetchResult<T> {
//   status: number;
//   response: T | null;
// }

// // ২. কাস্টম অপশন ইন্টারফেস তৈরি (যাতে requireAuth পাস করা যায়)
// export interface FetchOptions extends RequestInit {
//   requireAuth?: boolean;
// }

// export const honoFetch = async <T>(
//   endpoint: string,
//   options: FetchOptions = {},
// ): Promise<FetchResult<T>> => {
//   const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

//   // requireAuth আলাদা করে নিচ্ছি, ডিফল্ট false রাখছি
//   const { requireAuth = false, ...fetchOptions } = options;

//   const fetchHeaders = new Headers();
//   fetchHeaders.set("Content-Type", "application/json");

//   // ৩. ম্যাজিকটা এখানে: শুধুমাত্র requireAuth true হলেই headers() কল হবে!
//   if (requireAuth) {
//     const reqHeaders = await nextHeaders();
//     reqHeaders.forEach((value, key) => {
//       const lowerKey = key.toLowerCase();
//       if (!["host", "connection", "content-length"].includes(lowerKey)) {
//         fetchHeaders.set(key, value);
//       }
//     });
//   }

//   // কাস্টম হেডার থাকলে অ্যাড করা
//   if (fetchOptions.headers) {
//     const customHeaders = new Headers(fetchOptions.headers as HeadersInit);
//     customHeaders.forEach((value, key) => {
//       fetchHeaders.set(key, value);
//     });
//   }

//   let fetchResponse: Response;

//   // ৪. লোকাল এবং ক্লাউডফ্লেয়ার বাইন্ডিং হ্যান্ডেলিং
//   if (process.env.NODE_ENV === "development") {
//     fetchResponse = await fetch(`http://localhost:8787${path}`, {
//       ...fetchOptions,
//       headers: fetchHeaders,
//     });
//   } else {
//     const { env } = getCloudflareContext();
//     fetchResponse = await env.HONO_API.fetch(
//       new Request(`https://hono-api${path}`, {
//         ...fetchOptions,
//         headers: fetchHeaders, // OpenNext Service Binding
//       }),
//     );
//   }

//   // ৫. এরর এবং রেসপন্স হ্যান্ডেলিং
//   if (fetchResponse.status >= 400 && fetchResponse.status !== 401) {
//     return { status: fetchResponse.status, response: null };
//   }

//   try {
//     // JSON parse error handle করার জন্য try-catch অ্যাড করা ভালো
//     const result = (await fetchResponse.json()) as T;
//     return { status: fetchResponse.status, response: result };
//   } catch (error) {
//     return { status: fetchResponse.status, response: null };
//   }
// };

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers as nextHeaders } from "next/headers";

export interface FetchResult<T> {
  status: number;
  response: T | null;
}

export interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export const honoFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const { requireAuth = false, ...fetchOptions } = options;

  const fetchHeaders = new Headers();
  fetchHeaders.set("Content-Type", "application/json");

  // শুধুমাত্র অথেনটিকেশন দরকার হলেই headers() কল হবে
  if (requireAuth) {
    const reqHeaders = await nextHeaders();
    reqHeaders.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!["host", "connection", "content-length"].includes(lowerKey)) {
        fetchHeaders.set(key, value);
      }
    });
  }

  if (fetchOptions.headers) {
    const customHeaders = new Headers(fetchOptions.headers as HeadersInit);
    customHeaders.forEach((value, key) => {
      fetchHeaders.set(key, value);
    });
  }

  let fetchResponse: Response;

  if (process.env.NODE_ENV === "development") {
    fetchResponse = await fetch(`http://localhost:8787${path}`, {
      ...fetchOptions,
      headers: fetchHeaders,
    });
  } else {
    // 🎯 ম্যাজিক লজিক: আমরা কি Cloudflare-এর রিয়েল রানটাইমে আছি নাকি Next.js বিল্ড টাইমে?
    const isCloudflareWorker =
      typeof navigator !== "undefined" &&
      navigator.userAgent === "Cloudflare-Workers";

    if (isCloudflareWorker) {
      try {
        const { env } = await getCloudflareContext({ async: true });
        fetchResponse = await env.HONO_API.fetch(
          new Request(`https://hono-api${path}`, {
            ...fetchOptions,
            headers: fetchHeaders,
          }),
        );
      } catch (error) {
        // বাইন্ডিং কোনো কারণে কাজ না করলে ফলব্যাক
        fetchResponse = await fetch(`https://festapi.jnuits.org.bd${path}`, {
          ...fetchOptions,
          headers: fetchHeaders,
        });
      }
    } else {
      // 🛑 Next.js Build Time: এখানে Cloudflare বাইন্ডিং থাকে না।
      // তাই getCloudflareContext কল না করে সরাসরি পাবলিক API-তে fetch করা হচ্ছে যাতে বিল্ড ক্র্যাশ না করে।
      fetchResponse = await fetch(`https://festapi.jnuits.org.bd${path}`, {
        ...fetchOptions,
        headers: fetchHeaders,
      });
    }
  }

  if (fetchResponse.status >= 400 && fetchResponse.status !== 401) {
    return { status: fetchResponse.status, response: null };
  }

  try {
    const result = (await fetchResponse.json()) as T;
    return { status: fetchResponse.status, response: result };
  } catch (error) {
    return { status: fetchResponse.status, response: null };
  }
};
