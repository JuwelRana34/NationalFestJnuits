export type FieldType = "text" | "number" | "url" | "select" | "file";

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
  coverImage: string;
  slug: string;
  title: string;
  eventType: string;
  description: string;
  fee: number;
  deadline: string;
  eventDate: string;
  venue: string;
  schemaFields: FormField[];
};

export type FormValues = Omit<GetEventValues, "id" | "slug"> & {
  schemaFields: FormFieldInput[];
};
