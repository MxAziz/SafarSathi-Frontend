import TravelerGrid from "@/components/modules/Explore-Travelers/TravelerGrid";
// import Pagination from "@/components/shared/Pagination";
// import SearchFilter from "@/components/shared/SearchFilter";
// import SelectFilter from "@/components/shared/SelectFilter";
import { getAllTravelers } from "@/services/traveler/traveler.service";
import { IMeta, ITraveler } from "@/types/traveler.interface";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Travelers | Find Your Perfect Trip Companion - GoPal",
  description:
    "Connect with travelers worldwide on GoPal. Browse profiles, filter by interests and location, and find your perfect travel buddy for your next adventure.",
  keywords: [
    "Explore Travelers",
    "Find Travel Buddy",
    "Traveler Search",
    "Backpacker Community",
    "Travel Partner",
    "GoPal Community",
    "Trip Companion",
    "Global Travelers",
  ],
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

export default async function ExplorePage(props: Props) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(key, val));
      } else {
        params.append(key, value);
      }
    }
  });

  const queryString = params.toString();

  const { data: travelers, meta }: { data: ITraveler[]; meta: IMeta } =
    await getAllTravelers(queryString);

  const hasFilters = params.toString().length > 0;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black pt-10 pb-20">
      <div className="container mx-auto px-4 ">
        {/* --- Header Section --- */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl flex items-center gap-3">
            Explore Travelers
          </h1>
          <p className="max-w-2xl text-muted-foreground text-lg">
            Connect with travelers worldwide. Find your perfect travel buddy
            based on interests, location, and vibe.
          </p>
        </div>

        {/* --- Search & Filter Toolbar --- */}
        <div className="mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl border-none shadow-none flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input (Takes available space) */}
          <div className="w-full md:flex-1">
            <SearchFilter
              placeholder="Search by name, bio, or location..."
              paramName="searchTerm"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex gap-3 w-full md:w-auto items-center">
            <div className="w-full md:w-[180px]">
              <SelectFilter
                paramName="gender"
                placeholder="Filter by Gender"
                options={genderOptions}
              />
            </div>

            <div className="h-10 w-10 flex items-center justify-center rounded-md border bg-background text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* --- Content Area --- */}
        {travelers && travelers.length > 0 ? (
          <>
            <TravelerGrid travelers={travelers} />

            {meta && meta.totalPages > 1 && (
              <div className="py-12 flex justify-center ">
                <Pagination
                  currentPage={meta.page}
                  totalPage={meta.totalPages}
                />
              </div>
            )}
          </>
        ) : (
          /* --- Not Found State --- */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-dashed">
            <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-full shadow-inner mb-6">
              <SearchX className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              No Travelers Found
            </h3>
            <p className="text-gray-500 max-w-sm mt-2">
              {hasFilters
                ? "We couldn't find anyone matching your search or filters. Try adjusting your criteria."
                : "There are no travelers available at the moment to show."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}