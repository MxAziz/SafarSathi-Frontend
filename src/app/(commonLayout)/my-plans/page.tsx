import BlurFade from "@/components/magicui/blur-fade";
import TravelPlanCard from "@/components/modules/MyPlans/TravelPlanCard";
import Pagination from "@/components/shared/Pagination";
import { getMyTravelPlans } from "@/services/traveler/travelPlan.service";
import { IMeta, ITravelPlan } from "@/types/travelPlan.interface";
import { SearchX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Travel Plans | Manage Your Adventures - SafarSathi",
  description:
    "View and manage your upcoming travel itineraries. Edit trip details, check schedules, and organize your journey efficiently on SafarSathi.",
  robots: {
    index: false,
    follow: true,
  },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyPlansPage(props: Props) {
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

  const { data, meta }: { data: ITravelPlan[]; meta: IMeta } =
    await getMyTravelPlans(queryString);

  return (
    <div className="container mx-auto px-4 pt-10 pb-20 min-h-screen space-y-8">
      {/* Header Section */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900">
              My Travel Plans
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your upcoming adventures and past memories.
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Content Grid */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((plan, idx) => (
            <BlurFade key={plan.id} delay={0.2 + idx * 0.05} inView>
              <TravelPlanCard plan={plan} />
            </BlurFade>
          ))}
        </div>
      ) : (
        // Empty State Design
        <BlurFade delay={0.2} inView>
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <SearchX className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              No Travel Plans Found
            </h3>
            <p className="text-gray-500 max-w-sm mt-2">
              You haven&apos;t created any travel plans yet. Start planning your
              next journey!
            </p>
          </div>
        </BlurFade>
      )}

      {/* Pagination Section */}
      {meta && meta.totalPages > 1 && (
        <div className="py-8 flex justify-center">
          <Pagination currentPage={meta.page} totalPage={meta.totalPages} />
        </div>
      )}
    </div>
  );
}