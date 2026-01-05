import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Globe, FolderX } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import DeleteTripDialog from "./DeleteTripDialog";
import Image from "next/image";

// Interface based on your data
interface ITravelPlan {
  id: string;
  title: string;
  destination: string;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  budgetRange: string;
  travelType: string;
  traveler: {
    name: string;
    email: string;
  };
}

export default function TripsTable({ trips }: { trips: ITravelPlan[] }) {
  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Empty State
  if (!trips || trips.length === 0) {
    return (
      <Card className="shadow-sm border-none bg-background">
        <CardHeader>
          <CardTitle>Travel Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-muted/10 border-dashed">
            <div className="bg-muted p-4 rounded-full mb-3">
              <FolderX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Trips Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              There are no travel plans available to display at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-none bg-background">
      <CardHeader>
        <CardTitle>All Travel Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Trip Details</TableHead>
                <TableHead className="hidden md:table-cell">Host</TableHead>
                <TableHead className="hidden lg:table-cell">Dates</TableHead>
                <TableHead className="hidden xl:table-cell">Budget</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip, idx) => (
                <TableRow
                  key={trip.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  {/* 1. Trip Info (Image + Title + Destination) */}
                  <TableCell>
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 overflow-hidden rounded-md border bg-muted shrink-0">
                          {trip.imageUrl ? (
                            <Image
                              src={trip.imageUrl}
                              alt={trip.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-secondary">
                              <Globe className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className="font-medium text-sm truncate max-w-[180px]"
                            title={trip.title}
                          >
                            {trip.title}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3" /> {trip.destination}
                          </span>
                        </div>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 2. Host Info */}
                  <TableCell className="hidden md:table-cell">
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">
                            {trip.traveler.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {trip.traveler.name}
                        </span>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 3. Date Range */}
                  <TableCell className="hidden lg:table-cell">
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex flex-col text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(trip.startDate)}</span>
                        </div>
                        <span className="text-xs ml-4 text-muted-foreground/70">
                          to {formatDate(trip.endDate)}
                        </span>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 4. Budget */}
                  <TableCell className="hidden xl:table-cell">
                    <BlurFade delay={0.05 * idx} inView>
                      <Badge variant="outline" className="font-normal">
                        {trip.budgetRange}
                      </Badge>
                    </BlurFade>
                  </TableCell>

                  {/* 5. Travel Type Badge */}
                  <TableCell>
                    <BlurFade delay={0.05 * idx} inView>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                      >
                        {trip.travelType}
                      </Badge>
                    </BlurFade>
                  </TableCell>

                  {/* 6. Actions */}
                  <TableCell className="text-right">
                    <BlurFade delay={0.05 * idx} inView>
                      <DeleteTripDialog id={trip.id} />
                    </BlurFade>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}