export type FieldType = "text" | "number" | "url" | "select" | "file";

export type EventType = "solo" | "team" | "seminar";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

// React Hook Form-এর জন্য
export interface FormFieldInput {
  label: string;
  type: FieldType;
  required: boolean;
  options: string;
}

export interface ResponsiblePerson {
  name: string;
  phone: string;
}

/**
 * Database / API Event Model
 */
export interface GetEventValues {
  id: string;

  title: string;
  slug: string;
  subtitle?: string | null;

  eventType: EventType;

  description: string;

  coverImage: string | null;

  eventDate: string;
  deadline: string;
  time?: string | null;
  venue: string;

  fee: number;

  baseTeamSize: number;
  maxExtraMembers: number;
  extraMemberFee: number;

  prizeMoney: number;

  registrationSchema: FormField[];

  isSubmissionOpen: boolean;
  submissionSchema: FormField[];

  responsible: ResponsiblePerson[];

  isActive: boolean;

  registrationCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create / Update Form Values
 */
export interface FormValues {
  title: string;
  subtitle: string;

  eventType: EventType;

  description: string;

  coverImage: FileList | null;

  eventDate: string;
  deadline: string;
  time: string;
  venue: string;

  fee: number;

  baseTeamSize: number;
  maxExtraMembers: number;
  extraMemberFee: number;

  prizeMoney: number;

  registrationSchema: FormFieldInput[];

  isSubmissionOpen: boolean;
  submissionSchema: FormFieldInput[];

  responsible: ResponsiblePerson[];

  isActive: boolean;
}
