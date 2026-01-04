"use client";

import { ITripMatch } from "@/types/tripMatch.interface";
import TripMatchCard from "./TripMatchCard";
import { Frown } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

export default function TripMatchGrid({ trips }: { trips: ITripMatch[] }) {
  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-secondary/50 p-6 rounded-full mb-4">
          <Frown className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Matches Found</h3>
        <p className="text-muted-foreground max-w-sm">
          We couldn&apos;t find any trips matching your interests right now. Try
          updating your profile interests or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {trips.map((trip, index) => (
        <BlurFade key={trip.id} delay={0.1 + index * 0.05} inView>
          <TripMatchCard trip={trip} />
        </BlurFade>
      ))}
    </div>
  );
}