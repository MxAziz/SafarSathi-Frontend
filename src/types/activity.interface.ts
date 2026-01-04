export interface IActivity {
  id: string;
  type: "REVIEW" | "TRIP_CREATE" | "PAYMENT" | "USER_REGISTER";
  message: string;
  createdAt: string;
}