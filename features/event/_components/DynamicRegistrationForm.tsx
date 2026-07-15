// components/DynamicRegistrationForm.tsx
"use client";

import { useState } from "react";
import { FormField } from "../types";
import Image from "next/image";

interface Props {
  eventId: string;
  schema: FormField[];
}

export default function DynamicRegistrationForm({ eventId, schema }: Props) {
  // ইউজারের ইনপুট ধরে রাখার জন্য ডায়নামিক স্টেট
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image preview state
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {},
  );

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // File handler
  const handleFileChange = (fieldId: string, file: File | null) => {
    if (!file) return;

    handleChange(fieldId, file.name);

    const previewUrl = URL.createObjectURL(file);

    setImagePreviews((prev) => ({
      ...prev,
      [fieldId]: previewUrl,
    }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting to DB:", {
        eventId,
        customResponses: formData,
      });

      alert("Registration Successful!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
        Event Registration
      </h2>

      <div className="space-y-4">
        {schema.map((field) => (
          <div key={field.id} className="flex flex-col space-y-1.5">
            <label
              htmlFor={field.id}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "select" ? (
              <select
                id={field.id}
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="" disabled>
                  Select an option
                </option>

                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <>
                <input
                  type="file"
                  id={field.id}
                  required={field.required}
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(field.id, e.target.files?.[0] || null)
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {imagePreviews[field.id] && (
                  <Image
                  width={500}
                    height={700}
                    src={imagePreviews[field.id]}
                    alt={`${field.label} preview`}
                    className="mt-3 h-64 w-full rounded-lg border object-cover"
                  />
                )}
              </>
            ) : (
              <input
                type={field.type}
                id={field.id}
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Register Now"}
      </button>
    </form>
  );
}
