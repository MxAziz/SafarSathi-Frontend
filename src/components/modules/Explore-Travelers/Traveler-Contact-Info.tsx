import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Mail, Phone, Calendar, Globe } from "lucide-react";
import { format } from "date-fns";
import { ITraveler } from "@/types/traveler.interface";

export function TravelerContactInfo({ traveler }: { traveler: ITraveler }) {
  function safeFormatDate(
  dateValue: string | Date | undefined | null,
  formatStr: string
) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return "N/A";

  return format(date, formatStr);
}

  return (
    <Card className="h-full shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-lg">Contact & Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Mail size={18} className="text-zinc-600 dark:text-zinc-300" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="font-medium truncate" title={traveler?.email}>
              {traveler?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Phone size={18} className="text-zinc-600 dark:text-zinc-300" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium">{traveler?.contactNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Globe size={18} className="text-zinc-600 dark:text-zinc-300" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="font-medium">{traveler?.address}</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3 text-sm">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Calendar size={18} className="text-zinc-600 dark:text-zinc-300" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Joined</p>
            <p className="font-medium">
              {safeFormatDate(traveler?.createdAt, "MMMM yyyy")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}