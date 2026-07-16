import EventForm from "@/features/event/_components/CreateEventForm";

import { Suspense } from "react";
// import { db } from "@/db";
// import { event } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  // ==========================================
  // ১. ডেটাবেস কোড (আপাতত কমেন্ট করা আছে)
  // ==========================================
  /*
  const eventData = await db.query.event.findFirst({
    where: eq(event.id, params.id),
  });

  if (!eventData) {
    notFound();
  }
  */

  // ==========================================
  // ২. ডেমো ডেটা (টেস্টিংয়ের জন্য)
  // ==========================================
  // ডেমো ডেটাটি এমনভাবে সাজানো হয়েছে যেন এটি DB থেকে আসা ডেটার মতোই কাজ করে
  const demoEventData = {
    id: params.id, // URL থেকে পাওয়া ID
    title: "National AI & IT Summit 2026 - Hackathon",
    eventType: "team",
    description:
      "Join the biggest hackathon of the year and build the future of AI. Show your skills and win exciting prizes!",
    fee: 500,
    baseTeamSize: 3,
    maxExtraMembers: 2,
    extraMemberFee: 200,
    deadline: "2026-08-10T23:59", // datetime-local ফরম্যাট
    eventDate: "2026-08-15T09:00",
    venue: "Jagannath University Central Auditorium",
    isActive: true,
    coverImageUrl:
      "https://placehold.co/800x400/indigo/white?text=Hackathon+2026", // ডেমো কভার ইমেজ

    // Organizers
    responsible: [
      { name: "Md. Juwel Rana", phone: "017XXXXXXXX" },
      { name: "Tareq Hasan", phone: "018XXXXXXXX" },
    ],

    // Registration Form Schema
    schemaFields: [
      { label: "University Name", type: "text", required: true, options: "" },
      { label: "Department", type: "text", required: true, options: "" },
      {
        label: "T-Shirt Size",
        type: "select",
        required: true,
        options: "S, M, L, XL, XXL",
      },
    ],

    // Submission Schema (Project Submit)
    isSubmissionRequired: true,
    submissionSchema: [
      {
        label: "GitHub Repository URL",
        type: "url",
        required: true,
        options: "",
      },
      { label: "Pitch Deck (PDF)", type: "file", required: true, options: "" },
    ],
  };

  // DB ডেটা বা ডেমো ডেটাকে ফর্মের ফরমেটে কনভার্ট করা (এখানে আমরা ডেমো ডেটা ব্যবহার করছি)
  const initialData = {
    id: demoEventData.id,
    title: demoEventData.title,
    eventType: demoEventData.eventType,
    description: demoEventData.description,
    fee: demoEventData.fee,
    baseTeamSize: demoEventData.baseTeamSize,
    maxExtraMembers: demoEventData.maxExtraMembers,
    extraMemberFee: demoEventData.extraMemberFee,
    deadline: demoEventData.deadline,
    eventDate: demoEventData.eventDate,
    venue: demoEventData.venue,
    isActive: demoEventData.isActive,
    coverImageUrl: demoEventData.coverImageUrl,
    // JSON ডেটাগুলো ডাইরেক্ট দেওয়া হলো কারণ ডেমো ডেটায় এগুলো আগে থেকেই অবজেক্ট আকারে আছে
    responsible: demoEventData.responsible as { name: string; phone: string }[],
    schemaFields: demoEventData.schemaFields as {
      label: string;
      type: "text" | "number" | "url" | "select" | "file";
      required: boolean;
      options: string;
    }[],
    isSubmissionRequired: demoEventData.isSubmissionRequired,
    submissionSchema: demoEventData.submissionSchema as {
      label: string;
      type: "text" | "number" | "url" | "select" | "file";
      required: boolean;
      options: string;
    }[],
  };

  return (
    <Suspense fallback={<EventFormSkeleton />}>
      {/* ডেমো initialData ফর্মে পাস করা হচ্ছে */}
      <EventForm initialData={initialData} />
    </Suspense>
  );
}

// স্কেলিটন কম্পোনেন্ট (যদি আগে থেকে বানানো না থাকে)
function EventFormSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto border rounded p-6 bg-white my-10 animate-pulse">
      <div className="h-8 w-64 rounded bg-gray-200 mb-6" />
      <div className="space-y-4">
        <div className="h-40 rounded-lg bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 rounded bg-gray-100" />
          <div className="h-10 rounded bg-gray-100" />
        </div>
        <div className="h-24 rounded bg-gray-100" />
      </div>
    </div>
  );
}
