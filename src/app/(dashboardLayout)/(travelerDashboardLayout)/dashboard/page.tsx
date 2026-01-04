import BlurFade from "@/components/magicui/blur-fade";
import DashboardStats from "@/components/modules/Traveler/Dashboard/DashboardStats";
import ProfileSummary from "@/components/modules/Traveler/Dashboard/ProfileSummary";
import UpcomingTripCard from "@/components/modules/Traveler/Dashboard/UpcomingTripCard";
import { Button } from "@/components/ui/button";
import { getTravelerDashboardData } from "@/services/stats/stats.service";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getTravelerDashboardData();
  const firstName = data?.user?.name?.split(" ")[0] || "Traveler";
  return {
    title: `${firstName}'s Dashboard | Overview - SafarSathi`,
    description:
      "Track your travel stats, view upcoming trips, and manage your travel buddy connections effectively on SafarSathi.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

const TravelerDashboardPage = async () => {
  const { data } = await getTravelerDashboardData();
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* 1. Welcome Section */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {data?.user?.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your travel plans today.
            </p>
          </div>
          <Link href="/dashboard/trip-matches">
            <Button className=" text-white border-0 shadow-lg hover:shadow-xl transition-all">
              <Sparkles className="w-4 h-4 mr-2" /> Find Travel Buddies
            </Button>
          </Link>
        </div>
      </BlurFade>

      {/* 2. Stats Section */}
      <BlurFade delay={0.2} inView>
        <DashboardStats stats={data?.stats} />
      </BlurFade>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Trip */}
          <BlurFade delay={0.3} inView>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">
                  Upcoming Adventure
                </h2>
                <Link
                  href="/dashboard/my-travel-plans"
                  className="text-sm text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <UpcomingTripCard trip={data?.upcomingTrip} />
            </div>
          </BlurFade>

          {/* Recent Matches Preview (Optional - You can reuse your Match Card logic here in a smaller version) */}
          <BlurFade delay={0.4} inView>
            <div className="bg-secondary/20 rounded-xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/my-travel-plans">
                  <Button variant="outline">Create New Plan</Button>
                </Link>
                <Link href="/explore-travelers">
                  <Button variant="outline">Browse Travelers</Button>
                </Link>
                <Link href="/my-profile">
                  <Button variant="outline">Update Interests</Button>
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Right Column (1/3) - Sidebar */}
        <div className="lg:col-span-1">
          <BlurFade delay={0.5} inView>
            <ProfileSummary user={data?.user} />
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboardPage;