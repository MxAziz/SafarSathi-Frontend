export interface ITraveler {
  id: string;
  name: string;
  email: string;
  contactNumber: string | null;
  address: string | null;
  profileImage: string | null;
  bio: string | null;
  travelInterests: string[];
  visitedCountries: string[];
  currentLocation: string | null;
  averageRating: number;
  isVerifiedTraveler: boolean;
  subscriptionEndDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}