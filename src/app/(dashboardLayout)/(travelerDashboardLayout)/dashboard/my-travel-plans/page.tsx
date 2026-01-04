import TravelPlanManager from "@/components/modules/Traveler/MyTravelPlan/TravelPlanManager";
import { getMyTravelPlans } from "@/services/traveler/travelPlan.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Travel Plans | Manage Trips & Itineraries - SafarSathi",
  description:
    "Organize your upcoming adventures. Create new plans, update itineraries, manage trip budgets, and track your travel schedule efficiently from your SafarSathi dashboard.",
  robots: {
    index: false,
    follow: true,
  },
};

const MyTravelPlansPage = async () => {
  const { data: travelPlans } = await getMyTravelPlans();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight ">My Travel Plans</h1>
        <p className="text-muted-foreground mt-2">
          Manage your upcoming trips, budgets, and itineraries all in one place.
        </p>
      </div>

      <TravelPlanManager initialData={travelPlans} />
    </div>
  );
};

export default MyTravelPlansPage;