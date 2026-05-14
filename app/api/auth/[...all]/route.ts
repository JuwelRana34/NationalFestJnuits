// import { getCloudflareContext } from "@opennextjs/cloudflare";
// import { NextRequest } from "next/server";

// async function proxyToHono(req: NextRequest) {
//   const { env } = getCloudflareContext();

//   const url = new URL(req.url);

//   // Hono Service Binding-এর জন্য டামি URL (বা আপনার Hono-এর URL) বানাচ্ছি
//   // pathname হবে /api/auth/sign-in ইত্যাদি
//   const targetUrl = `https://hono-api${url.pathname}${url.search}`;

//   // Service Binding-এ রিকোয়েস্ট ফরওয়ার্ড করা
//   const response = await env.HONO_API.fetch(
//     new Request(targetUrl, {
//       method: req.method,
//       headers: req.headers, // ব্রাউজারের হেডারগুলো Hono-কে দিচ্ছি
//       body: req.body,
//       // Duplex stream error এড়াতে (Next.js 15+ এর জন্য)
//       // @ts-ignor
//       duplex: "half",
//     }),
//   );

//   // Hono থেকে যে রেসপন্স (এবং কুকি) আসলো, সেটা হুবহু ব্রাউজারকে ফেরত দিচ্ছি!
//   return response;
// }

// export const GET = proxyToHono;
// export const POST = proxyToHono;
