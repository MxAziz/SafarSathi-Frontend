"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, Globe } from "lucide-react";

interface TravelLoaderProps {
  fullScreen?: boolean;
}

const particles = [
  { top: "35%", left: "65%", duration: 2 },
  { top: "60%", left: "35%", duration: 3 },
  { top: "45%", left: "70%", duration: 2.5 },
];

const TravelLoader = ({ fullScreen = true }: TravelLoaderProps) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-md"
    : "flex items-center justify-center py-10 w-full h-full min-h-[200px]";

  return (
    <div className={containerClasses}>

      <div className="block md:hidden">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Central Dot */}
          <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40" />

          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Counter Rotating Plane */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-background p-0.5 rounded-full">
              <Plane className="w-4 h-4 text-primary fill-current transform rotate-180" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block lg:hidden">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Static Map Pin */}
          <motion.div
            className="z-10 text-primary drop-shadow-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="w-10 h-10 fill-primary/20" strokeWidth={2} />
          </motion.div>

          {/* Ripples (Radar Effect) */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute border border-primary/30 rounded-full bg-primary/5"
              initial={{ width: "20%", height: "20%", opacity: 0.8 }}
              animate={{ width: "100%", height: "100%", opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>


        {/* 3. DESKTOP/LARGE VIEW (Visible on lg & xl) */}
      <div className="hidden lg:block">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Central Globe */}
          <div className="absolute z-20 bg-background rounded-full p-2 shadow-xl shadow-primary/10 border border-primary/10">
            <Globe
              className="w-12 h-12 text-primary animate-pulse"
              strokeWidth={1.5}
            />
          </div>

          {/* Inner Orbit Ring (Clockwise) */}
          <motion.div
            className="absolute w-24 h-24 border border-dashed border-primary/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
          </motion.div>

          {/* Outer Orbit Ring (Counter-Clockwise) */}
          <motion.div
            className="absolute w-36 h-36 border border-primary/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            {/* Plane on Orbit */}
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 rotate-90 bg-background p-1 rounded-full border border-primary/20">
              <Plane className="w-5 h-5 text-primary fill-primary/20" />
            </div>
            {/* User Dot on Orbit */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>

          {/* Decorative Particles (Fixed Position) */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              style={{
                top: p.top,
                left: p.left,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelLoader;