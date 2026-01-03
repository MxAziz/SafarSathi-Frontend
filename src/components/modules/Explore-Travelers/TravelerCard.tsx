import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ITraveler } from "@/types/traveler.interface";
import { CheckCircle2, MapPin, Globe, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const TravelerCard = ({ traveler }: { traveler: ITraveler }) => {
  return (
    <Link href={`/explore-travelers/${traveler?.id}`}>
      <Card className="group h-full relative flex flex-col justify-between overflow-hidden border bg-card transition-all duration-300 hover:border-primary/50 shadow-none">
        {/* Top Decorator Line */}
        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/40 via-primary to-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover Arrow Icon */}
        <div className="absolute right-4 top-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
          <ArrowUpRight className="text-muted-foreground" size={20} />
        </div>

        {/* Change 2: Added 'flex-1' to push the footer to the bottom */}
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Header: Avatar & Name */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-border shadow-sm group-hover:border-primary/50 transition-colors">
                <AvatarImage
                  src={traveler.profileImage || ""}
                  alt={traveler.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-muted text-lg font-bold text-muted-foreground">
                  {traveler.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Verified Badge */}
              {traveler.isVerifiedTraveler && (
                <div
                  className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5 shadow-sm"
                  title="Verified Traveler"
                >
                  <CheckCircle2 className="h-5 w-5 fill-blue-500 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="truncate text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {traveler.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {traveler.currentLocation || "Global Citizen"}
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground/70">
                Joined {new Date(traveler.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          {/* Change 3: Added 'min-h-[40px]' to keep alignment even if text is short */}
          <div className="mt-4 min-h-10">
            <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {traveler.bio ||
                "This traveler prefers to keep an air of mystery..."}
            </p>
          </div>

          {/* Interests Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {traveler.travelInterests.length > 0 ? (
              traveler.travelInterests.slice(0, 3).map((interest, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="font-normal text-xs text-muted-foreground bg-secondary/20 border-secondary hover:bg-secondary/40 hover:text-foreground transition-colors"
                >
                  {interest}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground italic py-1">
                No specific interests listed
              </span>
            )}
            {traveler.travelInterests.length > 3 && (
              <span className="text-xs text-muted-foreground flex items-center">
                +{traveler.travelInterests.length - 3} more
              </span>
            )}
          </div>
        </CardContent>

        {/* Footer Stats - Separated Background */}
        {/* 'mt-auto' ensures this stays at the bottom */}
        <div className="mt-auto border-t bg-muted/20 px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            {/* Countries Count */}
            <div className="flex items-center gap-2" title="Countries Visited">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {traveler.visitedCountries.length}
              </span>
              <span className="text-muted-foreground text-xs">Countries</span>
            </div>

            {/* Vertical Divider */}
            <div className="h-4 w-px bg-border" />

            {/* Rating */}
            <div className="flex items-center gap-2" title="Average Rating">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">
                {traveler.averageRating > 0
                  ? traveler.averageRating.toFixed(1)
                  : "New"}
              </span>
              {traveler.averageRating > 0 && (
                <span className="text-muted-foreground text-xs">/ 5.0</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TravelerCard;