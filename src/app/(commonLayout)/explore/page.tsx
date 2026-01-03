import EmptyState from "@/components/modules/Explore/EmptyState";
import TravelCardGrid from "@/components/modules/Explore/TravelCardGrid";
import { getTravelPlans } from "@/services/traveler/travelPlan.service";
import { Metadata } from "next";

type SearchParams = {
  searchTerm?: string;
  travelType?: string;
  startDate?: string;
  endDate?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const term = query.searchTerm;
  const type = query.travelType;

  let title = "Explore All Adventures | Find Your Travel Companion - SafarSathi";
  let description =
    "Browse through hundreds of travel plans. Filter by destination, travel type, and dates to find your next shared adventure on SafarSathi.";

  if (term) {
    const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);
    title = `Trips to ${capitalizedTerm} | Find Travel Buddies - SafarSathi`;
    description = `Looking for a trip to ${capitalizedTerm}? Discover detailed travel plans, itineraries, and find the perfect travel buddy for your adventure in ${capitalizedTerm}.`;
  } else if (type) {
    title = `${type} Travel Plans | Join a Group - SafarSathi`;
    description = `Find the best ${type} travel packages and meetup opportunities. Plan your journey with like-minded travelers.`;
  }

  return {
    title,
    description,
    keywords: [
      term || "Travel Plans",
      "Adventure Search",
      "Find Trips",
      "Travel Buddy",
      "SafarSathi Explore",
      "Shared Travel",
    ],
  };
}

const ExplorePage = async ({ searchParams }: PageProps) => {
  const query = await searchParams;

  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  const { data: travelPlans } = await getTravelPlans(queryString);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-background">
      {/* Main Content Container */}
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Subtle & Clean Header - Left Aligned */}
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl tracking-tight font-bold text-gray-900 dark:text-gray-50 md:text-3xl">
            {query.searchTerm ? (
              <>
                Stays in <span className="capitalize">{query.searchTerm}</span>
              </>
            ) : (
              "Explore All Adventures"
            )}
          </h1>

          {/* Optional: Show result count for professionalism */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {travelPlans?.length || 0} travel plans found
          </p>
        </div>

        {/* Content Area */}
        {travelPlans?.length > 0 ? (
          <TravelCardGrid travelPlans={travelPlans} />
        ) : (
          <div className="mt-10">
            <EmptyState message="Try changing your destination, dates, or travel type" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;