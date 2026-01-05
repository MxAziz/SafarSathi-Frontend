import { getMatchesTravelPlan } from "@/services/traveler/travelPlan.service";

import MatchedPlans from "./MatchedPlans";

const FeaturedPlans = async () => {
  let matchedPlans = [];
  try {
    const result = await getMatchesTravelPlan();
    matchedPlans = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch matched plans:", error);
  }

  return <MatchedPlans plans={matchedPlans} />;
};

export default FeaturedPlans;