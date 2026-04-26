export interface EventCardProps {
  id: string | number;
  title: string;
  image: string;
  subtitle?: string;
  type?: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  fee?: string;
  seatsTotal: number;
  seatsFilled: number;
  onRegister?: () => void;
}
