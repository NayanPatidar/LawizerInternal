/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type UserProfile = {
  uid: string;
  name: string;
  email: string;
};

type UpcomingBooking = {
  id: string;
  serviceName: string;
  expertName: string;
  date: string;
  time: string;
  duration: number;
  fee: number;
  status: "pending" | "confirmed" | "cancelled";
};

type TopExpert = {
  uid: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  experience: number;
};

type UserDashboard = {
  upcomingCount: number;
  completedCount: number;
  expertsConsulted: number;
  totalSpent: number;
  upcomingBookings: UpcomingBooking[];
  topExperts: TopExpert[];
};

// types/user.ts

export type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type ConsultationStatus = "pending" | "confirmed" | "cancelled";

export type UserConsultation = {
  bookingId: string;
  userId: string;
  expertUid: string;
  expertId: string;
  expertName: string;
  expertType: "adv" | "ca";
  callType: "voice" | "video" | "chat";
  bookingDate: FirestoreTimestamp;
  bookedAt: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  rate: number | null;
  serviceId?: string;
  status: ConsultationStatus;
};
