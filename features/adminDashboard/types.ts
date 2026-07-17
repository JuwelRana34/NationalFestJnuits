// ১. স্ট্যাটস অংশের টাইপ
export interface DashboardStats {
  totalRevenue: number;
  totalRegistrations: number;
  pendingVerifications: number;
  activeEvents: number;
}

// ২. রিসেন্ট রেজিস্ট্রেশন লিস্টের টাইপ
export interface RecentRegistration {
  id: string;
  trackingId: string;
  name: string;
  eventName: string;
  amount: number;
  status: "PENDING" | "VERIFIED" | "REJECTED"; // আপনার ডাটাবেস স্কিমার enum অনুযায়ী
  createdAt: string; // API থেকে JSON হয়ে আসলে Date অবজেক্টটি String বা Number হয়ে যায়
}

// ৩. কুইক অ্যাকশন অংশের টাইপ
export interface DashboardQuickActions {
  newSubmissionsCount: number;
}

// ৪. মূল ডেটা অবজেক্টের টাইপ (যেটা API এর data ফিল্ডে থাকে)
export interface DashboardData {
  stats: DashboardStats;
  recentRegistrations: RecentRegistration[];
  quickActions: DashboardQuickActions;
}

// ৫. ফুল API রেসপন্স টাইপ (honoFetch এর জন্য)
export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
