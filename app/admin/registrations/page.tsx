"use client";

import { revalidationAdminDashboard } from "@/actions/registrationActions";
import { honoFetch } from "@/lib/hono-client";
import {
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Loader2,
  Search,
  User,
  X,
  XCircle,
  Receipt,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";

// ==========================================
// 💡 Types based on your Drizzle Schema
// ==========================================
interface PaymentData {
  status: string;
  paidAmount?: number;
  transactionId?: string;
  paymentMethod?: string;
}

// 💡 মেটাডেটার জন্য প্রপার টাইপ ডিক্লেয়ারেশন (No more "any")
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
  [key: string]: unknown; // ডায়নামিক অন্যান্য ফিল্ড অ্যালাউ করার জন্য
}

interface RegistrationData {
  id: string;
  trackingNumber: string;
  registermail?: string;
  selectionStatus: string;
  createdAt: string;
  couponId: string | null;
  metadata: FormMetadata | string | null; // Database থেকে স্ট্রিং বা অবজেক্ট আসতে পারে
  event?: {
    title: string;
    eventType: string;
  };
  payments?: PaymentData[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: RegistrationData[];
}

interface MappedRegistration {
  id: string;
  trackingId: string;
  guestName: string;
  guestPhone: string;
  eventName: string;
  category: string;
  paymentStatus: string;
  paidAmount: number | null;
  transactionId: string | null;
  couponId: string | null;
  selectionStatus: string;
  date: string;
  rawMetadata: FormMetadata; // "any" রিমুভ করা হয়েছে
  rawPayments: PaymentData[];
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

// 💡 data prop-এ "unknown" ব্যবহার করা হয়েছে "any" এর বদলে
const DynamicDataRenderer = ({ data }: { data: unknown }) => {
  if (data === null || data === undefined || data === "") {
    return <span className="text-gray-400 italic text-sm">N/A</span>;
  }
  if (typeof data === "boolean") {
    return (
      <span className="text-sm font-medium text-gray-900">
        {data ? "Yes" : "No"}
      </span>
    );
  }
  if (typeof data !== "object") {
    return (
      <span className="text-sm font-medium text-gray-900 break-words">
        {String(data)}
      </span>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0)
      return <span className="text-gray-400 text-sm">Empty</span>;
    return (
      <div className="space-y-3 mt-1">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 border border-gray-100 rounded-lg"
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">
              Item #{idx + 1}
            </span>
            <DynamicDataRenderer data={item} />
          </div>
        ))}
      </div>
    );
  }

  // Object এর জন্য Type Casting
  const entries = Object.entries(data as Record<string, unknown>);
  if (entries.length === 0)
    return <span className="text-gray-400 text-sm">No details</span>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {entries.map(([key, value]) => {
        const isObject = typeof value === "object" && value !== null;
        return (
          <div
            key={key}
            className={`${
              isObject ? "sm:col-span-2 border-t border-gray-100 pt-3 mt-1" : ""
            }`}
          >
            <p className="text-xs font-medium text-gray-500 mb-1">
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
        const { status, response } =
          await honoFetch<ApiResponse>("/api/registrations");

        if (status === 200 && response?.data && Array.isArray(response.data)) {
          const formattedData: MappedRegistration[] = response.data.map(
            (reg: RegistrationData) => {
              // 💡 Type Safe Metadata Parsing
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
                couponId: reg.couponId || meta?.couponId || null,
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
                paidAmount: payment?.paidAmount || null,
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

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) {
      // 💡 Optimistic UI Update: Selection Status এবং Payment Status দুটোই সাথে সাথে আপডেট হবে
      setRegistrations((prev) =>
        prev.map((reg) => {
          if (reg.id === id) {
            let newPaymentStatus = reg.paymentStatus;
            if (newStatus === "APPROVED") newPaymentStatus = "VERIFIED";
            else if (newStatus === "REJECTED") newPaymentStatus = "REJECTED";

            return {
              ...reg,
              selectionStatus: newStatus,
              paymentStatus: newPaymentStatus,
              // Modal-এ দেখানোর জন্য rawPayments-ও আপডেট করে দিচ্ছি
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
            body: JSON.stringify({ selectionStatus: newStatus }),
          },
        );

        if (status !== 200 || !response?.success) {
          throw new Error(response?.message || "Failed to update status.");
        }
       await revalidationAdminDashboard(); 
      } catch (error) {
        alert("Failed to update status in database.");
        // রিয়েল-ওয়ার্ল্ড অ্যাপে এখানে API ফেইল করলে আবার fetchRegistrations() কল করে স্টেট রিস্টোর করা যায়।
      }
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Registration Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review, verify payments manually, and select candidates.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm flex items-center gap-2">
            <Filter size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Name, Phone, TRK, or TrxID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700 min-w-[150px]"
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
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            {/* 💡 "SELECTED" এর বদলে "APPROVED" দেওয়া হলো */}
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium whitespace-nowrap">
                  Tracking & Date
                </th>
                <th className="p-4 font-medium whitespace-nowrap">
                  Participant Info
                </th>
                <th className="p-4 font-medium whitespace-nowrap">Event</th>
                <th className="p-4 font-medium whitespace-nowrap">
                  Payment Details
                </th>
                <th className="p-4 font-medium whitespace-nowrap">Selection</th>
                <th className="p-4 font-medium text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Loader2
                        size={32}
                        className="animate-spin text-indigo-600 mb-4"
                      />
                      <p>Loading registrations data...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="font-mono font-bold text-indigo-600 uppercase">
                        {reg.trackingId}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {reg.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 capitalize">
                            {reg.guestName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {reg.guestPhone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-800 font-medium whitespace-nowrap">
                        {reg.eventName}
                      </p>
                      <span className="inline-block px-2 py-0.5 mt-1 bg-gray-100 text-gray-600 text-[10px] rounded uppercase font-semibold tracking-wide">
                        {reg.category}
                      </span>
                    </td>

                    {/* Payment Details Column */}
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase whitespace-nowrap ${
                            reg.paymentStatus === "VERIFIED" ||
                            reg.paymentStatus === "FREE"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : reg.paymentStatus === "REJECTED"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          }`}
                        >
                          {reg.paymentStatus}
                        </span>

                        {(reg.paidAmount !== null || reg.transactionId) && (
                          <div className="flex flex-col gap-0.5 mt-1 border-l-2 border-gray-200 pl-2">
                            <span className="text-[11px] font-medium text-gray-500">
                              Amount:{" "}
                              <span className="text-gray-900 font-bold">
                                ৳{reg.paidAmount || 0}
                              </span>
                            </span>
                            <span className="text-[11px] text-gray-500 font-mono">
                              Trx:{" "}
                              <span className="font-semibold text-gray-800">
                                {reg.transactionId || "N/A"}
                              </span>
                            </span>
                          </div>
                        )}

                        {reg.couponId && (
                          <span className="text-[10px] text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 mt-0.5">
                            🎟️ {reg.couponId}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          reg.selectionStatus === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : reg.selectionStatus === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {reg.selectionStatus === "APPROVED" && (
                          <CheckCircle2 size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus === "REJECTED" && (
                          <XCircle size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus === "PENDING" && (
                          <Clock size={14} className="mr-1" />
                        )}
                        {reg.selectionStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {/* 💡 এখানেও APPROVED করে দেওয়া হয়েছে */}
                        {reg.selectionStatus !== "APPROVED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg.id, "APPROVED")
                            }
                            className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            title="Accept"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        {reg.selectionStatus !== "REJECTED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg.id, "REJECTED")
                            }
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="Reject"
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
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Search size={32} className="text-gray-300 mb-3" />
                      <p>No registrations found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Details Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Registration Details
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="font-mono text-indigo-600 font-semibold">
                    {selectedReg.trackingId}
                  </span>
                  <span>•</span>
                  <span>{selectedReg.date}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Participant
                  </p>
                  <p className="font-semibold text-gray-900 text-lg capitalize">
                    {selectedReg.guestName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedReg.guestPhone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Event Info
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedReg.eventName}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded uppercase font-medium">
                    {selectedReg.category}
                  </span>
                </div>
              </div>

              {selectedReg.rawPayments &&
                selectedReg.rawPayments.length > 0 && (
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Receipt size={16} className="text-gray-400" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {selectedReg.rawPayments.map((payment, i) => (
                        <div key={i} className="contents">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">
                              Amount Paid
                            </p>
                            <p className="font-medium text-gray-900">
                              {payment.paidAmount
                                ? `৳${payment.paidAmount}`
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">TrxID</p>
                            <p className="font-mono font-medium text-gray-900">
                              {payment.transactionId || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Method</p>
                            <p className="font-medium text-gray-900 capitalize">
                              {payment.paymentMethod?.replace("_", " ") ||
                                "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Status</p>
                            <p
                              className={`font-semibold ${
                                payment.status === "VERIFIED"
                                  ? "text-green-600"
                                  : payment.status === "REJECTED"
                                    ? "text-red-600"
                                    : "text-yellow-600"
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
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <ClipboardList size={18} className="text-indigo-500" />
                  Submitted Form Details
                </h3>
                <div className="bg-white rounded-xl">
                  {selectedReg.rawMetadata &&
                  Object.keys(selectedReg.rawMetadata).length > 0 ? (
                    <DynamicDataRenderer data={selectedReg.rawMetadata} />
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No additional details were provided.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedReg(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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