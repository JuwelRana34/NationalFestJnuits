// "use client";

// import {
//   AlertCircle,
//   CheckCircle2,
//   CreditCard,
//   Loader2,
//   Plus,
//   Tag,
//   Ticket,
//   Trash2,
//   User,
//   Users,
//   X,
// } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
// import { useMemo, useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useFieldArray, useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// import { verifyCouponAction } from "../actions";
// import { createFormSchema, FormValues, PaymentPayload } from "../types";
// import { useAuth } from "@/hooks/useUserSession";

// const processPaymentAction = async (payload: PaymentPayload) => {
//   console.log("Server Action Triggered");
//   console.log("Final Clean Payload:", payload);
//   return new Promise((resolve) => setTimeout(resolve, 1500));
// };

// export interface RegistrationButtonProps {
//   segmentId: string;
//   segmentName: string;
//   segmentCategory: "Education" | "Service" | "Event" | string;
//   isTeamEvent: boolean;
//   baseFee: number;
//   minMembers?: number;
//   maxMembers?: number;
//   extraMemberFee?: number;
// }

// export default function RegistrationButton({
//   segmentId,
//   segmentName,
//   segmentCategory,
//   isTeamEvent,
//   baseFee,
//   minMembers = 1,
//   maxMembers = 1,
//   extraMemberFee = 500,
// }: RegistrationButtonProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // 👈 কুপন ভেরিফিকেশনের স্টেট
//   const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);
//   const [couponStatus, setCouponStatus] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);
//   const [discountPercent, setDiscountPercent] = useState<number>(0);

//   const minExtra = Math.max(0, minMembers - 1);
//   const maxExtra = Math.max(0, maxMembers - 1);
//   const { user } = useAuth();
//   console.log("User session in RegistrationButton:", user); // Debugging line
//   const defaultUser = {
//     name: user?.name || "Unknown",
//     email: user?.email || "Unknown",
//     phone: user?.phone || "Unknown",
//     institution: user?.institution || "",
//   };

//   const formSchema = useMemo(
//     () => createFormSchema(minExtra, maxExtra),
//     [minExtra, maxExtra],
//   );

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: isTeamEvent
//       ? {
//           isTeamEvent: true as const,
//           coupon: "",
//           teamName: "",
//           members: Array.from({ length: minExtra }).map(() => ({
//             name: "",
//             email: "",
//             phone: "",
//             institution: "",
//           })),
//         }
//       : {
//           isTeamEvent: false as const,
//           coupon: "",
//         },
//     mode: "onChange",
//   });

//   const { fields, append, remove } = useFieldArray({
//     name: "members",
//     control: form.control,
//   });

//   const handleOpenModalClick = () => {
//     // ১. কুপন স্ট্যাটাস রিসেট
//     setCouponStatus(null);
//     setDiscountPercent(0);
//     // ২. ফর্মের ডেটা রিসেট
//     if (isTeamEvent) {
//       form.reset({
//         isTeamEvent: true as const,
//         coupon: "",
//         teamName: "",
//         members: Array.from({ length: minExtra }).map(() => ({
//           name: "",
//           email: "",
//           phone: "",
//           institution: "",
//         })),
//       });
//     } else {
//       form.reset({
//         isTeamEvent: false as const,
//         coupon: "",
//       });
//     }

//     // ৩. সবকিছু রেডি হওয়ার পর মডেল ওপেন
//     setIsModalOpen(true);
//   };

//   const totalTeamSize = isTeamEvent ? fields.length + 1 : 1;
//   const canAddMember = isTeamEvent && totalTeamSize < maxMembers;

//   // এখানে কুপনের ওপর ভিত্তি করে ডিসকাউন্ট লজিক বসাতে পারেন (আপাতত ডিফল্ট রাখা হলো)
//   const totalAmount = useMemo(() => {
//     let base = baseFee;

//     // টিম মেম্বারদের এক্সট্রা ফি যোগ করা
//     if (isTeamEvent) {
//       const extraCount = Math.max(0, totalTeamSize - minMembers);
//       base += extraCount * extraMemberFee;
//     }

//     // 👈 কুপন অ্যাপ্লাই হয়ে থাকলে ডিসকাউন্ট মাইনাস করা
//     if (discountPercent > 0) {
//       const discountAmount = (base * discountPercent) / 100;
//       base = base - discountAmount;
//     }

//     // ফ্র্যাকশন বা দশমিক এড়ানোর জন্য Math.round করে দেওয়া ভালো
//     return Math.round(base);
//   }, [
//     isTeamEvent,
//     baseFee,
//     totalTeamSize,
//     minMembers,
//     extraMemberFee,
//     discountPercent,
//   ]);

//   const handleClose = () => {
//     if (!isLoading) setIsModalOpen(false);
//   };

//   // 👈 কুপন ভেরিফাই করার ফাংশন
//   const handleVerifyCoupon = async () => {
//     const currentCoupon = form.getValues("coupon");
//     if (!currentCoupon) return;

//     setIsVerifyingCoupon(true);
//     setCouponStatus(null);
//     setDiscountPercent(0); // নতুন চেক করার আগে আগের ডিসকাউন্ট জিরো করে দেওয়া

//     try {
//       // 👈 আমাদের তৈরি করা সার্ভার অ্যাকশন কল করা
//       const response = await verifyCouponAction(currentCoupon);

//       if (response.success) {
//         setCouponStatus({ type: "success", message: response.message });
//         // ডিসকাউন্ট পার্সেন্টেজ সেভ করা
//         if (response.discountPercentage) {
//           setDiscountPercent(response.discountPercentage);
//         }
//       } else {
//         setCouponStatus({ type: "error", message: response.message });
//       }
//     } catch (error) {
//       setCouponStatus({ type: "error", message: "Something went wrong." });
//     } finally {
//       setIsVerifyingCoupon(false);
//     }
//   };

//   const onSubmit = async (data: FormValues) => {
//     setIsLoading(true);
//     try {
//       const payload: PaymentPayload = {
//         amount: totalAmount,
//         segmentId,
//         segmentName,
//         segmentCategory,
//         isTeamEvent: data.isTeamEvent,
//         coupon: data.coupon || undefined,
//       };

//       if (data.isTeamEvent) {
//         payload.teamName = data.teamName;
//         const teamLeader = {
//           name: defaultUser.name || "Unknown",
//           email: defaultUser.email || "Unknown",
//           phone: defaultUser.phone || "Unknown",
//           institution: defaultUser.institution || "",
//         };
//         payload.teamMembers = [teamLeader, ...data.members];
//       }

//       await processPaymentAction(payload);
//       handleClose();
//     } catch (error) {
//       console.error("Payment error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleOpenModalClick} className="px-6 py-3 w-full h-auto">
//         <Ticket className="w-full h-4 mr-2" />
//         Register Now
//       </Button>

//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-0">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={handleClose}
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl flex flex-col max-h-[90vh]"
//             >
//               <div className=" flex items-center justify-between border-b px-6 py-4 bg-white  shrink-0">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gradient">
//                     {isTeamEvent
//                       ? "Team Registration"
//                       : "Participant Registration"}
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-0.5">{segmentName}</p>
//                 </div>
//                 <button
//                   onClick={handleClose}
//                   disabled={isLoading}
//                   className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="flex flex-col overflow-hidden h-full"
//               >
//                 <div className="px-6 py-4 space-y-6 overflow-y-auto flex-1">
//                   {/* Price Banner */}
//                   <div className="sticky top-0 z-20 -mx-2 px-2 pb-4 bg-white/80 backdrop-blur-md">
//                     <div className="rounded-tl-xl rounded-br-xl border border-indigo-100 bg-linear-to-r from-cyan-400/50 to-violet-400/50 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                       <div>
//                         <p className="text-sm font-medium text-indigo-900 flex items-center">
//                           <Ticket className="w-4 h-4 mr-1.5" />
//                           Registration Fee
//                         </p>
//                         {isTeamEvent ? (
//                           <p className="text-xs text-indigo-600 mt-1">
//                             Base fee covers {minMembers} members.
//                             {extraMemberFee > 0 &&
//                               ` Extra members: +৳${extraMemberFee} each.`}
//                           </p>
//                         ) : (
//                           <p className="text-xs text-indigo-600 mt-1">
//                             Standard pass for 1 individual.
//                           </p>
//                         )}
//                       </div>
//                       <div className="text-left sm:text-right">
//                         <p className="text-2xl font-bold text-indigo-900">
//                           ৳{totalAmount}
//                         </p>
//                         <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
//                           Total Payable
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {!isTeamEvent && (
//                     <div className="space-y-4">
//                       <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
//                         <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                         <div>
//                           <h3 className="text-sm font-semibold text-emerald-900">
//                             No forms to fill out!
//                           </h3>
//                           <p className="text-sm text-emerald-700 mt-1 leading-relaxed">
//                             We securely pull your existing profile data to
//                             complete this registration. Review your details
//                             below before proceeding to payment.
//                           </p>
//                         </div>
//                       </div>

//                       <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                           <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Participant Details
//                           </h4>
//                         </div>
//                         <div className="bg-white p-4">
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
//                             <div>
//                               <p className="text-xs text-gray-500 mb-1">
//                                 Full Name
//                               </p>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {defaultUser.name}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 mb-1">
//                                 Email
//                               </p>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {defaultUser.email}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 mb-1">
//                                 Phone
//                               </p>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {defaultUser.phone || "N/A"}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500 mb-1">
//                                 Institution
//                               </p>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {defaultUser.institution || "N/A"}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {isTeamEvent && (
//                     <div className="space-y-6">
//                       <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
//                         <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-4">
//                           <Users className="w-5 h-5 text-indigo-600" />
//                           <h3>Team Setup</h3>
//                         </div>
//                         <Controller
//                           control={form.control}
//                           name="teamName"
//                           render={({ field, fieldState }) => (
//                             <Field data-invalid={fieldState.invalid}>
//                               <FieldLabel htmlFor={field.name}>
//                                 Team Name{" "}
//                                 <span className="text-red-500">*</span>
//                               </FieldLabel>
//                               <Input
//                                 {...field}
//                                 id={field.name}
//                                 aria-invalid={fieldState.invalid}
//                                 placeholder="E.g. Code Ninjas"
//                               />
//                               {fieldState.invalid && (
//                                 <FieldError errors={[fieldState.error]} />
//                               )}
//                             </Field>
//                           )}
//                         />
//                       </div>

//                       <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
//                         <div className="flex items-center">
//                           <div className="bg-white border border-indigo-100 p-2 rounded-lg mr-3 shadow-sm">
//                             <User className="w-4 h-4 text-indigo-600" />
//                           </div>
//                           <div>
//                             <h4 className="text-sm font-semibold text-gray-900">
//                               {defaultUser.name}{" "}
//                               <span className="text-indigo-600 font-normal">
//                                 (Team Leader)
//                               </span>
//                             </h4>
//                             <p className="text-xs text-gray-500 mt-0.5">
//                               Your profile data will be used automatically.
//                             </p>
//                           </div>
//                         </div>
//                         <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md shrink-0">
//                           Member 1
//                         </span>
//                       </div>

//                       <FieldGroup className="space-y-5">
//                         <AnimatePresence initial={false}>
//                           {fields.map((fieldItem, index) => {
//                             const memberNumber = index + 2;
//                             const isExtraMember = memberNumber > minMembers;

//                             return (
//                               <motion.div
//                                 key={fieldItem.id}
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="relative overflow-hidden"
//                               >
//                                 <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm mt-2">
//                                   <div className="flex justify-between items-center mb-4">
//                                     <h4 className="text-sm font-bold text-gray-900 flex items-center">
//                                       <div className="bg-gray-100 p-1.5 rounded-md mr-2">
//                                         <User className="w-3.5 h-3.5 text-gray-600" />
//                                       </div>
//                                       Member {memberNumber}
//                                       {isExtraMember && (
//                                         <span className="ml-3 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/20 uppercase tracking-wider">
//                                           Extra (+৳{extraMemberFee})
//                                         </span>
//                                       )}
//                                     </h4>
//                                     {isExtraMember && (
//                                       <button
//                                         type="button"
//                                         onClick={() => remove(index)}
//                                         className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors"
//                                         title="Remove member"
//                                       >
//                                         <Trash2 className="w-4 h-4" />
//                                       </button>
//                                     )}
//                                   </div>

//                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <Controller
//                                       control={form.control}
//                                       name={`members.${index}.name` as const}
//                                       render={({ field, fieldState }) => (
//                                         <Field
//                                           className="sm:col-span-2"
//                                           data-invalid={fieldState.invalid}
//                                         >
//                                           <FieldLabel
//                                             htmlFor={field.name}
//                                             className="text-xs uppercase tracking-wide text-gray-600"
//                                           >
//                                             Full Name{" "}
//                                             <span className="text-red-500">
//                                               *
//                                             </span>
//                                           </FieldLabel>
//                                           <Input
//                                             {...field}
//                                             id={field.name}
//                                             className="bg-gray-50 focus:bg-white"
//                                             placeholder="Participant Name"
//                                             aria-invalid={fieldState.invalid}
//                                           />
//                                           {fieldState.invalid && (
//                                             <FieldError
//                                               errors={[fieldState.error]}
//                                             />
//                                           )}
//                                         </Field>
//                                       )}
//                                     />
//                                     <Controller
//                                       control={form.control}
//                                       name={`members.${index}.email` as const}
//                                       render={({ field, fieldState }) => (
//                                         <Field
//                                           data-invalid={fieldState.invalid}
//                                         >
//                                           <FieldLabel
//                                             htmlFor={field.name}
//                                             className="text-xs uppercase tracking-wide text-gray-600"
//                                           >
//                                             Email{" "}
//                                             <span className="text-red-500">
//                                               *
//                                             </span>
//                                           </FieldLabel>
//                                           <Input
//                                             {...field}
//                                             id={field.name}
//                                             type="email"
//                                             className="bg-gray-50 focus:bg-white"
//                                             placeholder="email@example.com"
//                                             aria-invalid={fieldState.invalid}
//                                           />
//                                           {fieldState.invalid && (
//                                             <FieldError
//                                               errors={[fieldState.error]}
//                                             />
//                                           )}
//                                         </Field>
//                                       )}
//                                     />
//                                     <Controller
//                                       control={form.control}
//                                       name={`members.${index}.phone` as const}
//                                       render={({ field, fieldState }) => (
//                                         <Field
//                                           data-invalid={fieldState.invalid}
//                                         >
//                                           <FieldLabel
//                                             htmlFor={field.name}
//                                             className="text-xs uppercase tracking-wide text-gray-600"
//                                           >
//                                             Phone{" "}
//                                             <span className="text-red-500">
//                                               *
//                                             </span>
//                                           </FieldLabel>
//                                           <Input
//                                             {...field}
//                                             id={field.name}
//                                             type="tel"
//                                             className="bg-gray-50 focus:bg-white"
//                                             placeholder="017XXXXXXXX"
//                                             aria-invalid={fieldState.invalid}
//                                           />
//                                           {fieldState.invalid && (
//                                             <FieldError
//                                               errors={[fieldState.error]}
//                                             />
//                                           )}
//                                         </Field>
//                                       )}
//                                     />
//                                     <Controller
//                                       control={form.control}
//                                       name={
//                                         `members.${index}.institution` as const
//                                       }
//                                       render={({ field, fieldState }) => (
//                                         <Field
//                                           className="sm:col-span-2"
//                                           data-invalid={fieldState.invalid}
//                                         >
//                                           <FieldLabel
//                                             htmlFor={field.name}
//                                             className="text-xs uppercase tracking-wide text-gray-600"
//                                           >
//                                             Institution{" "}
//                                             <span className="text-gray-400 font-normal normal-case">
//                                               (Optional)
//                                             </span>
//                                           </FieldLabel>
//                                           <Input
//                                             {...field}
//                                             id={field.name}
//                                             className="bg-gray-50 focus:bg-white"
//                                             placeholder="School / College / University"
//                                             aria-invalid={fieldState.invalid}
//                                           />
//                                           {fieldState.invalid && (
//                                             <FieldError
//                                               errors={[fieldState.error]}
//                                             />
//                                           )}
//                                         </Field>
//                                       )}
//                                     />
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             );
//                           })}
//                         </AnimatePresence>
//                       </FieldGroup>

//                       <div className="pt-2">
//                         {canAddMember ? (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               append({
//                                 name: "",
//                                 email: "",
//                                 phone: "",
//                                 institution: "",
//                               })
//                             }
//                             className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-indigo-200 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
//                           >
//                             <Plus className="w-4 h-4 mr-2" />
//                             Add Member {totalTeamSize + 1}
//                           </button>
//                         ) : (
//                           <div className="flex items-center justify-center py-3 px-4 bg-amber-50 rounded-xl text-sm text-amber-700 border border-amber-100 font-medium">
//                             <AlertCircle className="w-4 h-4 mr-2" />
//                             Team capacity reached ({maxMembers} members max).
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* 🔥 আপডেটেড Coupon Field */}
//                   <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mt-6">
//                     <Controller
//                       control={form.control}
//                       name="coupon"
//                       render={({ field, fieldState }) => (
//                         <Field data-invalid={fieldState.invalid}>
//                           <FieldLabel
//                             htmlFor={field.name}
//                             className="flex items-center text-slate-700 mb-2"
//                           >
//                             <Tag className="w-4 h-4 mr-1.5 text-slate-500" />
//                             Promo / Coupon Code
//                             <span className="text-slate-400 font-normal ml-1">
//                               (Optional)
//                             </span>
//                           </FieldLabel>

//                           <div className="flex gap-3">
//                             <Input
//                               {...field}
//                               id={field.name}
//                               aria-invalid={fieldState.invalid}
//                               placeholder="Enter code here"
//                               className="bg-white uppercase placeholder:normal-case flex-1"
//                               // ইউজার নতুন কিছু টাইপ করলে আগের স্ট্যাটাস মুছে যাবে
//                               onChange={(e) => {
//                                 field.onChange(e);
//                                 if (couponStatus) setCouponStatus(null);
//                               }}
//                             />

//                             <Button
//                               type="button" // 👈 সাবমিট এড়ানোর জন্য type="button"
//                               variant="secondary"
//                               onClick={handleVerifyCoupon}
//                               disabled={!field.value || isVerifyingCoupon}
//                               className="w-[100px] shrink-0"
//                             >
//                               {isVerifyingCoupon ? (
//                                 <Loader2 className="w-4 h-4 animate-spin" />
//                               ) : (
//                                 "Verify"
//                               )}
//                             </Button>
//                           </div>

//                           {/* 👈 সাকসেস/এরর মেসেজ রেন্ডার */}
//                           {couponStatus && (
//                             <p
//                               className={`text-sm mt-2 flex items-center ${couponStatus.type === "success" ? "text-emerald-600" : "text-red-500"}`}
//                             >
//                               {couponStatus.type === "success" ? (
//                                 <CheckCircle2 className="w-4 h-4 mr-1.5" />
//                               ) : (
//                                 <AlertCircle className="w-4 h-4 mr-1.5" />
//                               )}
//                               {couponStatus.message}
//                             </p>
//                           )}

//                           {fieldState.invalid && (
//                             <FieldError errors={[fieldState.error]} />
//                           )}
//                         </Field>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between shrink-0">
//                   <div className="text-sm text-gray-500">
//                     {isTeamEvent && (
//                       <span className="flex items-center">
//                         <Users className="w-4 h-4 mr-1.5 opacity-70" />
//                         Team Size:{" "}
//                         <strong className="text-gray-900 ml-1">
//                           {totalTeamSize}
//                         </strong>
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={handleClose}
//                       disabled={isLoading}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       type="submit"
//                       disabled={isLoading}
//                       className="min-w-[140px]"
//                     >
//                       {isLoading ? (
//                         <>
//                           <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <CreditCard className="w-4 h-4 mr-2" />
//                           Pay ৳{totalAmount}
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// ++++++++++++++++++++++

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
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/hooks/useUserSession";
import { processPaymentAction, verifyCouponAction } from "../actions";
import { createFormSchema, FormValues, PaymentPayload } from "../types";


export interface RegistrationButtonProps {
  segmentId: string;
  segmentName: string;
  segmentCategory: "Education" | "Service" | "Event" | string;
  isTeamEvent: boolean;
  baseFee: number;
  minMembers?: number;
  maxMembers?: number;
  extraMemberFee?: number;
}

export default function RegistrationButton({
  segmentId,
  segmentName,
  isTeamEvent,
  baseFee,
  minMembers = 1,
  maxMembers = 1,
  extraMemberFee = 500,
}: RegistrationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const minExtra = Math.max(0, minMembers - 1);
  const maxExtra = Math.max(0, maxMembers - 1);
  const { user } = useAuth();



  const defaultUser = {
    name: user?.name || "Unknown",
    email: user?.email || "Unknown",
  };

  const formSchema = useMemo(
    () => createFormSchema(minExtra, maxExtra),
    [minExtra, maxExtra],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isTeamEvent
      ? {
          isTeamEvent: true as const,
          coupon: "",
          teamName: "",
          members: Array.from({ length: minExtra }).map(() => ({
            name: "",
            email: "",
            phone: "",
            institution: "",
          })),
        }
      : {
          isTeamEvent: false as const,
          coupon: "",
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
        members: Array.from({ length: minExtra }).map(() => ({
          name: "",
          email: "",
          phone: "",
          institution: "",
        })),
      });
    } else {
      form.reset({
        isTeamEvent: false as const,
        coupon: "",
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
      const response = await verifyCouponAction(currentCoupon);
      if (response.success) {
        setCouponStatus({ type: "success", message: response.message });
        if (response.discountPercentage) {
          setDiscountPercent(response.discountPercentage);
        }
      } else {
        setCouponStatus({ type: "error", message: response.message });
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
      };

      if (data.isTeamEvent) {
        payload.teamName = data.teamName;
        
        payload.teamMembers = [...data.members];
      }

     const res =  await processPaymentAction(payload);

     console.log("Payment response:", res);
      handleClose();
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };


    if (!user) {
      return (
        <Button disabled className="px-6 py-3 w-full h-auto">
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
      <DialogTrigger>
        <Button
          onClick={handleOpenModalClick}
          className="px-6 py-3 w-full h-auto"
        >
          <Ticket className="w-full h-4 mr-2" />
          Register Now
        </Button>
      </DialogTrigger>

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
          onSubmit={form.handleSubmit(onSubmit)}
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
                        className="w-[100px] shrink-0"
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
