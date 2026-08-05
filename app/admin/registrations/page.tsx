// "use client";

// import { revalidationAdminDashboard } from "@/actions/registrationActions";
// import { formatDate } from "@/lib/DateAndTimeFormater";
// import { honoFetch } from "@/lib/hono-client";
// import {
//   CheckCircle2,
//   ClipboardList,
//   Clock,
//   Eye,
//   Filter,
//   Loader2,
//   Receipt,
//   Search,
//   Tag,
//   User,
//   X,
//   XCircle,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// // ==========================================
// // 💡 Types based on your Drizzle Schema
// // ==========================================
// interface PaymentData {
//   status: string;
//   paidAmount?: number;
//   baseAmount?: number;
//   transactionId?: string;
//   paymentMethod?: string;
//   couponUsed?: string | null;
// }

// interface CouponDetails {
//   code: string;
//   discountPercentage: number;
// }

// interface FinanceData {
//   baseAmount: number;
//   discountAmount: number;
//   paidAmount: number;
// }

// interface FormMetadata {
//   commonDetails?: {
//     name?: string;
//     email?: string;
//     phone?: string;
//   };
//   registrationData?: {
//     name?: string;
//     phone?: string;
//   };
//   couponId?: string;
//   eventType?: string;
//   [key: string]: unknown;
// }

// interface RegistrationData {
//   id: string;
//   trackingNumber: string;
//   selectionStatus: string;
//   createdAt: string;
//   couponId: string | null;
//   metadata: FormMetadata | string | null;
//   event?: {
//     title: string;
//     eventType: string;
//   };
//   payments?: PaymentData[];
//   couponDetails?: CouponDetails | null;
//   finance?: FinanceData;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: RegistrationData[];
// }

// interface MappedRegistration {
//   id: string;
//   trackingId: string;
//   guestName: string;
//   guestPhone: string;
//   eventName: string;
//   category: string;
//   paymentStatus: string;
//   transactionId: string | null;
//   selectionStatus: string;
//   date: string;
//   rawMetadata: FormMetadata;
//   rawPayments: PaymentData[];
//   finance: FinanceData | null;
//   couponDetails: CouponDetails | null;
// }

// // ==========================================
// // 💡 Helper Functions for Dynamic Data Render
// // ==========================================
// const formatKey = (key: string) => {
//   return key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/_/g, " ")
//     .trim()
//     .replace(/^./, (str) => str.toUpperCase());
// };

// const DynamicDataRenderer = ({ data }: { data: unknown }) => {
//   if (data === null || data === undefined || data === "") {
//     return <span className="text-slate-500 italic text-sm">N/A</span>;
//   }
  
//   if (typeof data === "boolean") {
//     return (
//       <span className="text-sm font-medium text-slate-200">
//         {data ? "Yes" : "No"}
//       </span>
//     );
//   }
  
//   // 💡 যদি ডাটা অবজেক্ট বা অ্যারে না হয়, তখন আমরা চেক করব এটা URL কি না
//   if (typeof data !== "object") {
//     const stringData = String(data);
    
//     // URL চেক করার জন্য Regex (http অথবা https দিয়ে শুরু হতে হবে)
//     const isUrl = /^(https?:\/\/[^\s]+)$/i.test(stringData);

//     if (isUrl) {
//       return (
//         <a
//           href={stringData}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2 break-all transition-colors flex items-center gap-1 w-fit"
//         >
//           View Attachment
//           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//             <polyline points="15 3 21 3 21 9"></polyline>
//             <line x1="10" y1="14" x2="21" y2="3"></line>
//           </svg>
//         </a>
//       );
//     }

//     return (
//       <span className="text-sm font-medium text-slate-200 break-words">
//         {stringData}
//       </span>
//     );
//   }

//   if (Array.isArray(data)) {
//     if (data.length === 0)
//       return <span className="text-slate-500 text-sm">Empty</span>;
//     return (
//       <div className="space-y-3 mt-1">
//         {data.map((item, idx) => (
//           <div
//             key={idx}
//             className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
//           >
//             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">
//               Item #{idx + 1}
//             </span>
//             <DynamicDataRenderer data={item} />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   const entries = Object.entries(data as Record<string, unknown>);
//   if (entries.length === 0)
//     return <span className="text-slate-500 text-sm">No details</span>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
//       {entries.map(([key, value]) => {
//         const isObject = typeof value === "object" && value !== null;
//         return (
//           <div
//             key={key}
//             className={`${
//               isObject ? "sm:col-span-2 border-t border-slate-700/50 pt-3 mt-1" : ""
//             }`}
//           >
//             <p className="text-xs font-medium text-slate-400 mb-1">
//               {formatKey(key)}
//             </p>
//             {isObject ? (
//               <div className="mt-2">
//                 <DynamicDataRenderer data={value} />
//               </div>
//             ) : (
//               <DynamicDataRenderer data={value} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ==========================================
// // Main Page Component
// // ==========================================
// export default function RegistrationManagementPage() {
//   const [registrations, setRegistrations] = useState<MappedRegistration[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [eventFilter, setEventFilter] = useState("ALL");
//   const [selectedReg, setSelectedReg] = useState<MappedRegistration | null>(
//     null,
//   );

//   useEffect(() => {
//     const fetchRegistrations = async () => {
//       try {
//         const { status, response } = await honoFetch<ApiResponse>(
//           "/api/registrations",
//           {
//             credentials: "include",
//           },
//         );

//         if (status === 200 && response?.data && Array.isArray(response.data)) {
//           const formattedData: MappedRegistration[] = response.data.map(
//             (reg: RegistrationData) => {
//               let meta: FormMetadata = {};
//               if (typeof reg.metadata === "string") {
//                 try {
//                   meta = JSON.parse(reg.metadata) as FormMetadata;
//                 } catch {
//                   meta = {};
//                 }
//               } else if (reg.metadata && typeof reg.metadata === "object") {
//                 meta = reg.metadata as FormMetadata;
//               }

//               const payment =
//                 reg.payments && reg.payments.length > 0
//                   ? reg.payments[0]
//                   : null;

//               return {
//                 id: reg.id,
//                 trackingId: reg.trackingNumber,
//                 guestName:
//                   meta?.commonDetails?.name ||
//                   meta?.registrationData?.name ||
//                   meta?.commonDetails?.email?.split("@")[0] ||
//                   "Guest User",
//                 guestPhone:
//                   meta?.commonDetails?.phone ||
//                   meta?.registrationData?.phone ||
//                   "N/A",
//                 eventName: reg.event?.title || "Unknown Event",
//                 category: reg.event?.eventType || "General",
//                 paymentStatus: payment ? payment.status : "FREE",
//                 transactionId: payment?.transactionId || null,
//                 selectionStatus: reg.selectionStatus,
//                 date: new Date(reg.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }),
//                 rawMetadata: meta,
//                 rawPayments: reg.payments || [],
//                 finance: reg.finance || null,
//                 couponDetails: reg.couponDetails || null,
//               };
//             },
//           );

//           setRegistrations(formattedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch registrations:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRegistrations();
//   }, []);

//   const uniqueEvents = Array.from(
//     new Set(registrations.map((reg) => reg.eventName)),
//   );

//   const filteredRegistrations = registrations.filter((reg) => {
//     const matchesSearch =
//       reg.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reg.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reg.guestPhone.includes(searchQuery) ||
//       (reg.transactionId &&
//         reg.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));

//     const matchesStatus =
//       statusFilter === "ALL" || reg.selectionStatus === statusFilter;

//     const matchesEvent = eventFilter === "ALL" || reg.eventName === eventFilter;

//     return matchesSearch && matchesStatus && matchesEvent;
//   });

//   const handlePaymentUpdate = async (id: string, newPaymentStatus: string) => {
//     if (
//       window.confirm(
//         `Are you sure you want to mark payment as ${newPaymentStatus}?`,
//       )
//     ) {
//       setRegistrations((prev) =>
//         prev.map((reg) => {
//           if (reg.id === id) {
//             return {
//               ...reg,
//               paymentStatus: newPaymentStatus,
//               rawPayments: reg.rawPayments.map((payment, index) =>
//                 index === 0
//                   ? { ...payment, status: newPaymentStatus }
//                   : payment,
//               ),
//             };
//           }
//           return reg;
//         }),
//       );

//       try {
//         const { status, response } = await honoFetch<ApiResponse>(
//           `/api/registrations/${id}/status`,
//           {
//             method: "PATCH",
//             body: JSON.stringify({ paymentStatus: newPaymentStatus }),
//             credentials: "include",
//           },
//         );

//         if (status !== 200 || !response?.success) {
//           throw new Error(
//             response?.message || "Failed to update payment status.",
//           );
//         }
//         toast.success(
//           `Payment status updated successfully to ${newPaymentStatus}.`,
//         );
//         await revalidationAdminDashboard();
//       } catch (error) {
//         toast.error("Failed to update payment status in database.");
//         console.error("Error updating payment status:", error);
//       }
//     }
//   };

//   const handleSelectionUpdate = async (
//     id: string,
//     newSelectionStatus: string,
//   ) => {
//     if (
//       window.confirm(
//         `Are you sure you want to mark selection as ${newSelectionStatus}?`,
//       )
//     ) {
//       setRegistrations((prev) =>
//         prev.map((reg) => {
//           if (reg.id === id) {
//             return { ...reg, selectionStatus: newSelectionStatus };
//           }
//           return reg;
//         }),
//       );

//       try {
//         const { status, response } = await honoFetch<ApiResponse>(
//           `/api/registrations/${id}/status`,
//           {
//             method: "PATCH",
//             body: JSON.stringify({ selectionStatus: newSelectionStatus }),
//             credentials: "include",
//           },
//         );

//         if (status !== 200 || !response?.success) {
//           throw new Error(
//             response?.message || "Failed to update selection status.",
//           );
//         }
//         toast.success(
//           `Selection status updated successfully to ${newSelectionStatus}.`,
//         );
//         await revalidationAdminDashboard();
//       } catch (error) {
//         toast.error("Failed to update selection status in database.");
//         console.error("Error updating selection status:", error);
//       }
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6 bg-[#0B0F19] min-h-screen text-slate-200 font-sans">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-white">
//             Registration Management
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             Review, verify payments manually, and select candidates.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition-colors shadow-sm text-sm flex items-center gap-2">
//             <Filter size={16} /> Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
//         <div className="relative w-full sm:w-96">
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search Name, Phone, TRK, or TrxID..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-white placeholder-slate-500"
//           />
//         </div>
//         <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0">
//           <select
//             value={eventFilter}
//             onChange={(e) => setEventFilter(e.target.value)}
//             className="px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 min-w-[150px] appearance-none"
//           >
//             <option value="ALL">All Events</option>
//             {uniqueEvents.map((event) => (
//               <option key={event} value={event}>
//                 {event}
//               </option>
//             ))}
//           </select>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 appearance-none"
//           >
//             <option value="ALL">All Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="VERIFIED">Verified</option>
//             <option value="REJECTED">Rejected</option>
//           </select>
//         </div>
//       </div>

//       {/* Registrations Table */}
//       <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg overflow-hidden">
//         <div className="overflow-x-auto md:overflow-visible w-full">
//           <table className="w-full text-left border-collapse table-auto md:table-fixed">
//             <thead>
//               <tr className="bg-slate-800/50 border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
//                 <th className="p-4 font-medium w-[140px]">Tracking & Date</th>
//                 <th className="p-4 font-medium">Participant Info</th>
//                 <th className="p-4 font-medium">Event</th>
//                 <th className="p-4 font-medium">Payment Details</th>
//                 <th className="p-4 font-medium w-[120px]">Selection</th>
//                 <th className="p-4 font-medium text-right w-[160px]">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/50 text-sm">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan={6} className="p-16 text-center">
//                     <div className="flex flex-col items-center justify-center text-slate-500">
//                       <Loader2
//                         size={32}
//                         className="animate-spin text-indigo-500 mb-4"
//                       />
//                       <p>Loading registrations data...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredRegistrations.length > 0 ? (
//                 filteredRegistrations.map((reg) => (
//                   <tr
//                     key={reg.id}
//                     className="hover:bg-slate-800/40 transition-colors group"
//                   >
//                     <td className="p-4 align-top">
//                       <div className="font-mono font-bold text-indigo-400 uppercase break-all">
//                         {reg.trackingId}
//                       </div>
//                       <div className="text-xs text-slate-500 mt-1 whitespace-nowrap">
//                         {formatDate(reg.date)}
//                       </div>
//                     </td>
//                     <td className="p-4 align-top">
//                       <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
//                           <User size={16} />
//                         </div>
//                         <div className="min-w-0">
//                           <p
//                             className="font-semibold text-white capitalize truncate"
//                             title={reg.guestName}
//                           >
//                             {reg.guestName}
//                           </p>
//                           <p className="text-xs text-slate-400 truncate">
//                             {reg.guestPhone}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 align-top">
//                       <p className="text-slate-200 font-medium break-words leading-tight">
//                         {reg.eventName}
//                       </p>
//                       <span className="inline-block px-2 py-0.5 mt-1.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 uppercase font-semibold tracking-wide">
//                         {reg.category}
//                       </span>
//                     </td>

//                     <td className="p-4 align-top">
//                       <div className="flex flex-col items-start gap-1.5">
//                         <span
//                           className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${
//                             reg.paymentStatus === "VERIFIED" ||
//                             reg.paymentStatus === "FREE"
//                               ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
//                               : reg.paymentStatus === "REJECTED"
//                                 ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
//                                 : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
//                           }`}
//                         >
//                           {reg.paymentStatus}
//                         </span>

//                         {reg.finance && (
//                           <div className="flex flex-col gap-0.5 mt-1 border-l-2 border-slate-700 pl-2.5">
//                             {reg.finance.discountAmount > 0 ? (
//                               <>
//                                 <span className="text-[11px] text-slate-400">
//                                   Base:{" "}
//                                   <span className="line-through">
//                                     ৳{reg.finance.baseAmount}
//                                   </span>
//                                 </span>
//                                 <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
//                                   Discount: -৳{reg.finance.discountAmount}
//                                 </span>
//                                 <span className="text-[11px] font-medium text-slate-300 mt-0.5">
//                                   Paid:{" "}
//                                   <span className="text-white font-bold">
//                                     ৳{reg.finance.paidAmount}
//                                   </span>
//                                 </span>
//                               </>
//                             ) : (
//                               <span className="text-[11px] font-medium text-slate-300 mt-0.5">
//                                 Paid:{" "}
//                                 <span className="text-white font-bold">
//                                   ৳{reg.finance.paidAmount}
//                                 </span>
//                               </span>
//                             )}

//                             <span className="text-[11px] text-slate-500 font-mono mt-1 flex flex-wrap items-center gap-1">
//                               Trx:{" "}
//                               <span className="font-semibold text-slate-300 break-all">
//                                 {reg.transactionId || "N/A"}
//                               </span>
//                             </span>
//                           </div>
//                         )}

//                         {reg.couponDetails && (
//                           <div className="mt-1 flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-300 font-medium w-max">
//                             <Tag size={10} />
//                             {reg.couponDetails.code} (-
//                             {reg.couponDetails.discountPercentage}%)
//                           </div>
//                         )}
//                       </div>
//                     </td>

//                     <td className="p-4 align-top">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
//                           reg.selectionStatus === "APPROVED"
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : reg.selectionStatus === "REJECTED"
//                               ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
//                               : "bg-blue-500/10 text-blue-400 border-blue-500/20"
//                         }`}
//                       >
//                         {reg.selectionStatus === "APPROVED" && (
//                           <CheckCircle2 size={14} className="mr-1.5 shrink-0" />
//                         )}
//                         {reg.selectionStatus === "REJECTED" && (
//                           <XCircle size={14} className="mr-1.5 shrink-0" />
//                         )}
//                         {reg.selectionStatus === "PENDING" && (
//                           <Clock size={14} className="mr-1.5 shrink-0" />
//                         )}
//                         {reg.selectionStatus}
//                       </span>
//                     </td>

//                     <td className="p-4 text-right align-top">
//                       {/* 💡 অ্যাকশন বাটনগুলোকে ফ্লেক্স-র‍্যাপ করা হয়েছে যেন জায়গা কম পেলে ভেঙে যায় */}
//                       <div className="flex flex-wrap items-center justify-end gap-2">
//                         <button
//                           onClick={() => setSelectedReg(reg)}
//                           className="p-2 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-colors border border-transparent hover:border-indigo-500/30"
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>

//                         {reg.paymentStatus === "PENDING" && (
//                           <button
//                             onClick={() =>
//                               handlePaymentUpdate(reg.id, "VERIFIED")
//                             }
//                             className="p-2 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
//                             title="Verify Payment"
//                           >
//                             <Receipt size={16} />
//                           </button>
//                         )}

//                         {reg.selectionStatus !== "APPROVED" && (
//                           <button
//                             onClick={() =>
//                               handleSelectionUpdate(reg.id, "APPROVED")
//                             }
//                             className="p-2 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
//                             title="Approve Candidate"
//                           >
//                             <CheckCircle2 size={16} />
//                           </button>
//                         )}

//                         {reg.selectionStatus !== "REJECTED" && (
//                           <button
//                             onClick={() =>
//                               handleSelectionUpdate(reg.id, "REJECTED")
//                             }
//                             className="p-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors border border-transparent hover:border-rose-500/30"
//                             title="Reject Candidate"
//                           >
//                             <XCircle size={16} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="p-10 text-center text-slate-500">
//                     <div className="flex flex-col items-center">
//                       <Search size={32} className="text-slate-600 mb-3" />
//                       <p>No registrations found matching your criteria.</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Dynamic Details Modal (Dark Mode) */}
//       {selectedReg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
//             <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-800 bg-slate-900/50 shrink-0">
//               <div>
//                 <h2 className="text-xl font-bold text-white">
//                   Registration Details
//                 </h2>
//                 <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
//                   <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">
//                     {selectedReg.trackingId}
//                   </span>
//                   <span>•</span>
//                   <span>{selectedReg.date}</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedReg(null)}
//                 className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-5 md:p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-1 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
//                   <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                     Participant
//                   </p>
//                   <p className="font-semibold text-white text-lg capitalize mt-1">
//                     {selectedReg.guestName}
//                   </p>
//                   <p className="text-sm text-slate-400">
//                     {selectedReg.guestPhone}
//                   </p>
//                 </div>
//                 <div className="space-y-1 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
//                   <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
//                     Event Info
//                   </p>
//                   <p className="font-semibold text-white text-lg mt-1">
//                     {selectedReg.eventName}
//                   </p>
//                   <span className="inline-block px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600 uppercase font-medium mt-1">
//                     {selectedReg.category}
//                   </span>
//                 </div>
//               </div>

//               {/* Finance & Payment Info inside Modal */}
//               {selectedReg.rawPayments &&
//                 selectedReg.rawPayments.length > 0 && (
//                   <div className="border border-slate-800 rounded-xl p-5 bg-slate-800/30">
//                     <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
//                       <Receipt size={16} className="text-indigo-400" />
//                       Financial Breakdown
//                     </h3>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 border-b border-slate-700/50 pb-4">
//                       <div>
//                         <p className="text-slate-500 text-xs mb-1">
//                           Base Amount
//                         </p>
//                         <p className="font-medium text-slate-300">
//                           ৳{selectedReg.finance?.baseAmount || 0}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-slate-500 text-xs mb-1">Discount</p>
//                         <p className="font-medium text-emerald-400">
//                           {selectedReg.finance &&
//                           selectedReg.finance.discountAmount > 0
//                             ? `-৳${selectedReg.finance.discountAmount}`
//                             : "৳0"}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-slate-500 text-xs mb-1">
//                           Paid Amount
//                         </p>
//                         <p className="font-bold text-white text-base">
//                           ৳{selectedReg.finance?.paidAmount || 0}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-slate-500 text-xs mb-1">
//                           Coupon Used
//                         </p>
//                         {selectedReg.couponDetails ? (
//                           <span className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[11px] font-medium">
//                             <Tag size={10} />
//                             {selectedReg.couponDetails.code} (-
//                             {selectedReg.couponDetails.discountPercentage}%)
//                           </span>
//                         ) : (
//                           <p className="font-medium text-slate-400">None</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//                       {selectedReg.rawPayments.map((payment, i) => (
//                         <div key={i} className="contents">
//                           <div>
//                             <p className="text-slate-500 text-xs mb-1">TrxID</p>
//                             <p className="font-mono font-medium text-slate-200">
//                               {payment.transactionId || "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-slate-500 text-xs mb-1">
//                               Method
//                             </p>
//                             <p className="font-medium text-slate-200 capitalize">
//                               {payment.paymentMethod?.replace("_", " ") ||
//                                 "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-slate-500 text-xs mb-1">
//                               Status
//                             </p>
//                             <p
//                               className={`font-semibold text-xs px-2 py-0.5 rounded inline-block ${
//                                 payment.status === "VERIFIED"
//                                   ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
//                                   : payment.status === "REJECTED"
//                                     ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
//                                     : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
//                               }`}
//                             >
//                               {payment.status}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//               <div>
//                 <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
//                   <ClipboardList size={18} className="text-indigo-400" />
//                   Submitted Form Details
//                 </h3>
//                 <div className="bg-slate-900 rounded-xl">
//                   {selectedReg.rawMetadata &&
//                   Object.keys(selectedReg.rawMetadata).length > 0 ? (
//                     <DynamicDataRenderer data={selectedReg.rawMetadata} />
//                   ) : (
//                     <p className="text-sm text-slate-500 italic">
//                       No additional details were provided.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3 shrink-0">
//               <button
//                 onClick={() => setSelectedReg(null)}
//                 className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
//               >
//                 Close Details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












"use client";

import { revalidationAdminDashboard } from "@/actions/registrationActions";
import { formatDate } from "@/lib/DateAndTimeFormater";
import { honoFetch } from "@/lib/hono-client";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Eye,
  Filter,
  Loader2,
  Receipt,
  Search,
  Tag,
  User,
  X,
  XCircle,
  UploadCloud,
  LinkIcon, // 💡 নতুন আইকন যুক্ত করা হয়েছে
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";
import Link from "next/link";

// ==========================================
// 💡 Types based on your Drizzle Schema
// ==========================================
interface PaymentData {
  status: string;
  paidAmount?: number;
  baseAmount?: number;
  transactionId?: string;
  paymentMethod?: string;
  couponUsed?: string | null;
  screenshot?: string | null;
}

interface CouponDetails {
  code: string;
  discountPercentage: number;
}

interface FinanceData {
  baseAmount: number;
  discountAmount: number;
  paidAmount: number;
  screenshot: string | null;
}

// 💡 সাবমিশন ডাটার ইন্টারফেস
interface SubmissionData {
  id: string;
  submissionData: Record<string, unknown>;
  createdAt: string;
}

interface FormMetadata {
  commonDetails?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  registrationData?: {
    name?: string;
    phone?: string;
  };
  couponId?: string;
  eventType?: string;
  [key: string]: unknown;
}

interface RegistrationData {
  id: string;
  trackingNumber: string;
  selectionStatus: string;
  createdAt: string;
  couponId: string | null;
  metadata: FormMetadata | string | null;
  event?: {
    title: string;
    eventType: string;
  };
  payments?: PaymentData[];
  submissions?: SubmissionData[]; // 💡 সাবমিশন রিসিভ করার টাইপ
  couponDetails?: CouponDetails | null;
  finance?: FinanceData;
}

interface MappedRegistration {
  id: string;
  trackingId: string;
  guestName: string;
  guestPhone: string;
  eventName: string;
  category: string;
  paymentStatus: string;
  transactionId: string | null;
  selectionStatus: string;
  date: string;
  rawMetadata: FormMetadata;
  rawPayments: PaymentData[];
  rawSubmissions: SubmissionData[]; // 💡 ম্যাপ করা সাবমিশন
  finance: FinanceData | null;
  couponDetails: CouponDetails | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: RegistrationData[];
}

// ==========================================
// 💡 Helper Functions for Dynamic Data Render
// ==========================================
const formatKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
};

const DynamicDataRenderer = ({ data }: { data: unknown }) => {
  if (data === null || data === undefined || data === "") {
    return <span className="text-slate-500 italic text-sm">N/A</span>;
  }

  if (typeof data === "boolean") {
    return (
      <span className="text-sm font-medium text-slate-200">
        {data ? "Yes" : "No"}
      </span>
    );
  }

  if (typeof data !== "object") {
    const stringData = String(data);
    const isUrl = /^(https?:\/\/[^\s]+)$/i.test(stringData);

    if (isUrl) {
      return (
        <a
          href={stringData}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2 break-all transition-colors flex items-center gap-1 w-fit"
        >
          View Attachment
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      );
    }

    return (
      <span className="text-sm font-medium text-slate-200 break-words">
        {stringData}
      </span>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0)
      return <span className="text-slate-500 text-sm">Empty</span>;
    return (
      <div className="space-y-3 mt-1">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">
              Item #{idx + 1}
            </span>
            <DynamicDataRenderer data={item} />
          </div>
        ))}
      </div>
    );
  }

  const entries = Object.entries(data as Record<string, unknown>);
  if (entries.length === 0)
    return <span className="text-slate-500 text-sm">No details</span>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {entries.map(([key, value]) => {
        const isObject = typeof value === "object" && value !== null;
        return (
          <div
            key={key}
            className={`${
              isObject
                ? "sm:col-span-2 border-t border-slate-700/50 pt-3 mt-1"
                : ""
            }`}
          >
            <p className="text-xs font-medium text-slate-400 mb-1">
              {formatKey(key)}
            </p>
            {isObject ? (
              <div className="mt-2">
                <DynamicDataRenderer data={value} />
              </div>
            ) : (
              <DynamicDataRenderer data={value} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// Main Page Component
// ==========================================
export default function RegistrationManagementPage() {
  const [registrations, setRegistrations] = useState<MappedRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");
  const [selectedReg, setSelectedReg] = useState<MappedRegistration | null>(
    null,
  );

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { status, response } = await honoFetch<ApiResponse>(
          "/api/registrations",
          {
            credentials: "include",
          },
        );

        if (status === 200 && response?.data && Array.isArray(response.data)) {
          const formattedData: MappedRegistration[] = response.data.map(
            (reg: RegistrationData) => {
              let meta: FormMetadata = {};
              if (typeof reg.metadata === "string") {
                try {
                  meta = JSON.parse(reg.metadata) as FormMetadata;
                } catch {
                  meta = {};
                }
              } else if (reg.metadata && typeof reg.metadata === "object") {
                meta = reg.metadata as FormMetadata;
              }

              const payment =
                reg.payments && reg.payments.length > 0
                  ? reg.payments[0]
                  : null;

              return {
                id: reg.id,
                trackingId: reg.trackingNumber,
                guestName:
                  meta?.commonDetails?.name ||
                  meta?.registrationData?.name ||
                  meta?.commonDetails?.email?.split("@")[0] ||
                  "Guest User",
                guestPhone:
                  meta?.commonDetails?.phone ||
                  meta?.registrationData?.phone ||
                  "N/A",
                eventName: reg.event?.title || "Unknown Event",
                category: reg.event?.eventType || "General",
                paymentStatus: payment ? payment.status : "FREE",
                transactionId: payment?.transactionId || null,
                selectionStatus: reg.selectionStatus,
                date: new Date(reg.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                rawMetadata: meta,
                rawPayments: reg.payments || [],
                rawSubmissions: reg.submissions || [], // 💡 সাবমিশন ডাটা যুক্ত
                finance: reg.finance || null,
                couponDetails: reg.couponDetails || null,
              };
            },
          );

          setRegistrations(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const uniqueEvents = Array.from(
    new Set(registrations.map((reg) => reg.eventName)),
  );

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.guestPhone.includes(searchQuery) ||
      (reg.transactionId &&
        reg.transactionId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" || reg.selectionStatus === statusFilter;

    const matchesEvent = eventFilter === "ALL" || reg.eventName === eventFilter;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handlePaymentUpdate = async (id: string, newPaymentStatus: string) => {
    if (
      window.confirm(
        `Are you sure you want to mark payment as ${newPaymentStatus}?`,
      )
    ) {
      setRegistrations((prev) =>
        prev.map((reg) => {
          if (reg.id === id) {
            return {
              ...reg,
              paymentStatus: newPaymentStatus,
              rawPayments: reg.rawPayments.map((payment, index) =>
                index === 0
                  ? { ...payment, status: newPaymentStatus }
                  : payment,
              ),
            };
          }
          return reg;
        }),
      );

      try {
        const { status, response } = await honoFetch<ApiResponse>(
          `/api/registrations/${id}/status`,
          {
            method: "PATCH",
            body: JSON.stringify({ paymentStatus: newPaymentStatus }),
            credentials: "include",
          },
        );

        if (status !== 200 || !response?.success) {
          throw new Error(
            response?.message || "Failed to update payment status.",
          );
        }
        toast.success(
          `Payment status updated successfully to ${newPaymentStatus}.`,
        );
        await revalidationAdminDashboard();
      } catch (error) {
        toast.error("Failed to update payment status in database.");
        console.error("Error updating payment status:", error);
      }
    }
  };

  const handleSelectionUpdate = async (
    id: string,
    newSelectionStatus: string,
  ) => {
    if (
      window.confirm(
        `Are you sure you want to mark selection as ${newSelectionStatus}?`,
      )
    ) {
      setRegistrations((prev) =>
        prev.map((reg) => {
          if (reg.id === id) {
            return { ...reg, selectionStatus: newSelectionStatus };
          }
          return reg;
        }),
      );

      try {
        const { status, response } = await honoFetch<ApiResponse>(
          `/api/registrations/${id}/status`,
          {
            method: "PATCH",
            body: JSON.stringify({ selectionStatus: newSelectionStatus }),
            credentials: "include",
          },
        );

        if (status !== 200 || !response?.success) {
          throw new Error(
            response?.message || "Failed to update selection status.",
          );
        }
        toast.success(
          `Selection status updated successfully to ${newSelectionStatus}.`,
        );
        await revalidationAdminDashboard();
      } catch (error) {
        toast.error("Failed to update selection status in database.");
        console.error("Error updating selection status:", error);
      }
    }
  };

  // ==========================================
  // 💡 Export CSV Handler (Using Papa Parse)
  // ==========================================
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      toast.error("No data available to export!");
      return;
    }

    // Papa Parse-এর জন্য অবজেক্টের একটি অ্যারে তৈরি করছি (কী (key) গুলোই হবে হেডার)
    const exportData = filteredRegistrations.map((reg) => ({
      "Tracking ID": reg.trackingId,
      "Registration Date": reg.date,
      "Participant Name": reg.guestName,
      "Email Address": reg.rawMetadata.commonDetails?.email || "N/A",
      "Phone Number": reg.guestPhone,
      "Event Name": reg.eventName,
      Category: reg.category,
      "Payment Status": reg.paymentStatus,
      "Base Amount": reg.finance?.baseAmount || 0,
      Discount: reg.finance?.discountAmount || 0,
      "Paid Amount": reg.finance?.paidAmount || 0,
      "Transaction ID": reg.transactionId || "N/A",
      "Coupon Used": reg.couponDetails?.code || "None",
      "Selection Status": reg.selectionStatus,
    }));

    // Papa.unparse() দিয়ে JSON Data থেকে সরাসরি পারফেক্ট CSV স্ট্রিং জেনারেট
    const csvContent = Papa.unparse(exportData);

    // Blob তৈরি করে ডাউনলোডের ব্যবস্থা করা
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      `Registrations_Export_${new Date().toISOString().split("T")[0]}.csv`,
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("CSV file downloaded successfully!");
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6 bg-[#0B0F19] min-h-screen text-slate-200 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Registration Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review, verify payments manually, and select candidates.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition-colors shadow-sm text-sm flex items-center gap-2"
          >
            <Filter size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Name, Phone, TRK, or TrxID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-white placeholder-slate-500"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 min-w-[150px] appearance-none"
          >
            <option value="ALL">All Events</option>
            {uniqueEvents.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-200 appearance-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto md:overflow-visible w-full">
          <table className="w-full text-left border-collapse table-auto md:table-fixed">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium w-[140px]">Tracking & Date</th>
                <th className="p-4 font-medium">Participant Info</th>
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">Payment Details</th>
                <th className="p-4 font-medium w-[120px]">Selection</th>
                <th className="p-4 font-medium text-right w-[160px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <Loader2
                        size={32}
                        className="animate-spin text-indigo-500 mb-4"
                      />
                      <p>Loading registrations data...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="p-4 align-top">
                      <div className="font-mono font-bold text-indigo-400 uppercase break-all">
                        {reg.trackingId}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 whitespace-nowrap">
                        {formatDate(reg.date)}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                          <User size={16} />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="font-semibold text-white capitalize truncate"
                            title={reg.guestName}
                          >
                            {reg.guestName}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {reg.guestPhone}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {reg.rawMetadata.commonDetails?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-slate-200 font-medium break-words leading-tight">
                        {reg.eventName}
                      </p>
                      <span className="inline-block px-2 py-0.5 mt-1.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 uppercase font-semibold tracking-wide">
                        {reg.category}
                      </span>
                    </td>

                    <td className="p-4 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap ${
                            reg.paymentStatus === "VERIFIED" ||
                            reg.paymentStatus === "FREE"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : reg.paymentStatus === "REJECTED"
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {reg.paymentStatus}
                        </span>

                        {reg.finance && (
                          <div className="flex flex-col gap-0.5 mt-1 border-l-2 border-slate-700 pl-2.5">
                            {reg.finance.discountAmount > 0 ? (
                              <>
                                <span className="text-[11px] text-slate-400">
                                  Base:{" "}
                                  <span className="line-through">
                                    ৳{reg.finance.baseAmount}
                                  </span>
                                </span>
                                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                                  Discount: -৳{reg.finance.discountAmount}
                                </span>
                                <span className="text-[11px] font-medium text-slate-300 mt-0.5">
                                  Paid:{" "}
                                  <span className="text-white font-bold">
                                    ৳{reg.finance.paidAmount}
                                  </span>
                                </span>
                              </>
                            ) : (
                              <span className="text-[11px] font-medium text-slate-300 mt-0.5">
                                Paid:{" "}
                                <span className="text-white font-bold">
                                  ৳{reg.finance.paidAmount}
                                </span>
                              </span>
                            )}

                            <span className="text-[11px] text-slate-500 font-mono mt-1 flex flex-wrap items-center gap-1">
                              Trx:{" "}
                              <span className="font-semibold text-slate-300 break-all">
                                {reg.transactionId || "N/A"}
                              </span>
                            </span>
                          </div>
                        )}

                        {reg.couponDetails && (
                          <div className="mt-1 flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-300 font-medium w-max">
                            <Tag size={10} />
                            {reg.couponDetails.code} (-
                            {reg.couponDetails.discountPercentage}%)
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                          reg.selectionStatus === "APPROVED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : reg.selectionStatus === "REJECTED"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {reg.selectionStatus === "APPROVED" && (
                          <CheckCircle2 size={14} className="mr-1.5 shrink-0" />
                        )}
                        {reg.selectionStatus === "REJECTED" && (
                          <XCircle size={14} className="mr-1.5 shrink-0" />
                        )}
                        {reg.selectionStatus === "PENDING" && (
                          <Clock size={14} className="mr-1.5 shrink-0" />
                        )}
                        {reg.selectionStatus}
                      </span>
                    </td>

                    <td className="p-4 text-right align-top">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-2 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-colors border border-transparent hover:border-indigo-500/30"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>

                        {reg.paymentStatus === "PENDING" && (
                          <button
                            onClick={() =>
                              handlePaymentUpdate(reg.id, "VERIFIED")
                            }
                            className="p-2 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
                            title="Verify Payment"
                          >
                            <Receipt size={16} />
                          </button>
                        )}

                        {/* 💡 শুধুমাত্র 'team' ইভেন্টের জন্য Approve/Reject বাটন দেখাবে */}
                        {reg.category === "team" &&
                          reg.selectionStatus !== "APPROVED" && (
                            <button
                              onClick={() =>
                                handleSelectionUpdate(reg.id, "APPROVED")
                              }
                              className="p-2 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
                              title="Approve Candidate"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}

                        {reg.category === "team" &&
                          reg.selectionStatus !== "REJECTED" && (
                            <button
                              onClick={() =>
                                handleSelectionUpdate(reg.id, "REJECTED")
                              }
                              className="p-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors border border-transparent hover:border-rose-500/30"
                              title="Reject Candidate"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <Search size={32} className="text-slate-600 mb-3" />
                      <p>No registrations found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Details Modal (Dark Mode) */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-800 bg-slate-900/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Registration Details
                </h2>
                <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                  <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">
                    {selectedReg.trackingId}
                  </span>
                  <span>•</span>
                  <span>{selectedReg.date}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Participant
                  </p>
                  <p className="font-semibold text-white text-lg capitalize mt-1">
                    {selectedReg.guestName}
                  </p>
                  <p className="text-sm text-slate-400">
                    {selectedReg.guestPhone}
                  </p>
                </div>
                <div className="space-y-1 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Event Info
                  </p>
                  <p className="font-semibold text-white text-lg mt-1">
                    {selectedReg.eventName}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600 uppercase font-medium mt-1">
                    {selectedReg.category}
                  </span>
                </div>
              </div>

              {/* Finance & Payment Info inside Modal */}
              {selectedReg.rawPayments &&
                selectedReg.rawPayments.length > 0 && (
                  <div className="border border-slate-800 rounded-xl p-5 bg-slate-800/30">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Receipt size={16} className="text-indigo-400" />
                      Financial Breakdown
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 border-b border-slate-700/50 pb-4">
                      <div>
                        <p className="text-slate-500 text-xs mb-1">
                          Base Amount
                        </p>
                        <p className="font-medium text-slate-300">
                          ৳{selectedReg.finance?.baseAmount || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Discount</p>
                        <p className="font-medium text-emerald-400">
                          {selectedReg.finance &&
                          selectedReg.finance.discountAmount > 0
                            ? `-৳${selectedReg.finance.discountAmount}`
                            : "৳0"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">
                          Paid Amount
                        </p>
                        <p className="font-bold text-white text-base">
                          ৳{selectedReg.finance?.paidAmount || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">
                          Coupon Used
                        </p>
                        {selectedReg.couponDetails ? (
                          <span className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[11px] font-medium">
                            <Tag size={10} />
                            {selectedReg.couponDetails.code} (-
                            {selectedReg.couponDetails.discountPercentage}%)
                          </span>
                        ) : (
                          <p className="font-medium text-slate-400">None</p>
                        )}
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">
                          payment ss
                        </p>
                        {selectedReg.finance?.screenshot ? (
                          <span className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[11px] font-medium">
                            <LinkIcon size={10} />
                            <Link href={selectedReg.finance?.screenshot || "#"} target="_blank" rel="noopener noreferrer">
                              {"click to view"}
                            </Link> 
                          </span>
                        ) : (
                          <p className="font-medium text-slate-400">N/A</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {selectedReg.rawPayments.map((payment, i) => (
                        <div key={i} className="contents">
                          <div>
                            <p className="text-slate-500 text-xs mb-1">TrxID</p>
                            <p className="font-mono font-medium text-slate-200">
                              {payment.transactionId || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">
                              Method
                            </p>
                            <p className="font-medium text-slate-200 capitalize">
                              {payment.paymentMethod?.replace("_", " ") ||
                                "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-xs mb-1">
                              Status
                            </p>
                            <p
                              className={`font-semibold text-xs px-2 py-0.5 rounded inline-block ${
                                payment.status === "VERIFIED"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : payment.status === "REJECTED"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {payment.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
                  <ClipboardList size={18} className="text-indigo-400" />
                  Submitted Form Details
                </h3>
                <div className="bg-slate-900 rounded-xl">
                  {selectedReg.rawMetadata &&
                  Object.keys(selectedReg.rawMetadata).length > 0 ? (
                    <DynamicDataRenderer data={selectedReg.rawMetadata} />
                  ) : (
                    <p className="text-sm text-slate-500 italic">
                      No additional details were provided.
                    </p>
                  )}
                </div>
              </div>

              {/* 💡 Project Submission Details in Modal */}
              {selectedReg.rawSubmissions &&
                selectedReg.rawSubmissions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
                      <UploadCloud size={18} className="text-emerald-400" />
                      Project Submission
                    </h3>
                    <div className="bg-slate-900 rounded-xl space-y-4">
                      {selectedReg.rawSubmissions.map((sub, idx) => (
                        <div
                          key={sub.id || idx}
                          className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4"
                        >
                          <DynamicDataRenderer data={sub.submissionData} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedReg(null)}
                className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
