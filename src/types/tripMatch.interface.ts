export interface ITravelerProfile {
  name: string;
  email: string;
  profileImage: string;
  averageRating: number;
  travelInterests: string[];
}

export interface ITripMatch {
  id: string;
  title: string;
  description: string;
  destination: string;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  budgetRange: string;
  travelType: string;
  visibility: boolean;
  travelerId: string;
  traveler: ITravelerProfile;
}