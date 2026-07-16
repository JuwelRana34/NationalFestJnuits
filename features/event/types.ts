export type FieldType = "text" | "number" | "url" | "select" | "file";

// ইভেন্টের টাইপ নির্দিষ্ট করে দেওয়া হলো
export type EventType = "solo" | "team" | "seminar";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

// Create/Edit form-এর জন্য
export type FormFieldInput = Omit<FormField, "id">;

export type GetEventValues = {
  id: string;
  coverImage: string; // ডেটাবেস থেকে আসার সময় এটি ছবির URL (string)
  isActive: boolean;
  slug: string;
  title: string;
  eventType: EventType; // string এর বদলে নির্দিষ্ট টাইপ দেওয়া হলো
  description: string;
  fee: number;

  // টিম ইভেন্টের জন্য নতুন ফিল্ডসমূহ
  baseTeamSize: number;
  maxExtraMembers: number;
  extraMemberFee: number;

  deadline: string;
  eventDate: string;
  venue: string;
  registrationSchema: FormField[];
};

// ফর্মের জন্য টাইপ
export type FormValues = Omit<GetEventValues, "id" | "slug" | "coverImage"> & {
  coverImage: FileList | null; // ফর্মে যেহেতু ফাইল আপলোড হবে, তাই টাইপ FileList করা হলো
  registrationSchema: FormFieldInput[];
};
