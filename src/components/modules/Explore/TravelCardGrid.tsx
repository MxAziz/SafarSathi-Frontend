"use client";

import { motion, Variants } from "framer-motion";
import TravelCard from "./TravelCard";
import { ITravelPlan } from "@/types/travelPlan.interface";

// Animation Variants

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
};

const TravelCardGrid = ({ travelPlans }: { travelPlans: ITravelPlan[] }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 "
    >
      {travelPlans.map((plan) => (
        <motion.div key={plan.id} variants={item}>
          <TravelCard plan={plan} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TravelCardGrid;