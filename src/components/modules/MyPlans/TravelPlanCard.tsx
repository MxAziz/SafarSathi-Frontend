import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Calendar, MapPin, Wallet, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import { format } from "date-fns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

interface TravelPlanCardProps {
  plan: ITravelPlan;
}

export default function TravelPlanCard({ plan }: TravelPlanCardProps) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop";

  return (
    <Link href={`/travel-plans/${plan.id}`}>
      <Card className="group h-full w-full overflow-hidden rounded-xl border-none border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-colors hover:border-gray-300 dark:hover:border-gray-700 shadow-none py-0">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={plan?.imageUrl || fallbackImage}
            alt={plan?.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge
              variant={plan?.visibility ? "default" : "secondary"}
              className={`backdrop-blur-md ${
                plan?.visibility ? "bg-green-500/80" : "bg-gray-500/80"
              }`}
            >
              {plan?.visibility ? (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Public
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> Private
                </span>
              )}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/80 backdrop-blur-md text-black font-semibold"
            >
              {plan?.travelType}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardHeader className="px-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle
                className="text-lg font-medium line-clamp-1"
                title={plan?.title}
              >
                {plan?.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1 text-primary" />
                {plan?.destination}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow px-2 pb-2">
          <CardDescription className="line-clamp-2 mb-4 text-gray-600">
            {plan?.description.slice(0, 100)}...
          </CardDescription>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="font-medium">
                {format(new Date(plan.startDate), "MMM dd")} -{" "}
                {format(new Date(plan.endDate), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 ">
              <Wallet className="w-4 h-4 text-green-600" />
              <span className="font-medium">{plan.budgetRange}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}