/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const TravelPlanCard = ({ plan }: { plan: any }) => {
  const bgImage =
    plan.imageUrl ||
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/travel-plans/${plan.id}`} className="block h-full group">
        <Card className="relative h-full flex flex-col overflow-hidden border-none py-0 shadow-none bg-transparent">
          {/* Image Section */}
          <div className="relative h-60 w-full overflow-hidden rounded-xl">
            <Image
              src={bgImage}
              alt={plan.destination}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={false}
            />
            {/* Top Rating Badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <Star size={14} className="fill-orange-400 text-orange-400" />
              <span className="text-[12px] font-bold text-gray-800">
                {plan?.traveler?.averageRating?.toFixed(1) || "5.0"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 ">
            {/* Title */}
            <h3 className="text-[20px] font-medium text-foreground leading-tight mb-3 line-clamp-2 transition-colors group-hover:text-primary">
              {plan.title}
            </h3>

            {/* Travel Path Style (Screenshot inspired) */}
            <div className="flex items-center flex-wrap gap-2 text-[13px] text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-primary" /> {plan.destination}
              </span>
              <span className="text-gray-300">→</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />{" "}
                {new Date(plan.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-300">→</span>
              <span className="flex items-center gap-1 font-medium text-foreground/80 italic">
                {plan.travelType}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border mb-4" />

            {/* Bottom Meta Section */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                  Estimated Budget
                </span>
                <span className="text-base font-bold text-foreground">
                  {plan.budgetRange}
                </span>
              </div>

              {/* Host Info Badge */}
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full border border-border group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={
                      plan.traveler.profileImage ||
                      "https://avatar.vercel.sh/user"
                    }
                    alt={plan.traveler.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[12px] font-bold text-foreground truncate max-w-20">
                  {plan.traveler.name.split(" ")[0]}
                </span>
                <ArrowRight
                  size={14}
                  className="text-primary transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default TravelPlanCard;