import ActivityFeed from "@/components/modules/Admin/ManageActivity/ActivityFeed";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { getSystemActivities } from "@/services/admin/activity.service";
import { Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Shadcn utility
// import { Metadata } from "next";


type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// // ✅ Dynamic Metadata for Activity Logs
// export async function generateMetadata({
//   searchParams,
// }: Props): Promise<Metadata> {
//   const queryParams = await searchParams;
//   const type = (queryParams?.type as string) || "ALL";

//   const titleMap: Record<string, string> = {
//     ALL: "System Activity Log",
//     USER_REGISTER: "User Join Logs",
//     TRIP_CREATE: "Trip Creation Logs",
//     PAYMENT: "Financial Transactions",
//     REVIEW: "Review Activity",
//   };

//   const pageTitle = titleMap[type] || "Activity Log";

//   return {
//     title: `${pageTitle} | Admin Dashboard - SafarSathi`,
//     description:
//       "Monitor real-time system events, financial transactions, and user activities across the SafarSathi platform.",
//     robots: {
//       index: false,
//       follow: false,
//     },
//   };
// }

const filters = [
  { label: "All Events", value: "ALL" },
  { label: "User Joins", value: "USER_REGISTER" },
  { label: "Trips Created", value: "TRIP_CREATE" },
  { label: "Payments", value: "PAYMENT" },
  { label: "Reviews", value: "REVIEW" },
];

const ManageActivityPage = async ({ searchParams }: PageProps) => {
  const queryParams = await searchParams;

  const page = typeof queryParams?.page === "string" ? queryParams.page : "1";
  const limit = "10";
  const activeType =
    typeof queryParams?.type === "string" ? queryParams.type : "ALL";

  const queryString = `page=${page}&limit=${limit}&type=${activeType}&sortBy=createdAt&sortOrder=desc`;

  const { data: activities = [], meta } = await getSystemActivities(
    queryString
  );

  return (
    <div className="container mx-auto  py-8  space-y-8">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-2 border-b pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Activity className="h-6 w-6" />
          </div>
          Activity Log
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg">
          Monitor real-time system events. Track users, financial transactions,
          and content updates in one unified timeline.
        </p>
      </div>

      {/* 2. Modern Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const isActive = activeType === filter.value;
          return (
            <Link
              key={filter.value}
              href={`?type=${filter.value}&page=1`}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Main Content Feed */}
      <div className="min-h-[400px]">
        {activities && activities.length > 0 ? (
          <div className="bg-background/50 rounded-xl">
            <ActivityFeed activities={activities} />

            {/* Pagination */}
            {meta?.total > 0 && (
              <div className="mt-10 flex justify-center border-t pt-6">
                <Pagination
                  currentPage={Number(page)}
                  totalPage={meta?.totalPages || 1}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12">
            <EmptyState
              message={`No activities found for filter: ${activeType
                .replace("_", " ")
                .toLowerCase()}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageActivityPage;