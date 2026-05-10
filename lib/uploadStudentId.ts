"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function uploadStudentId(file: File): Promise<string> {
  const { env } = getCloudflareContext();

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET;

  console.log("cloudName:", cloudName);
  console.log("uploadPreset:", uploadPreset);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "student-ids");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  const responseText = await res.text();
  if (!res.ok)
    throw new Error(`Cloudinary error ${res.status}: ${responseText}`);

  const data = JSON.parse(responseText) as { secure_url?: string };
  if (!data?.secure_url) throw new Error("missing secure_url");

  return data.secure_url;
}
