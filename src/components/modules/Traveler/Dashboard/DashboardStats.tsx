import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { IDashboardStats } from "@/types/stats.interface";
import { Map, Users, Star, Plane } from "lucide-react";

export default function DashboardStats({ stats }: { stats: IDashboardStats }) {
  const statItems = [
    {
      title: "Active Plans",
      value: stats.totalTrips,
      icon: Map,
      color: "text-blue-500",
    },
    {
      title: "Travel Buddies",
      value: stats.totalMatches,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Completed Trips",
      value: stats.completedTrips,
      icon: Plane,
      color: "text-purple-500",
    },
    {
      title: "Avg. Rating",
      value: stats.averageRating,
      icon: Star,
      color: "text-yellow-500",
      suffix: " / 5",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <NumberTicker value={item.value} />
              {item.suffix && <span className="text-lg">{item.suffix}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}