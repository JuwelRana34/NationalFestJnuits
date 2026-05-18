"use client";

import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Plus,
  Tag,
  Ticket,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Path, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useUserSession";
import { uploadStudentId } from "@/lib/uploadStudentId";
import { submitPaymentAction, verifyCouponAction } from "../action";
import {
  createFormSchema,
  FormValues,
  PaymentPayload,
  SegmentType,
} from "../types";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export interface RegistrationButtonProps {
  segmentId: string;
  segmentName: string;
  segmentCategory: "Education" | "Service" | "Event" | string;
  isTeamEvent: boolean;
  baseFee: number;
  minMembers?: number;
  maxMembers?: number;
  extraMemberFee?: number;
  segmentType?: SegmentType;
}

interface typedDiscountResponse {
  discountPercentage?: number | undefined;
}
export default function RegistrationButton({
  segmentId,
  segmentName,
  isTeamEvent,
  baseFee,
  minMembers = 1,
  maxMembers = 1,
  extraMemberFee = 500,
  segmentType,
}: RegistrationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const metaPath = (key: string) => `segmentMeta.${key}` as Path<FormValues>;
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const minExtra = Math.max(0, minMembers - 1);
  const maxExtra = Math.max(0, maxMembers - 1);
  const { user } = useAuth();

  const [uploadingFields, setUploadingFields] = useState<
    Record<string, boolean>
  >({});

  // reusable upload handler
  const handleFileUpload = async (
    file: File,
    fieldName: string,
    onChange: (url: string) => void,
  ) => {
    setUploadingFields((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const url = await uploadStudentId(file);
      onChange(url);
    } catch (error) {
      console.error("Upload failed for", fieldName, error);
    } finally {
      setUploadingFields((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const defaultUser = {
    name: user?.name || "Unknown",
    email: user?.email || "Unknown",
  };

  const formSchema = useMemo(
    () => createFormSchema(minExtra, maxExtra, segmentType ?? "DEFAULT"),
    [minExtra, maxExtra, segmentType],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isTeamEvent
      ? {
          isTeamEvent: true as const,
          coupon: "",
          teamName: "",
          category: "UNIVERSITY", // 👈
          members: Array.from({ length: minExtra }).map(() => ({
            name: "",
            email: "",
            phone: "",
            institution: "",
            studentIdScan: "", // 👈
          })),
          segmentMeta: {},
          studentIdScan: "",
        }
      : {
          isTeamEvent: false as const,
          coupon: "",
          segmentMeta: {},
          category: "UNIVERSITY",
          studentIdScan: "",
        },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  const handleOpenModalClick = () => {
    setCouponStatus(null);
    setDiscountPercent(0);
    if (isTeamEvent) {
      form.reset({
        isTeamEvent: true as const,
        coupon: "",
        teamName: "",
        category: "UNIVERSITY", // 👈
        members: Array.from({ length: minExtra }).map(() => ({
          name: "",
          email: "",
          phone: "",
          institution: "",
          studentIdScan: "", // 👈
        })),
      });
    } else {
      form.reset({
        isTeamEvent: false as const,
        coupon: "",
        category: "UNIVERSITY", // 👈
        studentIdScan: "", // 👈
      });
    }
    setIsModalOpen(true);
  };

  const totalTeamSize = isTeamEvent ? fields.length + 1 : 1;
  const canAddMember = isTeamEvent && totalTeamSize < maxMembers;

  const totalAmount = useMemo(() => {
    let base = baseFee;
    if (isTeamEvent) {
      const extraCount = Math.max(0, totalTeamSize - minMembers);
      base += extraCount * extraMemberFee;
    }
    if (discountPercent > 0) {
      const discountAmount = (base * discountPercent) / 100;
      base = base - discountAmount;
    }
    return Math.round(base);
  }, [
    isTeamEvent,
    baseFee,
    totalTeamSize,
    minMembers,
    extraMemberFee,
    discountPercent,
  ]);

  const handleClose = () => {
    if (!isLoading) setIsModalOpen(false);
  };

  const handleVerifyCoupon = async () => {
    const currentCoupon = form.getValues("coupon");
    if (!currentCoupon) return;

    setIsVerifyingCoupon(true);
    setCouponStatus(null);
    setDiscountPercent(0);

    try {
      const { success, data, message } =
        await verifyCouponAction(currentCoupon);
      console.log("Coupon verification result:", data);

      if (success) {
        // handleSelibrationSparkel();
        setCouponStatus({ type: "success", message: message });
        const discount = data as typedDiscountResponse;
        setDiscountPercent(discount.discountPercentage ?? 0);
      } else {
        const err = data as { message?: string } | undefined;
        setCouponStatus({ type: "error", message: err?.message || message });
      }
    } catch {
      setCouponStatus({ type: "error", message: "Something went wrong." });
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const onSubmit = async (data: FormValues) => {

    setIsLoading(true);
    try {
      const payload: PaymentPayload = {
        segmentId,
        coupon: data.coupon || undefined,
        category: data.category,
        leaderStudentIdScan: data.studentIdScan,
        segmentMeta: data.segmentMeta as Record<string, unknown>,
      };

      if (data.isTeamEvent) {
        payload.teamName = data.teamName;

        payload.teamMembers = [...data.members];
      }

      

     const { PayUrl, success, message } = await submitPaymentAction(payload);
      
       if (success) {
        console.log("Payment submission successful in clientSide:", PayUrl);
        window.location.assign(PayUrl || "");
        handleClose();
       } else {
        toast.error(message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Button disabled  className="px-6 py-3 w-full h-auto bg-primary border border-white/85 cursor-not-allowed">
        <Ticket className="w-full h-4 mr-2" />
        Login to Register
      </Button>
    );
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => !isLoading && setIsModalOpen(open)}
    >
      {/* <DialogTrigger> */}
      <Button
        onClick={handleOpenModalClick}
        className="px-6 py-3 w-full h-auto"
      >
        <Ticket className="w-full h-4 mr-2" />
        Register Now
      </Button>
      {/* </DialogTrigger> */}

      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white rounded-xl max-h-[95vh] flex flex-col border-none shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b bg-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gradient">
                {isTeamEvent ? "Team Registration" : "Participant Registration"}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-0.5">{segmentName}</p>
            </div>
            {/* Shadcn Dialog handles the Close button, but keeping your design consistency if needed */}
          </div>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(
              "❌ Validation errors",
              JSON.stringify(errors, null, 2),
            );
          })}
          className="flex flex-col overflow-hidden h-full"
        >
          <div className="px-6 py-1 space-y-6 overflow-y-auto flex-1">
            {/* Price Banner */}
            <div className="md:sticky top-0 z-20 -mx-2 px-2 pb-2 bg-transparent backdrop-blur-md">
              <div className="rounded-tl-xl rounded-br-xl border border-indigo-100 bg-linear-to-r from-cyan-400/50 to-violet-400/50 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-900 flex items-center">
                    <Ticket className="w-4 h-4 mr-1.5" />
                    Registration Fee
                  </p>
                  {isTeamEvent ? (
                    <p className="text-xs text-indigo-600 mt-1">
                      Base fee covers {minMembers} members.
                      {extraMemberFee > 0 &&
                        ` Extra members: +৳${extraMemberFee} each.`}
                    </p>
                  ) : (
                    <p className="text-xs text-indigo-600 mt-1">
                      Standard pass for 1 individual.
                    </p>
                  )}
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-bold text-indigo-900">
                    ৳{totalAmount}
                  </p>
                  <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                    Total Payable
                  </p>
                </div>
              </div>
            </div>

            {!isTeamEvent && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-900">
                      No forms to fill out!
                    </h3>
                    <p className="text-sm text-emerald-700 mt-1 leading-relaxed">
                      We securely pull your existing profile data to complete
                      this registration.
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Participant Details
                    </h4>
                  </div>
                  <div className="bg-white p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Full Name</p>
                        <p className="text-sm font-medium">
                          {defaultUser.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium">
                          {defaultUser.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category Selection — সব segment এ দরকার (ESPORTS বাদে) */}
            {segmentType !== "ESPORTS" && (
              <div className="space-y-2">
                <FieldLabel>
                  Category <span className="text-red-500">*</span>
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <div className="flex gap-3">
                      {["UNIVERSITY", "SCHOOL_COLLEGE"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => field.onChange(cat)}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                            field.value === cat
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "border-gray-200 text-gray-600 hover:border-indigo-300"
                          }`}
                        >
                          {cat === "UNIVERSITY"
                            ? "University"
                            : "School/College"}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}

            {/* Student ID Scan — ESPORTS ও VISITOR বাদে */}
            {segmentType !== "ESPORTS" && segmentType !== "VISITOR" && (
              <Controller
                control={form.control}
                name="studentIdScan"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Student ID Scan <span className="text-red-500">*</span>
                    </FieldLabel>
                    <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          await handleFileUpload(
                            file,
                            "leaderIdScan",
                            field.onChange,
                          );
                        }}
                      />
                      {uploadingFields["leaderIdScan"] ? (
                        <span className="flex items-center gap-2 text-indigo-600 text-sm">
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Uploading...
                        </span>
                      ) : field.value ? (
                        <span className="flex items-center gap-2 text-emerald-600 text-sm">
                          <CheckCircle2 className="w-4 h-4" /> Uploaded! Click
                          to change.
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Click to upload Student ID
                        </span>
                      )}
                    </label>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            {/* Hackathon specific */}
            {segmentType === "HACKATHON" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Technical Links
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("githubLink")}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        GitHub Profile <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={(value as string) ?? ""}
                        placeholder="https://github.com/username"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("portfolioLink")}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                  }) => (
                    <Field>
                      <FieldLabel>Portfolio Link</FieldLabel>
                      <Input
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={(value as string) ?? ""}
                        placeholder="https://your-portfolio.com (optional)"
                      />
                    </Field>
                  )}
                />
              </div>
            )}

            {/* App Showcase specific */}
            {segmentType === "APP_SHOWCASE" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Project Details
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("appTitle")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        App/Software Title{" "}
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="My Awesome App"
                        value={(field.value as string) ?? ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("abstract")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Abstract <span className="text-red-500">*</span>{" "}
                        <span className="text-gray-400 font-normal">
                          (max 400 words)
                        </span>
                      </FieldLabel>
                      <textarea
                        {...field}
                        value={(field.value as string) ?? ""}
                        rows={5}
                        maxLength={2000}
                        placeholder="Describe your project..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            )}

            {/* AI Ad-Venture specific */}
            {segmentType === "AI_ADVENTURE" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Creative Brief
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("conceptNote")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Concept Note <span className="text-red-500">*</span>{" "}
                        <span className="text-gray-400 font-normal">
                          (max 150 words)
                        </span>
                      </FieldLabel>
                      <Textarea
                        {...field}
                        rows={4}
                        value={(field.value as string) ?? ""}
                        placeholder="Describe your concept..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("previousWorkLink")}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Previous Work / Portfolio Link</FieldLabel>
                      <Input
                        {...field}
                        value={(field.value as string) ?? ""}
                        placeholder="https://... (optional)"
                      />
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("videoDurationConfirmed")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">
                          I confirm my video will be <strong>1 minute</strong>{" "}
                          in duration.
                        </span>
                      </label>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            )}

            {/* Typing Master specific */}
            {segmentType === "TYPING_MASTER" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Performance & Equipment
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("previousWpm")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Previous WPM <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        placeholder="e.g. 75"
                        value={(field.value as string) ?? ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("blueKeyboardConsent")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">
                          I acknowledge the use of{" "}
                          <strong>Blue Switch mechanical keyboards</strong> in
                          this event.
                        </span>
                      </label>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            )}

            {/* Esports specific */}
            {segmentType === "ESPORTS" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Game Details
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("ign")}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        In-Game Name (IGN){" "}
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={(value as string) ?? ""}
                        placeholder="Your IGN"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("gameId")}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        In-Game ID <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Your Game ID"
                        value={(field.value as string) ?? ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name={metaPath("previousAchievements")}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                  }) => (
                    <Field>
                      <FieldLabel>Previous Achievements</FieldLabel>
                      <textarea
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={(value as string) ?? ""}
                        rows={3}
                        placeholder="Any previous tournament wins or achievements (optional)"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </Field>
                  )}
                />
              </div>
            )}

            {/* Visitor specific */}
            {segmentType === "VISITOR" && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Your Interests
                </h4>
                <Controller
                  control={form.control}
                  name={metaPath("topicsOfInterest")}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Topics / Industry Trends{" "}
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <textarea
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={(value as string) ?? ""}
                        rows={3}
                        placeholder="e.g. AI in healthcare, Web3, Cybersecurity..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            )}

            {isTeamEvent && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-4">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <h3>Team Setup</h3>
                  </div>
                  <Controller
                    control={form.control}
                    name="teamName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>
                          Team Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input {...field} placeholder="E.g. Code Ninjas" />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center">
                    <div className="bg-white border border-indigo-100 p-2 rounded-lg mr-3 shadow-sm">
                      <User className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {defaultUser.name}{" "}
                        <span className="text-indigo-600 font-normal">
                          (Leader)
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Profile data will be used automatically.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md">
                    Member 1
                  </span>
                </div>

                <FieldGroup className="space-y-5">
                  <AnimatePresence initial={false}>
                    {fields.map((fieldItem, index) => {
                      const memberNumber = index + 2;
                      const isExtraMember = memberNumber > minMembers;
                      return (
                        <motion.div
                          key={fieldItem.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="relative overflow-hidden"
                        >
                          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm mt-2">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-sm font-bold text-gray-900 flex items-center">
                                Member {memberNumber}
                                {isExtraMember && (
                                  <span className="ml-3 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-700/20 uppercase tracking-wider">
                                    Extra (+৳{extraMemberFee})
                                  </span>
                                )}
                              </h4>
                              {isExtraMember && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 p-1.5 hover:bg-red-50 rounded-md transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Controller
                                control={form.control}
                                name={`members.${index}.name` as const}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="Participant Name"
                                  />
                                )}
                              />
                              <Controller
                                control={form.control}
                                name={`members.${index}.email` as const}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="email@example.com"
                                  />
                                )}
                              />
                              <Controller
                                control={form.control}
                                name={`members.${index}.phone` as const}
                                render={({ field }) => (
                                  <Input {...field} placeholder="017XXXXXXXX" />
                                )}
                              />
                              <Controller
                                control={form.control}
                                name={`members.${index}.institution` as const}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="Institution (Optional)"
                                  />
                                )}
                              />

                              {/* 👇 ADD THIS */}
                              <div className="sm:col-span-2">
                                <Controller
                                  control={form.control}
                                  name={
                                    `members.${index}.studentIdScan` as const
                                  }
                                  render={({ field, fieldState }) => {
                                    const uploadKey = `member_${index}_idScan`; // 👈 unique key
                                    return (
                                      <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                          Student ID Scan{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </FieldLabel>
                                        <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                                          <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (!file) return;
                                              await handleFileUpload(
                                                file,
                                                uploadKey,
                                                field.onChange,
                                              ); // 👈 unique key
                                            }}
                                          />
                                          {uploadingFields[uploadKey] ? ( // 👈 unique key
                                            <span className="flex items-center gap-2 text-indigo-600 text-sm">
                                              <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                              Uploading...
                                            </span>
                                          ) : field.value ? (
                                            <span className="flex items-center gap-2 text-emerald-600 text-sm">
                                              <CheckCircle2 className="w-4 h-4" />{" "}
                                              Uploaded! Click to change.
                                            </span>
                                          ) : (
                                            <span className="text-gray-500 text-sm">
                                              Click to upload Student ID
                                            </span>
                                          )}
                                        </label>
                                        {fieldState.invalid && (
                                          <FieldError
                                            errors={[fieldState.error]}
                                          />
                                        )}
                                      </Field>
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </FieldGroup>

                <div className="pt-2">
                  {canAddMember ? (
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          name: "",
                          email: "",
                          phone: "",
                          institution: "",
                          studentIdScan: "",
                        })
                      }
                      className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-indigo-200 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Member{" "}
                      {totalTeamSize + 1}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center py-3 px-4 bg-amber-50 rounded-xl text-sm text-amber-700 border border-amber-100 font-medium">
                      <AlertCircle className="w-4 h-4 mr-2" /> Team capacity
                      reached ({maxMembers} max).
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Coupon Section */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mt-6">
              <Controller
                control={form.control}
                name="coupon"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="flex items-center text-slate-700 mb-2">
                      <Tag className="w-4 text-violet-500 h-4 mr-1.5" /> Promo /
                      Coupon Code
                    </FieldLabel>
                    <div className="flex gap-3">
                      <Input
                        {...field}
                        placeholder="Enter code"
                        className="bg-white uppercase"
                        onChange={(e) => {
                          field.onChange(e);
                          if (couponStatus) setCouponStatus(null);
                        }}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleVerifyCoupon}
                        disabled={!field.value || isVerifyingCoupon}
                        className="w-25 shrink-0 text-white"
                      >
                        {isVerifyingCoupon ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    {couponStatus && (
                      <p
                        className={`text-sm mt-2 flex items-center ${couponStatus.type === "success" ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {couponStatus.type === "success" ? (
                          <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-1.5" />
                        )}
                        {couponStatus.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="text-sm text-gray-500">
              {isTeamEvent && (
                <span>
                  Team Size: <strong>{totalTeamSize}</strong>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                className="bg-red-200 text-red-700 hover:bg-red-300 focus:ring-red-500/50"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-35 bg-linear-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 focus:ring-cyan-500/50"
              >
                {isLoading ? (
                  <div className="flex items-center text-xs">
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    redirecting to checkout...
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ৳{totalAmount}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
