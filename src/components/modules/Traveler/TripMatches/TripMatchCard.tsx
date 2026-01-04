import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ITripMatch } from "@/types/tripMatch.interface";
import { Calendar, MapPin, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TripMatchCardProps {
  trip: ITripMatch;
}

export default function TripMatchCard({ trip }: TripMatchCardProps) {
  // Date Formatting
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link href={`/travel-plans/${trip.id}`} className="group h-full block">
      <Card className="h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50 flex flex-col relative">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {trip?.imageUrl ? (
            <Image
              src={trip?.imageUrl}
              alt={trip?.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/30 text-muted-foreground">
              <MapPin className="h-10 w-10 opacity-20" />
            </div>
          )}

          {/* Budget Badge Overlay */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm shadow-sm font-semibold"
            >
              {trip?.budgetRange}
            </Badge>
          </div>

          {/* Traveler Type Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm shadow-sm text-xs">
              {trip?.travelType}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="grow p-5">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {trip?.title}
            </h3>
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
          </div>

          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-primary" />
            <span className="truncate">{trip?.destination}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {trip?.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/30 p-2 rounded-md w-fit">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>
              {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
            </span>
          </div>
        </CardContent>

        {/* Footer: Traveler Info */}
        <CardFooter className="p-4 pt-0 mt-auto border-t bg-secondary/10 flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage
              src={trip?.traveler?.profileImage}
              alt={trip?.traveler?.name}
            />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              Hosted by {trip?.traveler?.name.split(" ")[0]}
            </span>
            <span className="text-[10px] text-muted-foreground line-clamp-1">
              {trip?.traveler?.travelInterests.slice(0, 2).join(", ")}...
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}