import TripMatchGrid from "@/components/modules/Traveler/TripMatches/TripMatchGrid";
import { getMatchesTravelPlan } from "@/services/traveler/travelPlan.service";

import { Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Trip Matches | Smart Recommendations - SafarSathi",
  description:
    "Discover travel plans curated just for you. Based on your interests and travel history, explore compatible trips and find your perfect travel buddies on SafarSathi.",
  robots: {
    index: false,
    follow: true,
  },
};

const TripMatchesPage = async () => {
  const { data: matchedTrips } = await getMatchesTravelPlan();

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 bg-primary/10 rounded-full animate-pulse">
            <Sparkles className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            Smart Recommendations
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Trip Matches For You
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Based on your profile and interests, we&apos;ve curated a list of
          exciting travel plans. Discover new adventures and connect with
          travelers who share your passion.
        </p>
      </div>

      {/* Main Grid Section */}
      <TripMatchGrid trips={matchedTrips} />
    </div>
  );
};

export default TripMatchesPage;