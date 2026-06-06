// --- Interfaces ---
export interface ResponsiblePerson {
  name: string;
  role: string;
  phone: string;
  email: string;
  socialLink?: string;
}

export interface CreateSegmentParams {
  title: string;
  subtitle?: string;
  type: string;
  description: string;
  extraMemberFee?: number;
  image?: string;
  date: string;
  time: string;
  venue: string;
  seatsTotal: number;
  seatsFilled: number;
  responsible: ResponsiblePerson[];
  isTeamEvent: boolean;
  minMembers?: number;
  maxMembers?: number;
  prizeMoney?: number;
  fee: number;
}


// for fetch data from api
export interface FullEvent extends CreateSegmentParams {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface EventsResponse {
  success: boolean;
  message: string;
  data: FullEvent[];
}

export interface SingleEventResponse {
  success: boolean;
  message: string;
  data: FullEvent;
}


export type EventCardItem = Pick<
  FullEvent,
  | "id"
  | "title"
  | "subtitle"
  | "type"
  | "date"
  | "time"
  | "venue"
  | "fee"
  | "seatsTotal"
  | "seatsFilled"
  | "isTeamEvent"
  | "minMembers"
  | "maxMembers"
  | "extraMemberFee"
>;

// API রেসপন্সের জন্য TypeScript Type

 export interface trackingSchema{
  id: string;
  trackingNumber: string;
  category: string;
  selectionStatus: "PENDING" | "SELECTED" | "REJECTED";
  segment: {
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    type: string;
  };
  user: {
    name: string;
    email: string;
    phone: string;
  };
 }
export interface TrackingResult {
  success: boolean;
  message: string;
  data: trackingSchema;

}