import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IUpcomingTrip } from "@/types/stats.interface";

export default function UpcomingTripCard({
  trip,
}: {
  trip: IUpcomingTrip | null;
}) {
  if (!trip) {
    return (
      <Card className="h-full bg-secondary/10 border-dashed border-2 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 bg-background rounded-full mb-3">
          <MapPin className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No Upcoming Trips</h3>
        <p className="text-muted-foreground text-sm mb-4">
          You haven&apos;t planned your next adventure yet.
        </p>
        <Link href="/dashboard/my-travel-plans">
          <Button>Create a Travel Plan</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden relative group">
      <div className="absolute inset-0 z-0">
        <Image
          src={trip.image}
          alt={trip.destination}
          fill
          className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Next Adventure
        </CardTitle>
        <CardDescription>Get ready for your journey!</CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-1">
            {trip.destination}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Starts on {new Date(trip.startDate).toDateString()}</span>
          </div>
        </div>

        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          In {trip.daysLeft} Days
        </div>

        <div className="pt-2">
          <Link href={`/dashboard/my-travel-plans`}>
            <Button
              variant="outline"
              className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            >
              View Itinerary <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}