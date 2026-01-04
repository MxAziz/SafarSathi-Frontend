import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ITraveler } from "@/types/traveler.interface";
import { MapPin, Star, Verified } from "lucide-react";

interface TravelerCardProps {
  traveler: ITraveler;
  onClick: () => void;
}

export default function TravelerCard({ traveler, onClick }: TravelerCardProps) {
  return (
    <Card
      onClick={onClick}
      className="
        group relative overflow-hidden cursor-pointer h-full flex flex-col
        border-muted transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:border-primary/40
      "
    >
      {/* subtle gradient glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />

      <CardHeader className="relative z-10 flex flex-row items-center gap-4 pb-2">
        <div className="relative">
          <Avatar className="h-16 w-16 border border-border shadow-md transition-transform duration-300 group-hover:scale-105">
            <AvatarImage
              src={traveler?.profileImage as string}
              alt={traveler?.name}
              className="object-cover"
            />
            <AvatarFallback>{traveler?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          {traveler?.isVerifiedTraveler && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-primary/90 text-white p-1 shadow">
              <Verified className="w-4 h-4 fill-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-semibold text-lg leading-none transition-colors group-hover:text-primary">
                {traveler.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {traveler?.currentLocation}
              </p>
            </div>

            {traveler?.averageRating > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600">
                <Star className="w-3.5 h-3.5 fill-yellow-500" />
                {traveler?.averageRating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {traveler?.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {traveler?.travelInterests?.slice(0, 3).map((interest, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs font-normal rounded-full px-3 py-1 transition-colors group-hover:bg-primary/10"
            >
              {interest}
            </Badge>
          ))}

          {traveler?.travelInterests?.length > 3 && (
            <span className="text-xs text-muted-foreground self-center">
              +{traveler?.travelInterests?.length - 3} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-0 pb-4 text-xs text-muted-foreground">
        <span className="transition-all group-hover:text-primary">
          Click to view full profile & contact details →
        </span>
      </CardFooter>
    </Card>
  );
}
