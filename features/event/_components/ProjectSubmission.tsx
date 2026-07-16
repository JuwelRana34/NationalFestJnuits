"use client";

import { useState } from "react";
import { FormField } from "../types";

interface Props {
  registrationId: string;
  eventId: string;
  submissionSchema: FormField[];
}

export default function DynamicSubmissionForm({
  registrationId,
  eventId,
  submissionSchema,
}: Props) {
  // টেক্সট এবং ফাইলের জন্য আলাদা স্টেট
  const [textData, setTextData] = useState<Record<string, string>>({});
  const [fileData, setFileData] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ফাইলের জন্য FormData তৈরি করা হচ্ছে
      const submitFormData = new FormData();
      submitFormData.append("registrationId", registrationId);
      submitFormData.append("eventId", eventId);

      // টেক্সট ডেটাগুলোকে JSON স্ট্রিং হিসেবে যুক্ত করা
      submitFormData.append("submissionData", JSON.stringify(textData));

      // ফাইলগুলোকে FormData তে যুক্ত করা (backend এ R2 তে আপলোড করার জন্য)
      Object.entries(fileData).forEach(([key, file]) => {
        submitFormData.append(key, file);
      });

      console.log("Submitting Project Data (FormData prepared)");
      for (const [key, value] of submitFormData.entries()) {
        console.log(`${key}:`, value);
      }

      // API Call Example:
      // await fetch('/api/submissions', { method: 'POST', body: submitFormData });

      // ডেমো ডিলে
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Project Submitted Successfully! Best of Luck!");
    } catch (error) {
      alert("Submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
      setFileData((prev) => ({ ...prev, [id]: file }));
    } else {
      const updated = { ...fileData };
      delete updated[id];
      setFileData(updated);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto my-10">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Project Submission
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Complete your project submission by providing the required details
        below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {submissionSchema.map((field) => (
          <div key={field.id} className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "file" ? (
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  required={field.required}
                  onChange={(e) =>
                    handleFileChange(field.id, e.target.files?.[0] || null)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                />
              </div>
            ) : field.type === "text" ? (
              <textarea
                required={field.required}
                rows={3}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                onChange={(e) =>
                  setTextData({ ...textData, [field.id]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={`e.g. https://...`}
                onChange={(e) =>
                  setTextData({ ...textData, [field.id]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
              Uploading...
            </>
          ) : (
            "Submit Project"
          )}
        </button>
      </form>
    </div>
  );
}
