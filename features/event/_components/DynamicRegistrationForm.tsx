"use client";

import { submitEventRegistration } from "@/actions/registrationActions";
import { honoFetch } from "@/lib/hono-client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { FormField } from "../types";
import { uploadImage } from "@/lib/cloudinaryUpload";

interface Props {
  eventId: string;
  schema: FormField[];
  fee: number; // Base fee
  eventType?: string;
  baseTeamSize?: number;
  maxExtraMembers?: number;
  extraMemberFee?: number;
}

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  studentId: string;
}

export default function DynamicRegistrationForm({
  eventId,
  schema,
  fee,
  eventType = "solo",
  baseTeamSize = 0,
  maxExtraMembers = 0,
  extraMemberFee = 0,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [baseMembers, setBaseMembers] = useState<TeamMember[]>(
    Array.from({ length: eventType === "team" ? baseTeamSize : 0 }, () => ({
      name: "",
      email: "",
      phone: "",
      studentId: "",
    })),
  );

  const [extraMembers, setExtraMembers] = useState<TeamMember[]>([]);

  // Payment & Coupon states
  const [paymentData, setPaymentData] = useState({
    transactionId: "",
    senderNumber: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {},
  );
  // File upload state
  const [filesToUpload, setFilesToUpload] = useState<Record<string, File>>({});

  // ফি ক্যালকুলেশন
  const subTotal = fee + extraMembers.length * extraMemberFee;
  const totalPayable = Math.max(0, subTotal - discountAmount);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

const handleFileChange = (fieldId: string, file: File | null) => {
  if (!file) {
    const newFiles = { ...filesToUpload };
    delete newFiles[fieldId];
    setFilesToUpload(newFiles);
    return;
  }
  handleChange(fieldId, file.name);
  const previewUrl = URL.createObjectURL(file);
  setImagePreviews((prev) => ({ ...prev, [fieldId]: previewUrl }));

  setFilesToUpload((prev) => ({ ...prev, [fieldId]: file }));
};

  const handleBaseMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    const updated = [...baseMembers];
    updated[index][field] = value;
    setBaseMembers(updated);
  };

  const addExtraMember = () => {
    if (extraMembers.length < maxExtraMembers) {
      setExtraMembers([
        ...extraMembers,
        { name: "", email: "", phone: "", studentId: "" },
      ]);
    }
  };

  const removeExtraMember = (index: number) => {
    setExtraMembers(extraMembers.filter((_, i) => i !== index));
  };

  const handleExtraMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    const updated = [...extraMembers];
    updated[index][field] = value;
    setExtraMembers(updated);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // === কুপন অ্যাপ্লাই করার লজিক ===
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponStatus("loading");

    try {
      // API রেসপন্স অনুযায়ী টাইপ আপডেট করা হয়েছে
      const { status, response } = await honoFetch<{
        success: boolean;
        message: string;
        data?: {
          valid: boolean;
          discountPercentage: number;
        };
      }>(`/api/coupons/verify/${couponCode.toUpperCase().trim()}`);

      // ১. যদি স্ট্যাটাস ২০০ না হয়, অথবা success false হয়, অথবা data.valid false হয়
      if (status !== 200 || !response?.success || !response?.data?.valid) {
        setCouponStatus("error");
        setDiscountAmount(0);
        toast.error(response?.message || "Invalid or expired coupon code.");
        return;
      }

      // ২. যদি কুপন ভ্যালিড হয় (Success Case)
      // response.data.discountPercentage ব্যবহার করে ডিসকাউন্ট হিসাব করা হচ্ছে
      const discountPercentage = response.data.discountPercentage;
      const calculatedDiscount = (subTotal * discountPercentage) / 100;

      setDiscountAmount(calculatedDiscount);
      setCouponStatus("success");
      toast.success(response?.message || "Coupon applied successfully!");
    } catch (error) {
      setCouponStatus("error");
      setDiscountAmount(0);
      toast.error("Something went wrong while applying the coupon.");
    }
  };

  // const handleFinalSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // সব ডেটা `metadata` এর ভেতরে গোছানো হচ্ছে
  //     const finalPayload = {
  //       eventId,
  //       couponCode:
  //         couponStatus === "success" ? couponCode.toUpperCase() : null,
  //       metadata: {
  //         commonDetails: formData,
  //         teamInfo: eventType === "team" ? { baseMembers, extraMembers } : null,
  //       },
  //       paymentInfo:
  //         totalPayable > 0
  //           ? {
  //               ...paymentData,
  //               baseAmount: subTotal,
  //               paidAmount: totalPayable,
  //             }
  //           : null,
  //     };

  //     console.log("Final Payload to Submit via Server Action:", finalPayload);

  //     // 🎯 ডাইরেক্ট Hono API কল বাদ দিয়ে এখন সার্ভার অ্যাকশন কল করা হচ্ছে
  //     const result = await submitEventRegistration(finalPayload);

  //     if (!result.success) {
  //       toast.error(result.message);
  //       return;
  //     }

  //     toast.success(result.message);
  //     console.log("API Success Response:", result.data);

  //     // Reset Form State
  //     setIsOpen(false);
  //     setStep(1);
  //     setFormData({});
  //     setBaseMembers(
  //       Array.from({ length: eventType === "team" ? baseTeamSize : 0 }, () => ({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         studentId: "",
  //       })),
  //     );
  //     setExtraMembers([]);
  //     setPaymentData({ transactionId: "", senderNumber: "" });
  //     setImagePreviews({});
  //     setCouponCode("");
  //     setDiscountAmount(0);
  //     setCouponStatus("idle");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong!");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🚀 ১. ফাইল আপলোড প্রসেস
      const finalFormData = { ...formData }; // formData এর একটি কপি বানাচ্ছি

      const fileKeys = Object.keys(filesToUpload);
      if (fileKeys.length > 0) {
        toast.info("Uploading files, please wait...");

        for (const fieldId of fileKeys) {
          const file = filesToUpload[fieldId];
          try {
            // আপনার uploadImage ফাংশন কল করে ফাইল আপলোড করা হচ্ছে
            const uploadedUrl = await uploadImage(file, "event_registrations");
            finalFormData[fieldId] = uploadedUrl; // ফাইলের নামের বদলে Cloudinary URL বসিয়ে দিলাম
          } catch (uploadError) {
            toast.error(`Failed to upload ${file.name}.`);
            setIsSubmitting(false);
            return; // আপলোড ফেইল হলে ফর্ম সাবমিশন এখানেই বন্ধ হয়ে যাবে
          }
        }
      }

      // 🚀 ২. সব ডেটা `metadata` এর ভেতরে গোছানো হচ্ছে (finalFormData ব্যবহার করে)
      const finalPayload = {
        eventId,
        couponCode:
          couponStatus === "success" ? couponCode.toUpperCase() : null,
        metadata: {
          commonDetails: finalFormData, // 💡 এখানে URL সহ ডাটা যাচ্ছে
          teamInfo: eventType === "team" ? { baseMembers, extraMembers } : null,
        },
        paymentInfo:
          totalPayable > 0
            ? {
                ...paymentData,
                baseAmount: subTotal,
                paidAmount: totalPayable,
              }
            : null,
      };

      console.log("Final Payload to Submit via Server Action:", finalPayload);

      // 🎯 ৩. সার্ভার অ্যাকশন কল করা হচ্ছে
      const result = await submitEventRegistration(finalPayload);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      console.log("API Success Response:", result.data);

      // Reset Form State
      setIsOpen(false);
      setStep(1);
      setFormData({});
      setFilesToUpload({}); // 💡 ফাইল স্টেট ক্লিয়ার
      setBaseMembers(
        Array.from({ length: eventType === "team" ? baseTeamSize : 0 }, () => ({
          name: "",
          email: "",
          phone: "",
          studentId: "",
        })),
      );
      setExtraMembers([]);
      setPaymentData({ transactionId: "", senderNumber: "" });
      setImagePreviews({});
      setCouponCode("");
      setDiscountAmount(0);
      setCouponStatus("idle");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
      >
        Register Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative mt-20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl custom-scrollbar">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors z-10"
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
                <form onSubmit={handleStep1Submit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {eventType === "team"
                        ? "Team Registration"
                        : "Registration Form"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Please fill out your details (Step 1 of 2)
                    </p>
                  </div>

                  {/* 1. Common Team Details (From schemaFields) */}
                  <div className="space-y-5 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-2 mb-4">
                      {eventType === "team"
                        ? "General Team Information"
                        : "Basic Information"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {schema.map((field) => (
                        <div
                          key={field.id}
                          className="flex flex-col space-y-1.5"
                        >
                          <label
                            htmlFor={field.id}
                            className="text-sm font-semibold text-slate-300"
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-rose-500">*</span>
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
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
                            >
                              <option
                                value=""
                                disabled
                                className="text-slate-500"
                              >
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
                                accept="image/*,.pdf"
                                onChange={(e) =>
                                  handleFileChange(
                                    field.id,
                                    e.target.files?.[0] || null,
                                  )
                                }
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30 transition-colors"
                              />
                              {imagePreviews[field.id] && (
                                <Image
                                  width={500}
                                  height={300}
                                  src={imagePreviews[field.id]}
                                  alt="preview"
                                  className="h-40 w-full rounded-xl border border-slate-700 object-cover shadow-sm"
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
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Base Team Members */}
                  {eventType === "team" && baseTeamSize > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                        Team Members (Base Size: {baseTeamSize})
                      </h3>
                      {baseMembers.map((member, index) => (
                        <div
                          key={`base-${index}`}
                          className="p-5 bg-slate-800/50 border border-slate-700/50 shadow-sm rounded-xl relative"
                        >
                          <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                            <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                              {index === 0
                                ? "Team Leader"
                                : `Member ${index + 1}`}
                            </span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-slate-400">
                                Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={member.name}
                                onChange={(e) =>
                                  handleBaseMemberChange(
                                    index,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                placeholder="Full Name"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400">
                                Email <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="email"
                                required
                                value={member.email}
                                onChange={(e) =>
                                  handleBaseMemberChange(
                                    index,
                                    "email",
                                    e.target.value,
                                  )
                                }
                                className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                placeholder="Email Address"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400">
                                Phone <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={member.phone}
                                onChange={(e) =>
                                  handleBaseMemberChange(
                                    index,
                                    "phone",
                                    e.target.value,
                                  )
                                }
                                className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                placeholder="Phone Number"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-400">
                                Student ID{" "}
                                <span className="text-rose-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={member.studentId}
                                onChange={(e) =>
                                  handleBaseMemberChange(
                                    index,
                                    "studentId",
                                    e.target.value,
                                  )
                                }
                                className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                placeholder="Student ID"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Extra Team Members SECTION */}
                  {eventType === "team" && maxExtraMembers > 0 && (
                    <div className="pt-2">
                      <div className="flex justify-between items-end mb-4 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                        <div>
                          <h3 className="text-lg font-bold text-indigo-300">
                            Optional: Extra Members
                          </h3>
                          <p className="text-sm text-indigo-400 mt-1">
                            You can add up to {maxExtraMembers} more member(s)
                            (৳{extraMemberFee}/each)
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addExtraMember}
                          disabled={extraMembers.length >= maxExtraMembers}
                          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          + Add Member
                        </button>
                      </div>

                      <div className="space-y-4">
                        {extraMembers.map((member, index) => (
                          <div
                            key={`extra-${index}`}
                            className="p-5 bg-slate-800/80 border border-indigo-500/20 shadow-sm rounded-xl relative"
                          >
                            <button
                              type="button"
                              onClick={() => removeExtraMember(index)}
                              className="absolute top-4 right-4 text-rose-400 hover:bg-rose-500/20 p-1.5 rounded-md transition-colors"
                              title="Remove Member"
                            >
                              ✕
                            </button>
                            <h4 className="font-bold text-indigo-300 mb-4 text-sm flex items-center gap-2">
                              <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs">
                                Extra Member {index + 1}
                              </span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-slate-400">
                                  Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={member.name}
                                  onChange={(e) =>
                                    handleExtraMemberChange(
                                      index,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                  placeholder="Full Name"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400">
                                  Email <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={member.email}
                                  onChange={(e) =>
                                    handleExtraMemberChange(
                                      index,
                                      "email",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                  placeholder="Email Address"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400">
                                  Phone <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={member.phone}
                                  onChange={(e) =>
                                    handleExtraMemberChange(
                                      index,
                                      "phone",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                  placeholder="Phone Number"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400">
                                  Student ID{" "}
                                  <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={member.studentId}
                                  onChange={(e) =>
                                    handleExtraMemberChange(
                                      index,
                                      "studentId",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full mt-1 px-3 py-2.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                  placeholder="Student ID"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-slate-400">
                        Total Registration Fee
                      </p>
                      <p className="text-2xl font-black text-white">
                        ৳{subTotal}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto py-3.5 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                      Proceed to Payment →
                    </button>
                  </div>
                </form>
              )}

              {/* === STEP 2: PAYMENT FORM === */}
              {step === 2 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
                    <div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline mb-2 transition-colors"
                      >
                        ← Back to Details
                      </button>
                      <h2 className="text-2xl font-bold text-white">
                        Make Payment
                      </h2>
                    </div>
                  </div>

                  {/* === Coupon Section === */}
                  <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponStatus("idle");
                          setDiscountAmount(0);
                        }}
                        placeholder="Have a promo code?"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none uppercase focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={
                        !couponCode ||
                        couponStatus === "loading" ||
                        couponStatus === "success"
                      }
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
                    >
                      {couponStatus === "loading"
                        ? "Applying..."
                        : couponStatus === "success"
                          ? "Applied ✓"
                          : "Apply"}
                    </button>
                  </div>
                  {couponStatus === "error" && (
                    <p className="text-sm text-rose-500 mt-[-10px]">
                      Invalid or expired coupon code.
                    </p>
                  )}

                  {/* === Payment QR & Bill === */}
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                    {totalPayable > 0 ? (
                      <>
                        <div className="w-40 h-40 bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-sm mb-5 flex items-center justify-center">
                          <Image
                            src="/qr-placeholder.png"
                            alt="Payment QR"
                            width={150}
                            height={150}
                            className="opacity-90"
                          />
                        </div>
                        <div className="text-center">
                          {discountAmount > 0 && (
                            <p className="text-slate-500 line-through text-sm">
                              Subtotal: ৳{subTotal}
                            </p>
                          )}
                          <p className="font-black text-2xl text-white">
                            Total Payable: ৳{totalPayable}
                          </p>
                          <p className="text-sm font-medium text-slate-300 mt-2 bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700 shadow-sm inline-block">
                            Official Number: 017XXXXXXXX
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 animate-pulse">
                        <div className="text-emerald-500 text-6xl mb-4">🎉</div>
                        <p className="font-black text-3xl text-emerald-400">
                          100% Free Registration!
                        </p>
                        <p className="text-slate-400 mt-2">
                          No payment required. Just click confirm below.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* === Transaction Inputs (Hide if total is 0) === */}
                  {totalPayable > 0 && (
                    <div className="space-y-5 text-left bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-sm">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-slate-300">
                          Sender Phone Number{" "}
                          <span className="text-rose-500">*</span>
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
                          className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-slate-300">
                          Transaction ID (TrxID){" "}
                          <span className="text-rose-500">*</span>
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
                          className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none uppercase transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-70 mt-8 flex justify-center items-center gap-2 shadow-lg shadow-emerald-900/20"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                      </>
                    ) : totalPayable > 0 ? (
                      `Confirm Registration (৳${totalPayable})`
                    ) : (
                      "Confirm Free Registration"
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
