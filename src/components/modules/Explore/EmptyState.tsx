"use client";

import { motion } from "framer-motion";
import { SearchX, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No results found" }: EmptyStateProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/20">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <SearchX className="h-10 w-10 text-blue-500" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          No matches found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {message}. We couldn&apos;t find any travel plans matching your
          criteria.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
        {/* Primary Action: Browse All (Solid Button) */}
        <Link href="/travel-plans">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Compass className="mr-2 h-4 w-4" />
              Browse All Trips
            </Button>
          </motion.div>
        </Link>

        {/* Secondary Action: Home (Outline Button) */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;