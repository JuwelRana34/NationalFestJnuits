import { cookies } from "next/headers";

export async function getFormattedCookies(): Promise<string> {
  try {
    const cookieStore = await cookies();

    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    return cookieString;
  } catch (error) {
    console.error("Error formatting cookies:", error);
    return "";
  }
}
