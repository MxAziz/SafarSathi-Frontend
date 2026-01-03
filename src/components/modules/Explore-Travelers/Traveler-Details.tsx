import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITraveler } from "@/types/traveler.interface";
import { Plane, Mountain } from "lucide-react";

export function TravelerDetails({ traveler }: { traveler: ITraveler }) {
  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {traveler?.bio}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interests */}
        <Card className="shadow-none border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Mountain size={18} className="text-primary" />
              Travel Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {traveler?.travelInterests?.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-normal"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visited Countries */}
        <Card className="shadow-none border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Plane size={18} className="text-primary" />
              Visited Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {traveler?.visitedCountries?.map((country, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 text-sm border-primary/20 bg-primary/5"
                >
                  {country}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}