"use server";

import { getDb } from "@/core/db/db";
import { registration, team, teamMember } from "@/core/db/schema";
import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { eq } from "drizzle-orm";


interface TeamMemberInput {
  name: string;
  phone: string;
  institution?: string;
  department?: string;
  studentIdScan?: string;
}

interface RegistrationData {
  segmentId: string;
  isTeamEvent: boolean;
  ambassadorCode?: string;
  teamName?: string;
  couponId?: string;
  category: "UNIVERSITY" | "SCHOOL_COLLEGE";
  // Leader info
  leaderStudentIdScan?: string;
  // Team members (excluding leader)
  teamMembers?: TeamMemberInput[];
  // Segment-specific metadata (WPM, IGN, links, etc.)
  metadata?: Record<string, unknown>;
 
}

export async function createRegistration(
  data: RegistrationData,
  userId: string,
  leaderInfo: {
    name: string;
    phone: string;
    institution?: string;
    department?: string;
  },
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

    // Leader কে teamMember এ insert করো
    await db.insert(teamMember).values({
      id: crypto.randomUUID(),
      teamId: teamIdToSave!,
      userId: userId,
      name: leaderInfo.name,
      phone: leaderInfo.phone,
      institution: leaderInfo.institution || undefined,
      department: leaderInfo.department || undefined,
      studentIdScan: data.leaderStudentIdScan || "",
      isLeader: true,
    });

    // বাকি members insert করো
    if (data.teamMembers && data.teamMembers.length > 0) {
      await db.insert(teamMember).values(
        data.teamMembers.map((m) => ({
          id: crypto.randomUUID(),
          teamId: teamIdToSave!,
          userId: null,
          name: m.name,
          phone: m.phone,
          institution: m.institution || undefined,
          department: m.department || undefined,
          studentIdScan: m.studentIdScan || "",
          isLeader: false,
        })),
      );
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