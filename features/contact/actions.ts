 "use server";

import { contactFormSchema, ContactFormValues } from "./schema";

export async function submitContactForm(data: ContactFormValues) {
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // TODO: Add email sending logic here

  return {
    success: true,
    message: "Message sent successfully!",
  };
}