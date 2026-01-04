"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Mail, Check, X, Loader2, } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { respondToBuddyRequest } from "@/services/traveler/tripRequest.service";
import { useRouter } from "next/navigation";
import { IBuddyRequest } from "@/types/buddyRequest.interface";
import { motion } from "framer-motion";

interface RequestActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: IBuddyRequest | null;
}

export const RequestActionModal = ({
  isOpen,
  onClose,
  request,
}: RequestActionModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!request) return null;

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    try {
      const res = await respondToBuddyRequest(request.id, status);
      if (res.success) {
        toast.success(`Request ${status.toLowerCase()} successfully!`);
        router.refresh();
        onClose();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header Background Design */}
        <div className="relative h-24 bg-linear-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/10" />
          <DialogHeader className="p-4 relative z-10">
            <DialogTitle className="text-white text-lg font-medium drop-shadow-md">
              Review Request
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 -mt-10 relative">
          {/* Avatar Profile Card */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage
                  src={request.traveler.profileImage}
                  className="object-cover"
                />
                <AvatarFallback className="text-xl bg-muted">
                  {request.traveler.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <Badge
                  className={`${
                    request.status === "APPROVED"
                      ? "bg-green-500"
                      : request.status === "REJECTED"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  } border-2 border-background px-2 py-0.5 text-[10px] text-white shadow-sm`}
                >
                  {request.status}
                </Badge>
              </div>
            </motion.div>

            <div className="text-center mt-3 mb-6">
              <h3 className="text-xl font-bold text-foreground">
                {request.traveler.name}
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-1">
                <Mail className="h-3.5 w-3.5" />
                <span>{request.traveler.email}</span>
              </div>
            </div>
          </div>

          {/* Trip Info Box */}
          <div className="bg-muted/30 rounded-xl border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary mt-0.5">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Interested In
                </p>
                <p className="text-sm font-semibold text-foreground line-clamp-1">
                  {request.travelPlan.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {request.travelPlan.destination}
                </p>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Requested On
                </p>
                <p className="text-sm font-medium text-foreground">
                  {format(new Date(request.createdAt), "dd MMMM, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons - GRID LAYOUT */}
          {request.status === "PENDING" && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all font-semibold"
                onClick={() => handleStatusUpdate("REJECTED")}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <X className="mr-2 h-4 w-4" />
                )}
                Reject
              </Button>

              <Button
                size="lg"
                className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all font-semibold"
                onClick={() => handleStatusUpdate("APPROVED")}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Approve
              </Button>
            </div>
          )}

          {/* Close Button if not Pending */}
          {request.status !== "PENDING" && (
            <div className="mt-6">
              <Button variant="outline" className="w-full" onClick={onClose}>
                Close Details
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};