/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminStats } from "@/services/admin/adminStats.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import BlurFade from "@/components/magicui/blur-fade";
import { Users, Plane, DollarSign, Activity, UserPlus, MapPin, CalendarCheck, } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OverviewChart } from "@/components/modules/Admin/Dashboard/OverviewChart";
import { ReviewChart } from "@/components/modules/Admin/Dashboard/ReviewChart";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | System Overview & Analytics - SafarSathi",
  description:
    "Administrator control panel. Monitor user growth, trip activities, revenue streams, and system health in real-time.",
  robots: {
    index: false,
    follow: false,
  },
};

// Helper function to format activity date
const formatActivityDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

export default async function AdminDashboard() {
  const response = await getAdminStats();

  const stats = response?.success
    ? response.data
    : {
        counts: { totalUsers: 0, totalTrips: 0, activeTrips: 0, revenue: 0 },
        activityChart: [],
        recentActivity: [],
        reviewChart: [],
      };

  const { counts, activityChart, recentActivity, reviewChart } = stats;

  const statCards = [
    {
      title: "Total Travelers",
      value: counts.totalUsers,
      icon: Users,
      color: "text-blue-500",
      border: "border-l-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Trips",
      value: counts.activeTrips,
      icon: Plane,
      color: "text-green-500",
      border: "border-l-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: counts.revenue,
      prefix: "$",
      icon: DollarSign,
      color: "text-yellow-500",
      border: "border-l-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Total Trips Posted",
      value: counts.totalTrips,
      icon: Activity,
      color: "text-purple-500",
      border: "border-l-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your system overview.
          </p>
        </div>
      </div>

      {/* 1. KPI Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => (
          <BlurFade key={stat.title} delay={0.1 * idx} inView>
            <Card
              className={`overflow-hidden border-l-4 ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.prefix}
                  <NumberTicker value={stat.value} />
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* 2. Charts Section (Side by Side) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Growth Analytics */}
        <BlurFade delay={0.2} inView className="h-full">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle>Growth Analytics</CardTitle>
              <CardDescription>
                Platform growth over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <OverviewChart data={activityChart} />
            </CardContent>
          </Card>
        </BlurFade>

        {/* Review Trends */}
        <BlurFade delay={0.3} inView className="h-full">
          <Card className="shadow-md h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Review Trends</CardTitle>
                  <CardDescription>User satisfaction overview</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="hidden sm:flex items-center gap-1"
                >
                  <CalendarCheck className="w-3 h-3" /> Last 6 Months
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <ReviewChart data={reviewChart} />
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* 3. Recent Activity Section (Full Width) */}
      <BlurFade delay={0.4} inView>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Recent Activity
            </CardTitle>
            <CardDescription>
              Latest actions performed on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full pr-4">
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {recentActivity.map((activity: any, ) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                  >
                    <div
                      className={`
                            flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm mr-4
                            ${
                              activity.type === "TRIP_CREATED"
                                ? "bg-orange-50 border-orange-200 text-orange-600"
                                : "bg-blue-50 border-blue-200 text-blue-600"
                            }
                        `}
                    >
                      {activity.type === "TRIP_CREATED" ? (
                        <MapPin className="h-5 w-5" />
                      ) : (
                        <UserPlus className="h-5 w-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none text-foreground truncate">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.type === "TRIP_CREATED"
                          ? "New Trip"
                          : "New Registration"}
                      </p>
                    </div>

                    <div className="text-xs text-muted-foreground whitespace-nowrap bg-secondary px-2 py-1 rounded">
                      {formatActivityDate(activity.date)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}