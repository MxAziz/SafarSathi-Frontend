export interface Traveler {
  id: string;
  name: string;
  email: string;
  averageRating: number;
  profileImage: string;
}

export interface ITravelPlan {
  id: string;
  title: string;
  description: string;
  destination: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  budgetRange: string;
  travelType: "FAMILY" | "FRIENDS" | "SOLO" | "COUPLE" | "GROUP";
  visibility: boolean;
  traveler: Traveler;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export enum TravelType {
  SOLO = "SOLO",
  FAMILY = "FAMILY",
  FRIENDS = "FRIENDS",
  COUPLE = "COUPLE",
  GROUP = "GROUP",
}