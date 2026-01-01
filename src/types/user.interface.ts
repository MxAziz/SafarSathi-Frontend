export interface IAuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "TRAVELER";
}

export interface IUserInfo {
  data: {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    address: string;
    profileImage: string;
    bio: string;
    travelInterests: string[];
    visitedCountries: string[];
    currentLocation: string;
    averageRating: number;
    isVerifiedTraveler: boolean;
    subscriptionEndDate: string;
    createdAt: string;
    updatedAt: string;
    user: IUserBasic;
  };
}

export interface IUserBasic {
  id: string;
  email: string;
  needPasswordChange: boolean;
  role: "TRAVELER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  gender: "MALE" | "FEMALE" | "OTHER";
}