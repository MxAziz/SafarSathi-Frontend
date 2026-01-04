/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin, Calendar, Wallet, ArrowRight, Users, Phone, Clock, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

interface RequestCardProps {
  request: any;
  index: number;
}

// Status Styles
const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
};

export const RequestCard = ({ request, index }: RequestCardProps) => {
  const { travelPlan, status, createdAt } = request;
  const { traveler: host } = travelPlan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.005 }}
      className="w-full"
    >
      <Card className="group flex flex-col lg:flex-row overflow-hidden border-border/60 bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/30 h-auto lg:h-60">
        {/* === LEFT SIDE (Desktop) / TOP SIDE (Mobile/Tablet) : IMAGE === */}

        <div className="relative h-48 md:h-64 lg:h-full w-full lg:w-[320px] shrink-0 bg-muted">
          <Image
            src={
              travelPlan?.imageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWIkWps2twNB0C5DNnCmyLRBqVA1cNm3uGrw&s"
            }
            alt={travelPlan?.destination}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80" />

          {/* Destination on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-sm font-bold drop-shadow-md">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{travelPlan?.destination}</span>
            </div>
          </div>

          {/* Travel Type Badge on Image */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
              <Users className="mr-1 h-3 w-3" />
              {travelPlan.travelType}
            </Badge>
          </div>
        </div>

        {/* === RIGHT SIDE (Desktop) / BOTTOM SIDE (Mobile/Tablet) : DETAILS === */}
        <div className="flex flex-1 flex-col justify-between p-4 md:p-5 gap-3">
          {/* Header Part */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {travelPlan.title}
                </h3>
                {/* Host Info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Avatar className="h-5 w-5 border border-border">
                    <AvatarImage src={host?.profileImage} />
                    <AvatarFallback>{host?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>
                    Hosted by{" "}
                    <span className="font-medium text-foreground">
                      {host?.name}
                    </span>
                  </span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />{" "}
                    {format(new Date(createdAt), "dd MMM")}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <Badge
                className={`${
                  statusStyles[status as keyof typeof statusStyles]
                } shrink-0`}
              >
                {status}
              </Badge>
            </div>

            <Separator className="my-3" />

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {travelPlan?.description}
            </p>
          </div>

          {/* Footer Part: Details Grid & Action */}
          <div className="mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {/* Date */}
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-md">
                <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                <div className="flex flex-col text-[10px] sm:text-xs">
                  <span className="text-muted-foreground leading-none mb-0.5">
                    Dates
                  </span>
                  <span className="font-medium truncate">
                    {format(new Date(travelPlan.startDate), "dd MMM")} -{" "}
                    {format(new Date(travelPlan.endDate), "dd MMM")}
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-md">
                <Wallet className="h-3.5 w-3.5 text-primary shrink-0" />
                <div className="flex flex-col text-[10px] sm:text-xs">
                  <span className="text-muted-foreground leading-none mb-0.5">
                    Budget
                  </span>
                  <span className="font-medium truncate">
                    {travelPlan?.budgetRange}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-md col-span-2 md:col-span-1">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <div className="flex flex-col text-[10px] sm:text-xs">
                  <span className="text-muted-foreground leading-none mb-0.5">
                    Contact
                  </span>
                  <span className="font-medium truncate">
                    {host?.contactNumber || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <Link href={`/travel-plans/${travelPlan.id}`} className="w-full">
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-between hover:bg-primary hover:text-white transition-colors h-8 cursor-pointer"
              >
                <span className="text-xs">View Full Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};