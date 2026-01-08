"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import { ITravelPlan } from "@/types/travelPlan.interface";

interface TravelCardProps {
  plan: ITravelPlan;
  index: number;
}

export function TravelCard({ plan, index }: TravelCardProps) {
  const fallbackImage =
    "https://i.pinimg.com/736x/7f/2c/e3/7f2ce320fb9efa9bc3f242e883fcce00.jpg";

  const [imgSrc, setImgSrc] = useState(plan.imageUrl || fallbackImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/travel-plans/${plan.id}`}>
        <Card className="group h-full w-full overflow-hidden rounded-lg border-none border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-colors hover:border-gray-300 dark:hover:border-gray-700 shadow-none py-0">
          {/* Image Container */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={plan.destination}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgSrc(fallbackImage)}
            />
            <Badge className="absolute top-3 right-3 bg-black/60 hover:bg-black/70 backdrop-blur-md text-white border-none z-10">
              {plan?.travelType}
            </Badge>
          </div>

          <CardHeader className="px-4">
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <MapPin className="w-3 h-3 mr-1 text-primary" />
              {plan?.destination}
            </div>
            <h3 className="font-medium text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {plan?.title}
            </h3>
          </CardHeader>

          <CardContent className="px-4 grow">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {plan?.description?.slice(0, 100)}...
            </p>

            <div className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
              <div className="flex items-center gap-1.5  py-1 rounded-md">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>
                  {format(new Date(plan?.startDate), "MMM d")} -{" "}
                  {format(new Date(plan?.endDate), "MMM d")}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 border-t flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border">
                <AvatarFallback className="text-[10px]">
                  {plan.traveler?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {plan.traveler?.name || "Unknown"}
              </span>
            </div>
            <div className="flex items-center text-primary font-medium text-sm">
              {plan?.budgetRange}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}