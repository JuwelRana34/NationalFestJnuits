"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function uploadImage(
  file: File,
  folder = "events",
): Promise<string> {
  const { env } = getCloudflareContext();

  console.log(env.CLOUDINARY_CLOUD_NAME);
  console.log(env.CLOUDINARY_UPLOAD_PRESET);
  console.log(env.CLOUDINARY_API_KEY);
  console.log(env.CLOUDINARY_API_SECRET);
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = (await res.json()) as {
    secure_url: string;
  };

  return data.secure_url;
}

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

    
    const cloudName = env.CLOUDINARY_CLOUD_NAME;
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