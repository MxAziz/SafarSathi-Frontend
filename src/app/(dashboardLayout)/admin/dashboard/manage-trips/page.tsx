import Pagination from "@/components/shared/Pagination";
import TripsTable from "@/components/modules/Admin/ManageTrips/TripsTable";
import { getTravelPlans } from "@/services/traveler/travelPlan.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Trips | Admin Dashboard - SafarSathi",
  description:
    "Administrator view for managing travel plans. Monitor active trips, review itineraries, enforce community guidelines, and oversee all travel activities on SafarSathi.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = {
  searchParams: {
    page?: string;
    searchTerm?: string;
  };
};

const ManageTripsPage = async ({ searchParams }: SearchParams) => {
  // Await searchParams in Next.js 15+
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = 10;

  // Query construction
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  if (params?.searchTerm) {
    queryParams.append("searchTerm", params.searchTerm);
  }

  // Data Fetching
  const { data: travelPlans, meta } = await getTravelPlans(
    queryParams.toString()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Trips</h1>
          <p className="text-muted-foreground">
            Efficiently oversee and manage all user-created travel plans.
          </p>
        </div>
        {/* Search Box Placeholder */}
        <div className="relative w-full sm:w-64">{/* <SearchInput /> */}</div>
      </div>

      {/* Trips Table */}
      <TripsTable trips={travelPlans || []} />

      {/* Pagination (Conditionally Rendered) */}
      {travelPlans && travelPlans.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={meta?.page || 1}
            totalPage={meta?.totalPages || 1}
          />
        </div>
      )}
    </div>
  );
};

export default ManageTripsPage;