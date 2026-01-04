import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ITraveler } from "@/types/traveler.interface";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TravelerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  traveler: ITraveler | null;
}

export default function TravelerDetailsModal({
  isOpen,
  onClose,
  traveler,
}: TravelerDetailsModalProps) {
  if (!traveler) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="h-32 bg-linear-to-r from-blue-500/10 to-purple-500/10 w-full absolute top-0 left-0 z-0" />

        <ScrollArea className="max-h-[85vh] overflow-y-auto">
          <div className="relative z-10 p-6 pt-16">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage
                  src={traveler?.profileImage as string}
                  className="object-cover"
                />
                <AvatarFallback>{traveler?.name[0]}</AvatarFallback>
              </Avatar>

              <div className="space-y-1 mt-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{traveler?.name}</h2>
                  {traveler?.isVerifiedTraveler && (
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {traveler?.address}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {traveler?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {traveler?.contactNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {/* Bio Section */}
              <div>
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {traveler?.bio}
                </p>
              </div>

              {/* Interests Section */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  Travel Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {traveler?.travelInterests?.map((interest, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3 py-1">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Visited Countries */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Globe2 className="w-4 h-4" /> Visited Countries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {traveler?.visitedCountries?.map((country, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-primary/20"
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className="pt-4 border-t flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Joined {new Date(traveler?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}