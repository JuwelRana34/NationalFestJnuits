// "use client";

// import { useState } from "react";
// import { FormField } from "../types";
// import { honoFetch } from "@/lib/hono-client";
// import { uploadImage } from "@/lib/cloudinaryUpload";

// interface Props {
//   registrationId: string;
//   eventId: string;
//   submissionSchema: FormField[];
// }

// export default function DynamicSubmissionForm({
//   registrationId,
//   eventId,
//   submissionSchema,
// }: Props) {
//   // টেক্সট এবং ফাইলের জন্য আলাদা স্টেট
//   const [textData, setTextData] = useState<Record<string, string>>({});
//   const [fileData, setFileData] = useState<Record<string, File>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // ফাইলের জন্য FormData তৈরি করা হচ্ছে
//       const submitFormData = new FormData();
//       submitFormData.append("registrationId", registrationId);
//       submitFormData.append("eventId", eventId);

//       // টেক্সট ডেটাগুলোকে JSON স্ট্রিং হিসেবে যুক্ত করা
//       submitFormData.append("submissionData", JSON.stringify(textData));

//       // ফাইলগুলোকে FormData তে যুক্ত করা (backend এ R2 তে আপলোড করার জন্য)
//       Object.entries(fileData).forEach(([key, file]) => {
//         submitFormData.append(key, file);
//       });

//     await uploadImage()

//       console.log("Submitting Project Data (FormData prepared)");
//       for (const [key, value] of submitFormData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       // API Call Example:
//       const { status, response } = honoFetch(`/api/registrations/submission/${registrationId}`, {
//         body: submitFormData,
//         method: "POST",
//       });

//       if (status !== 200) {
//         console.error("Submission failed:", response);
//         throw new Error("Submission failed");
//       }

//       console.log("Submission successful:", response.message);

//       // ডেমো ডিলে
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       alert("Project Submitted Successfully! Best of Luck!");
//     } catch (error) {
//       alert("Submission failed!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFileChange = (id: string, file: File | null) => {
//     if (file) {
//       setFileData((prev) => ({ ...prev, [id]: file }));
//     } else {
//       const updated = { ...fileData };
//       delete updated[id];
//       setFileData(updated);
//     }
//   };

//   return (
//     <div className="bg-slate-800 p-6 rounded-xl border border-slate-800 shadow-sm max-w-2xl mx-auto my-10">
//       <h3 className="text-xl font-bold text-slate-300 mb-2">
//         Project Submission
//       </h3>
//       <p className="text-sm text-gray-500 mb-6">
//         Complete your project submission by providing the required details
//         below.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {submissionSchema.map((field) => (
//           <div key={field.id} className="flex flex-col space-y-1">
//             <label className="text-sm font-semibold text-slate-300">
//               {field.label}{" "}
//               {field.required && <span className="text-red-500">*</span>}
//             </label>
//             {/* 💡 নতুন: Description দেখানোর অংশ */}
//             {field.description && (
//               <p className="text-xs text-slate-400/80 -mt-0.5 mb-1.5">
//                 {field.description}
//               </p>
//             )}

//             {field.type === "file" ? (
//               <div className="flex items-center gap-3">
//                 <input
//                   type="file"
//                   required={field.required}
//                   onChange={(e) =>
//                     handleFileChange(field.id, e.target.files?.[0] || null)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
//                 />
//               </div>
//             ) : field.type === "text" ? (
//               <textarea
//                 required={field.required}
//                 rows={3}
//                 placeholder={`Enter your ${field.label.toLowerCase()}`}
//                 onChange={(e) =>
//                   setTextData({ ...textData, [field.id]: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             ) : (
//               <input
//                 type={field.type}
//                 required={field.required}
//                 placeholder={`e.g. https://...`}
//                 onChange={(e) =>
//                   setTextData({ ...textData, [field.id]: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg mt-6 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
//         >
//           {isSubmitting ? (
//             <>
//               <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
//               Uploading...
//             </>
//           ) : (
//             "Submit Project"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FormField } from "../types";
import { honoFetch } from "@/lib/hono-client";
import { uploadImage } from "@/lib/cloudinaryUpload";
import { toast } from "sonner";

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
  // টেক্সট এবং ফাইলের জন্য আলাদা স্টেট
  const [textData, setTextData] = useState<Record<string, string>>({});
  const [fileData, setFileData] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ১. টেক্সট ডেটার একটি কপি তৈরি করা হলো
      const finalSubmissionData = { ...textData };

      // ২. ফাইলগুলো Cloudinary-তে আপলোড করা
      const fileKeys = Object.keys(fileData);
      if (fileKeys.length > 0) {
        for (const key of fileKeys) {
          const file = fileData[key];
          try {
            // ফাইল আপলোড করে URL নেওয়া হচ্ছে
            const uploadedUrl = await uploadImage(file, "submissionsItfest");

            // আপলোড সফল হলে URL টি finalSubmissionData তে সেভ করা হলো
            finalSubmissionData[key] = uploadedUrl;
          } catch (uploadError) {
            console.error(`Failed to upload ${file.name}`, uploadError);
            alert(`Failed to upload file: ${file.name}`);
            setIsSubmitting(false);
            return; // আপলোড ফেইল হলে ফর্ম সাবমিশন এখানেই বন্ধ হয়ে যাবে
          }
        }
      }

      console.log("Final Data Ready to Send:", finalSubmissionData);

      // ৩. ব্যাকএন্ডে পাঠানোর জন্য পে-লোড তৈরি (JSON)
      const payload = {
        submissionData: finalSubmissionData,
      };

      // ৪. API কল (অবশ্যই await এবং ডায়নামিক URL ব্যবহার করতে হবে)
      const { status, response } = await honoFetch< { message: string } >(
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

      console.log("Submission successful:", response);
      alert("Project Submitted Successfully! Best of Luck!");
    } catch (error) {
      console.error(error);
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
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-800 shadow-sm max-w-2xl mx-auto my-10">
      <h3 className="text-xl font-bold text-slate-300 mb-2">
        Project Submission
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Complete your project submission by providing the required details
        below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  required={field.required}
                  onChange={(e) =>
                    handleFileChange(field.id, e.target.files?.[0] || null)
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all text-slate-300 bg-slate-900"
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
                className="w-full px-4 py-2 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300 bg-slate-900"
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={`e.g. https://...`}
                onChange={(e) =>
                  setTextData({ ...textData, [field.id]: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300 bg-slate-900"
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