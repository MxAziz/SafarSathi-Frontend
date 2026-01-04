"use client";

import { motion } from "framer-motion";
import { UserPlus, Users } from "lucide-react";

export const EmptyBuddyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center bg-muted/20 border border-dashed rounded-xl"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-background p-4 rounded-full shadow-sm border">
          <Users className="h-10 w-10 text-primary/80" />
        </div>
        {/* Floating small icon animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md border"
        >
          <UserPlus className="h-4 w-4 text-green-500" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-foreground">No Requests Yet</h3>
      <p className="text-muted-foreground max-w-sm mt-2">
        You&apos;re all caught up! When travelers request to join your trips,
        they&apos;ll appear here.
      </p>
    </motion.div>
  );
};