import TravelersGrid from "@/components/modules/Traveler/ExploreTraveler/TravelersGrid";
import TravelLoader from "@/components/shared/TravelLoader";
import { getRecommendedTravelers } from "@/services/traveler/traveler.service";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Traveler Matches | Connect with Like-Minded Explorers - SafarSathi",
  description:
    "Discover your tribe. Based on your travel style and interests, browse our curated list of recommended travel buddies and start planning your next shared adventure.",
  robots: {
    index: false,
    follow: true,
  },
};

const ExploreTravelersPage = async () => {
  const { data: travelers } = await getRecommendedTravelers();
  return (
    <div className="container mx-auto py-10 ">
      {/* Header Section */}
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 bg-primary/10 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Travel Recommendations
          </span>
        </div>
        <h1 className="text-3xl  font-bold tracking-tight text-foreground mb-4">
          Connect with Like-Minded Travelers
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Based on your passion for adventure and cultural exploration,
          we&apos;ve curated a list of travelers who share your interests.
          Explore their profiles, see where they&apos;ve been, and connect for
          your next journey.
        </p>
      </div>

      {/* Main Grid Section */}

      <Suspense fallback={<TravelLoader fullScreen={false} />}>
        <TravelersGrid travelers={travelers} />
      </Suspense>
    </div>
  );
};

export default ExploreTravelersPage;