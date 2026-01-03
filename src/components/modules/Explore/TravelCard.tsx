import Image from "next/image";
import { format } from "date-fns";
import { MapPin, Calendar, Wallet, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

const TravelCard = ({ plan }: { plan: ITravelPlan }) => {
  return (
    <Link href={`/travel-plans/${plan?.id}`}>
      <Card className="group h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-colors hover:border-gray-300 dark:hover:border-gray-700 shadow-none">
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <Image
            src={plan.imageUrl}
            alt={plan.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-black backdrop-blur-sm hover:bg-white font-medium shadow-none border-none"
            >
              {plan.travelType}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
              {plan.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="truncate">{plan.destination}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium">
                {format(new Date(plan.startDate), "dd MMM")} -{" "}
                {format(new Date(plan.endDate), "dd MMM, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Wallet className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium truncate">
                {plan.budgetRange}
              </span>
            </div>
          </div>
        </CardContent>

        {/* Footer (Traveler Info) */}
        <CardFooter className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarImage src={plan.traveler.profileImage} />
              <AvatarFallback>{plan.traveler.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {plan.traveler.name}
              </span>
              <span className="text-[10px] text-gray-500">Host</span>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 dark:bg-gray-900">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {plan.traveler.averageRating}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TravelCard;