export async function uploadImage(file: File, folder = "events") {
  console.log("Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = (await res.json()) as {
    secure_url: string;
    error?: {
      message: string;
    };
  };

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
}
