"use server";

import { getDb } from "@/core/db/db";
import { registration, team } from "@/core/db/schema";
import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { eq } from "drizzle-orm";


interface RegistrationData {
  segmentId: string;
  isTeamEvent: boolean;
  ambassadorCode?: string;
  teamName?: string;
  couponId?: string;
  category: "UNIVERSITY" | "SCHOOL_COLLEGE";
  metadata?: {
    name: string;
    email: string;
    phone: string;
    institution?: string; 
  }[];
}

export async function createRegistration(
  data: RegistrationData,
  userId: string,
) {
  try {
    const db = getDb();
    let teamIdToSave: string | null = null;


    if (data.isTeamEvent) {

      if (!data.teamName) {
        throw new Error("Team name is required for team events.");
      }


      teamIdToSave = crypto.randomUUID();

      await db.insert(team).values({
        id: teamIdToSave,
        teamName: data.teamName,
        teamCode: generateUniqueCode("TEAM"),
        segmentId: data.segmentId,
        creatorId: userId,
      });
    }

    // ২. রেজিস্ট্রেশন টেবিলে ডেটা ইনসার্ট করা
    const newRegistration = await db
      .insert(registration)
      .values({
        id: crypto.randomUUID(),
        trackingNumber: generateUniqueCode("TRK"),
        segmentId: data.segmentId,
        userId: userId,
        teamId: teamIdToSave,
        ambassadorCode: data.ambassadorCode || null,
        couponId: data.couponId || null,
        category: data.category,
        metadata: data.metadata || null,
        selectionStatus: "PENDING",
      })
      .returning();

    return { success: true, data: newRegistration[0] };
  } catch (error) {
    console.error("Registration creation failed:", error);
    return { success: false, error: "Failed to create registration" };
  }
}

export async function getRegistrationById(userId: string){
  const db = getDb();
  const registrationData = await db.query.registration.findMany({
    where: eq(registration.userId, userId),
    with: {
      team: true,
      segment: true,
    },
  });

  return registrationData;
}