export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  travelerId: string;
  traveler: {
    name: string;
    profileImage: string;
  };
}