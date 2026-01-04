"use client";

import { Button } from "@/components/ui/button";
import { Send, Map } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-lg bg-muted/20"
    >
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Send className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground">No Requests Found</h3>
      <p className="text-muted-foreground max-w-sm mt-2 mb-6">
        You haven&apos;t sent any trip requests yet. Explore exciting travel
        plans and join others!
      </p>
      <Link href="/dashboard/explore-travelers">
        <Button className="gap-2">
          <Map className="h-4 w-4" />
          Explore Trips
        </Button>
      </Link>
    </motion.div>
  );
};