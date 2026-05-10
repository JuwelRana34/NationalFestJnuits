"use server";

import { getDb, getDbAsync } from "@/core/db/db";
import { segment } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag, revalidateTag } from "next/cache";
import { CreateSegmentParams } from "./Types";

export async function createSegment(data: CreateSegmentParams) {
  try {
    const db = getDb();

    const newSegment = await db
      .insert(segment)
      .values({
        id: crypto.randomUUID(),
        title: data.title,
        subtitle: data.subtitle || null,
        type: data.type || null,
        description: data.description,
        image: data.image || null,
        date: data.date || null,
        time: data.time || null,
        venue: data.venue || null,
        seatsTotal: data.seatsTotal || 0,
        seatsFilled: data.seatsFilled || 0,
        responsible: data.responsible || null,
        isTeamEvent: data.isTeamEvent,
        minMembers: data.minMembers || null,
        maxMembers: data.maxMembers || null,
        prizeMoney: data.prizeMoney || null,
        fee: data.fee || null,
        // createdAt এবং updatedAt স্কিমা থেকেই অটোমেটিকভাবে অ্যাড হবে
      })
      .returning();
    revalidateTag("segments", "max");
    return { success: true, data: newSegment[0] };
  } catch (error) {
    console.error("Segment creation failed:", error);
    return { success: false, error: "Failed to create segment" };
  }
}

export async function getSegment() {
  "use cache";
  cacheTag("segments");
  try {
    const db = await getDbAsync();

    const newSegment = await db.select().from(segment);

    return { success: true, data: newSegment };
  } catch (error) {
    console.error("Segment creation failed:", error);
    return { success: false, data: [], error: "Failed to create segment" };
  }
}


export async function getSegmentById(id: string) {
  "use cache";
  cacheTag(`segment-${id}`);
  try {
    const db = getDb();

    const [segmentData] = await db
      .select()
      .from(segment)
      .where(eq(segment.id, id))
      .limit(1);

    return { success: true, data: segmentData };
  } catch (error) {
    console.error("Segment retrieval failed:", error);
    return { success: false, data: [], error: "Failed to retrieve segment" };
  }
}


// export async function updateSegment(id: string, data: Partial<CreateSegmentParams>) {
//   try {
//     const db = getDb();

//     const [updatedSegment] = await db
//       .update(segment)
//       .set({
//         title: data.title,
//         subtitle: data.subtitle || null,
//         type: data.type || null,
//         description: data.description,
//         image: data.image || null,
//         date: data.date || null,
//         time: data.time || null,
//         venue: data.venue || null,
//         seatsTotal: data.seatsTotal || 0,
//         seatsFilled: data.seatsFilled || 0,
//         responsible: data.responsible || null,
//         isTeamEvent: data.isTeamEvent,
//         minMembers: data.minMembers || null,
//         maxMembers: data.maxMembers || null,
//         prizeMoney: data.prizeMoney || null,
//         fee: data.fee || null,
//       })
//       .where(eq(segment.id, id))
//       .returning();

//     revalidateTag(`segment-${id}`, "max");
//     revalidateTag("segments", "max");

//     return { success: true, data: updatedSegment };
//   } catch (error) {
//     console.error("Segment update failed:", error);
//     return { success: false, error: "Failed to update segment" };
//   }
// }

export async function deleteSegment(id: string) {
  try {
    const db = getDb();

    await db.delete(segment).where(eq(segment.id, id));

    // revalidateTag(`segment-${id}`, "max");
    // revalidateTag("segments", "max");

    return { success: true };
  } catch (error) {
    console.error("Segment deletion failed:", error);
    return { success: false, error: "Failed to delete segment" };
  }
}