"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";


function getPublicIdFromUrl(url: string) {
  
  const parts = url.split("/");
  const fileWithExtension = parts.pop(); // abcde123.jpg
  const folder = parts.pop(); // events
  const fileName = fileWithExtension?.split(".")[0]; // abcde123

  return `${folder}/${fileName}`;
}

export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    const { env } = getCloudflareContext();
    const publicId = getPublicIdFromUrl(imageUrl);

    
    const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Basic Authentication
          Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
        },
        body: JSON.stringify({
          public_id: publicId,
        }),
      },
    );

    if (!res.ok) {
      console.error("Failed to delete old image from Cloudinary");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false; // ছবি ডিলিট না হলেও যেন মেইন প্রসেস ক্র্যাশ না করে
  }
}