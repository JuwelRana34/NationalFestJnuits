// --- Types ---

export type Role = "USER" | "ADMIN";
export type SelectionStatus = "PENDING" | "SELECTED" | "REJECTED";
export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";
export type TabKey = "overview" | "registrations" | "teams" | "submissions";

export interface Profile {
  id: string;
  festId: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  tShirtSize: string;
  image: string | null;
  role: Role;
}

export interface Payment {
  transactionId: string;
  paidAmount: number;
  baseAmount: number;
  status: PaymentStatus;
  paymentMethod: string;
}

export interface Segment {
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  image?: string | null;
  type?: string | null;
}

export interface Registration {
  id: string;
  trackingNumber: string;
  segmentId: string;
  userId: string;
  teamId: string;
  category: string;
  ambassadorCode: string | null;
  selectionStatus: SelectionStatus;
  metadata: string | null;
  couponId: string | null;
  createdAt: string;
  segment: Segment;
  payments: Payment[];
  team: {
    teamName: string;
    teamCode: string;
  };
}

export interface Member {
  name: string;
  phone: string;
  institution: string;
  isLeader: boolean;
}

export interface Team {
  id: string;
  teamName: string;
  teamCode: string;
  segmentId: string;
  creatorId: string;
  createdAt: string;
  segment: { title: string };
  members: Member[];
}

export interface DashboardData {
  profile: Profile;
  registrations: Registration[];
  teams: Team[];
  submissions: string[];
  //FIXME: Assuming submissions are represented as an array of strings (e.g., URLs or IDs)
}

export interface DashboardData {
  profile: Profile;
  registrations: Registration[];
  teams: Team[];
  submissions: string[]; // আপনার রেসপন্সে খালি অ্যারে ছিল, তাই default হিসেবে any[] বা unknown[] রাখা নিরাপদ
}

// API-এর পুরো রেসপন্সের জন্য র্যাপার ইন্টারফেস
export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}