import BlurFade from "@/components/magicui/blur-fade";
import { getTravelPlans } from "@/services/traveler/travelPlan.service";
import { IMeta, ITravelPlan } from "@/types/travelPlan.interface";
import { SearchX } from "lucide-react";
import SearchFilter from "@/components/shared/SearchFilter";

import { DateRangeFilter } from "@/components/shared/DateRangeFilter";

import Pagination from "@/components/shared/Pagination";
import { TravelCard } from "@/components/modules/TravelPlan/TravelCard";
import SelectFilter from "@/components/shared/SelectFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Travel Buddy & Join Trips | Explore Plans - SafarSathi",
  description:
    "Browse upcoming travel itineraries created by the SafarSathi community. Filter by destination, date, or trip style (Solo, Couple, Group) to find your ideal travel companion.",
  keywords: [
    "Travel Plans",
    "Join a Trip",
    "Group Travel",
    "Solo Trip Plans",
    "Travel Itinerary",
    "Find Travel Buddy",
    "Vacation Planner",
    "Bangladesh Travel",
  ],
};
interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const travelTypeOptions = [
  { label: "Solo Adventure", value: "SOLO" },
  { label: "Family Trip", value: "FAMILY" },
  { label: "Friends Trip", value: "FRIENDS" },
  { label: "Couple Getaway", value: "COUPLE" },
  { label: "Group Tour", value: "GROUP" },
];

export default async function TravelPlansPage(props: Props) {
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

  const { data: plans, meta }: { data: ITravelPlan[]; meta: IMeta } =
    await getTravelPlans(queryString);

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-black py-12">
      <div className="container mx-auto px-4 ">
        {/* Header Section */}
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-900 dark:text-white flex items-center gap-3">
                Explore <span className="text-primary">Travel Plans</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Find your perfect travel buddy by searching destination, dates,
                or travel style.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* --- Advanced Filter Section (UPDATED) --- */}
        <BlurFade delay={0.15} inView>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border-none border-gray-200 dark:border-zinc-800 shadow-none mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* 1. Search Input (Destination/Title) - Takes larger space */}
              <div className="md:col-span-5 lg:col-span-5">
                <SearchFilter
                  placeholder="Search destination (e.g. Cox's Bazar)..."
                  paramName="searchTerm"
                />
              </div>

              {/* 2. Travel Type Dropdown (SelectFilter) */}
              <div className="md:col-span-3 lg:col-span-3">
                <SelectFilter
                  paramName="travelType"
                  placeholder="Travel Type"
                  options={travelTypeOptions}
                />
              </div>

              {/* 3. Date Range Picker (New Component) */}
              <div className="md:col-span-4 lg:col-span-4">
                <DateRangeFilter className="w-full" />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Content Grid */}
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plans?.map((plan: ITravelPlan, index: number) => (
              <BlurFade key={plan.id} delay={0.2 + index * 0.05} inView>
                <TravelCard plan={plan} index={index} />
              </BlurFade>
            ))}
          </div>
        ) : (
          // Empty State Design
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800 text-center">
              <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-full shadow-sm mb-4">
                <SearchX className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                No Plans Found
              </h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                We couldn&apos;t find any plans matching your filters. Try
                adjusting your search criteria.
              </p>
            </div>
          </BlurFade>
        )}

        {/* Pagination */}
        {plans && plans?.length > 0 && meta && meta.totalPages > 1 && (
          <div className="py-12 flex justify-center">
            <Pagination currentPage={meta.page} totalPage={meta.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
