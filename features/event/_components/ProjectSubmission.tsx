"use client";

import { useState } from "react";
import { FormField } from "../types";
import { honoFetch } from "@/lib/hono-client";
import { uploadImage } from "@/lib/cloudinaryUpload";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  trackingNumber: string;
  eventId: string;
  submissionSchema: FormField[];
}

export default function DynamicSubmissionForm({
  trackingNumber,
  eventId,
  submissionSchema,
}: Props) {
  const [textData, setTextData] = useState<Record<string, string>>({});
  const [fileData, setFileData] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
      setFileData((prev) => ({ ...prev, [id]: file }));
      if (formErrors[id]) {
        setFormErrors((prev) => ({ ...prev, [id]: "" }));
      }
    } else {
      const updated = { ...fileData };
      delete updated[id];
      setFileData(updated);
    }
  };

  const handleTextChange = (id: string, value: string) => {
    setTextData((prev) => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    let hasError = false;
    const newErrors: Record<string, string> = {};

    // ==========================================
    // 💡 ১. Zod Validation (Dynamic Fields)
    // ==========================================
    const dynamicShape: Record<string, z.ZodTypeAny> = {};

    submissionSchema.forEach((field) => {
      if (field.type !== "file") {
        let stringValidator = z.string({
          message: `Invalid input for ${field.label}`,
        });

        // Type Specific Validations
        if (field.type === "email") {
          stringValidator = z
            .string()
            .email(`Please enter a valid email address for ${field.label}`);
        } else if (field.type === "url") {
          stringValidator = z
            .string()
            .url(
              `Please enter a valid URL for ${field.label} (e.g. https://...)`,
            );
        } else if (field.type === "number") {
          stringValidator = z
            .string()
            .regex(/^\d+$/, `Only numbers are allowed for ${field.label}`);
        } else if (field.type === "tel") {
          stringValidator = z
            .string()
            .regex(
              /^(?:\+88|88)?(01[3-9]\d{8})$/,
              `Valid phone number required for ${field.label}`,
            );
        } else if (field.type === "date") {
          stringValidator = z
            .string()
            .regex(
              /^\d{4}-\d{2}-\d{2}$/,
              `Valid date required for ${field.label}`,
            );
        }

        // Required Check with Trim
        if (field.required) {
          dynamicShape[field.id] = stringValidator
            .trim()
            .min(1, `${field.label} is required`);
        } else {
          dynamicShape[field.id] = z.union([
            stringValidator,
            z.literal(""),
            z.undefined(),
          ]);
        }
      } else if (field.required && !fileData[field.id]) {
        // ম্যানুয়ালি ফাইল রিকয়ারমেন্ট চেক
        hasError = true;
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    const dynamicSchema = z.object(dynamicShape);
    const dataToValidate = { ...textData };
    submissionSchema.forEach((field) => {
      if (field.type !== "file" && dataToValidate[field.id] === undefined) {
        dataToValidate[field.id] = "";
      }
    });

    const dynamicResult = dynamicSchema.safeParse(dataToValidate);

    if (!dynamicResult.success) {
      hasError = true;
      dynamicResult.error.issues.forEach((err) => {
        const pathKey = err.path[0];
        if (typeof pathKey === "string" || typeof pathKey === "number") {
          newErrors[String(pathKey)] = err.message;
        }
      });
    }

    if (hasError) {
      setFormErrors(newErrors);
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    // ==========================================
    // 💡 ২. Data Submission
    // ==========================================
    setIsSubmitting(true);

    try {
      const finalSubmissionData = { ...textData };
      const fileKeys = Object.keys(fileData);

      if (fileKeys.length > 0) {
        for (const key of fileKeys) {
          const file = fileData[key];
          try {
            const uploadedUrl = await uploadImage(file, "submissionsItfest");
            finalSubmissionData[key] = uploadedUrl;
          } catch (uploadError) {
            console.error(`Failed to upload ${file.name}`, uploadError);
            toast.error(`Failed to upload file: ${file.name}`);
            setIsSubmitting(false);
            return;
          }
        }
      }

      const payload = {
        submissionData: finalSubmissionData,
      };

      const { status, response } = await honoFetch<{ message: string }>(
        `/api/registrations/submission/${trackingNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (status !== 200) {
        console.error("Submission failed:", response);
        toast.error(response?.message || "Submission failed!");
        throw new Error("Submission failed from server");
      }

      toast.success("Project Submitted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-800 shadow-sm max-w-2xl mx-auto my-10">
      <h3 className="text-xl font-bold text-slate-300 mb-2">
        Project Submission
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Complete your project submission by providing the required details
        below.
      </p>

      {/* 💡 form এ noValidate যোগ করা হয়েছে যাতে ডিফল্ট ব্রাউজার টুলটিপ না দেখায় */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {submissionSchema.map((field) => (
          <div key={field.id} className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-300">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-xs text-slate-400/80 -mt-0.5 mb-1.5">
                {field.description}
              </p>
            )}

            {field.type === "file" ? (
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(field.id, e.target.files?.[0] || null)
                  }
                  className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-slate-300 bg-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                    formErrors[field.id]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-600 focus:ring-blue-500"
                  }`}
                />
              </div>
            ) : field.type === "text" ? (
              <textarea
                rows={3}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={textData[field.id] || ""}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none text-slate-300 bg-slate-900 transition-all ${
                  formErrors[field.id]
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-600 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            ) : field.type === "select" ? (
              <select
                value={textData[field.id] || ""}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none text-slate-300 bg-slate-900 appearance-none transition-all ${
                  formErrors[field.id]
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-600 focus:ring-2 focus:ring-indigo-500"
                }`}
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
            ) : (
              <input
                type={field.type}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={textData[field.id] || ""}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg outline-none text-slate-300 bg-slate-900 transition-all ${
                  formErrors[field.id]
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-600 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            )}

            {/* 💡 এরর মেসেজ রেন্ডার */}
            {formErrors[field.id] && (
              <span className="text-xs text-red-500 mt-1">
                {formErrors[field.id]}
              </span>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg mt-6 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Uploading & Submitting...
            </>
          ) : (
            "Submit Project"
          )}
        </button>
      </form>
    </div>
  );
}
