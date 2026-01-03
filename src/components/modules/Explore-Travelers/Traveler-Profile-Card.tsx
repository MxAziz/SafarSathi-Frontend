import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ITraveler } from "@/types/traveler.interface";

import { MapPin, ShieldCheck, Star } from "lucide-react";

export function TravelerProfileCard({ traveler }: { traveler: ITraveler }) {
  return (
    <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm shadow-none border-none">
      {/* Cover/Background Pattern */}
      <div className="h-32 bg-linear-to-r from-blue-500/10 to-purple-500/10 w-full absolute top-0 left-0 z-0" />

      <CardContent className="pt-12 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 pb-6">
        {/* Profile Image with Ring */}
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-zinc-950 shadow-xl">
            <AvatarImage
              src={traveler?.profileImage as string}
              alt={traveler?.name}
              className="object-cover"
            />
            <AvatarFallback>
              {traveler?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {traveler?.isVerifiedTraveler && (
            <div
              className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full shadow-lg"
              title="Verified Traveler"
            >
              <ShieldCheck size={16} />
            </div>
          )}
        </div>

        {/* Name and Basic Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {traveler?.name}
            </h1>
            <div className="flex gap-2">
              {traveler?.isVerifiedTraveler ? (
                <Badge
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Verified
                </Badge>
              ) : (
                <Badge variant="secondary">Unverified</Badge>
              )}
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-yellow-500/50 text-yellow-600"
              >
                <Star size={12} fill="currentColor" />{" "}
                {traveler?.averageRating > 0
                  ? traveler.averageRating.toFixed(1)
                  : "New"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 dark:text-zinc-400">
            <MapPin size={16} />
            <span>{traveler?.currentLocation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}