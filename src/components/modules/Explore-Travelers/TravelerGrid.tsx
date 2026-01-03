"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import TravelerCard from "./TravelerCard";
import { ITraveler } from "@/types/traveler.interface";

const TravelerGrid = ({ travelers }: { travelers: ITraveler[] }) => {
  if (travelers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6">
          <Globe className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">No travelers found</h3>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {travelers.map((traveler, index) => (
        <motion.div
          key={traveler.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <TravelerCard traveler={traveler} />
        </motion.div>
      ))}
    </div>
  );
};

export default TravelerGrid;