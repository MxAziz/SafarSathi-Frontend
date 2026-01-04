
export interface IBuddyRequest {
  id: string;
  travelPlanId: string;
  travelerId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  traveler: {
    id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  travelPlan: {
    id: string;
    destination: string;
    title: string;
  };
}