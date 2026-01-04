export interface IDashboardStats {
  totalTrips: number;
  totalMatches: number;
  completedTrips: number;
  averageRating: number;
  isVerified: boolean;
}

export interface IUpcomingTrip {
  id: string;
  destination: string;
  startDate: string;
  image: string;
  daysLeft: number;
}

export interface IRecentMatch {
  id: string;
  name: string;
  image: string;
  matchScore: number;
  location: string;
}