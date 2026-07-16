"use client";

import { useState } from "react";
import { FormField } from "../types";
import Image from "next/image";

interface Props {
  eventId: string;
  schema: FormField[];
  fee: number; // Added fee to show in payment modal
}

export default function DynamicRegistrationForm({
  eventId,
  schema,
  fee,
}: Props) {
  // Modal & Step states
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [paymentData, setPaymentData] = useState({
    transactionId: "",
    senderNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {},
  );

  // হ্যান্ডলার: ডায়নামিক ফর্ম ফিল্ডের জন্য
  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  // হ্যান্ডলার: ফাইল/ইমেজ আপলোডের জন্য
  const handleFileChange = (fieldId: string, file: File | null) => {
    if (!file) return;
    handleChange(fieldId, file.name);
    const previewUrl = URL.createObjectURL(file);
    setImagePreviews((prev) => ({ ...prev, [fieldId]: previewUrl }));
  };

  // হ্যান্ডলার: স্টেপ ১ (রেজিস্ট্রেশন) সাবমিট করে স্টেপ ২ তে যাওয়া
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault(); // ব্রাউজারের ডিফল্ট ভ্যালিডেশন চেক করবে
    setStep(2);
  };

  // হ্যান্ডলার: ফাইনাল সাবমিশন (রেজিস্ট্রেশন ডেটা + পেমেন্ট ডেটা)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // দুই স্টেপের ডেটা একসাথে ব্যাকএন্ডে পাঠানোর জন্য পে-লোড
      const finalPayload = {
        eventId,
        personalInfo: formData,
        paymentInfo: fee > 0 ? paymentData : null, // ফি না থাকলে পেমেন্ট ডেটা null যাবে
      };

      console.log("Submitting to DB (Combined Data):", finalPayload);

      // API call placeholder...
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API delay

      alert("Registration Successful!");

      // Reset everything after success
      setIsOpen(false);
      setStep(1);
      setFormData({});
      setPaymentData({ transactionId: "", senderNumber: "" });
      setImagePreviews({});
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
      >
        Register Now
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
          {/* Modal Container */}
          <div className="relative mt-20 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-rose-400 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              {/* === STEP 1: REGISTRATION FORM === */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Registration Form
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Please fill out your details (Step 1 of 2)
                    </p>
                  </div>

                  <div className="space-y-5">
                    {schema.map((field) => (
                      <div key={field.id} className="flex flex-col space-y-1.5">
                        <label
                          htmlFor={field.id}
                          className="text-sm font-semibold text-gray-700"
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>

                        {field.type === "select" ? (
                          <select
                            id={field.id}
                            required={field.required}
                            value={formData[field.id] || ""}
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                          <div className="space-y-3">
                            <input
                              type="file"
                              id={field.id}
                              required={field.required}
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(
                                  field.id,
                                  e.target.files?.[0] || null,
                                )
                              }
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {imagePreviews[field.id] && (
                              <Image
                                width={500}
                                height={300}
                                src={imagePreviews[field.id]}
                                alt="preview"
                                className="h-48 w-full rounded-xl border object-cover shadow-sm"
                              />
                            )}
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            required={field.required}
                            value={formData[field.id] || ""}
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors mt-6"
                  >
                    Proceed to Payment →
                  </button>
                </form>
              )}

              {/* === STEP 2: PAYMENT FORM === */}
              {step === 2 && (
                <form
                  onSubmit={handleFinalSubmit}
                  className="space-y-6 text-center sm:text-left"
                >
                  <div className="border-b pb-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-medium text-blue-600 hover:underline mb-2 inline-block"
                    >
                      ← Back to Details
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Make Payment
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Scan QR and submit transaction details (Step 2 of 2)
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    {/* Placeholder for actual QR code */}
                    <div className="w-40 h-40 bg-white border p-2 rounded-lg shadow-sm mb-4 flex items-center justify-center">
                      {/* Replace src with your actual QR code image path */}
                      <Image
                        src="/qr-placeholder.png"
                        alt="bKash/Nagad QR"
                        width={300}
                        height={300}
                        className="opacity-80"
                      />
                    </div>
                    <p className="font-semibold text-lg text-gray-800">
                      Total Payable: ৳{fee}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      bKash / Nagad Personal: 017XXXXXXXX
                    </p>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">
                        Sender Phone Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.senderNumber}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            senderNumber: e.target.value,
                          })
                        }
                        placeholder="e.g. 017XXXXXXXX"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">
                        Transaction ID (TrxID){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.transactionId}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            transactionId: e.target.value,
                          })
                        }
                        placeholder="e.g. 8KDF39J2K"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 mt-6 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                      </>
                    ) : (
                      "Confirm Registration"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
