"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";
import TravelPlanCard from "./FeaturedPlansCard";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";

const MatchedPlans = ({ plans }: { plans: ITravelPlan[] }) => {
  // Autoplay setup: stopOnInteraction keeps it smooth
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Tailored For Your <span className="text-primary">Style</span>
            </motion.h2>
          </div>

          <Link href="/travel-plans">
            <Button
              variant="ghost"
              className="group font-medium text-foreground p-0 hover:bg-transparent"
            >
              View All Journeys
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
              <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300 absolute -bottom-1" />
            </Button>
          </Link>
        </div>

        {/* Carousel Logic with Hover Control */}
        {plans.length > 0 ? (
          <div className="relative">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.play()}
              className="w-full"
              opts={{
                align: "start",
                loop: true, // Infinite sliding
              }}
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {plans.map((plan) => (
                  <CarouselItem
                    key={plan.id}
                    className="pl-4 md:pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <TravelPlanCard plan={plan} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation UI (Desktop only) */}
              <div className="hidden lg:flex justify-end gap-3 mt-10">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-2 border-border bg-background hover:bg-primary hover:text-white transition-all shadow-sm" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-2 border-border bg-background hover:bg-primary hover:text-white transition-all shadow-sm" />
              </div>
            </Carousel>
          </div>
        ) : (
          /* Professional Empty State */
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <MapPin
              className="mx-auto mb-4 text-muted-foreground/50"
              size={48}
            />
            <p className="text-muted-foreground font-medium">
              Updating matches for your interests...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchedPlans;