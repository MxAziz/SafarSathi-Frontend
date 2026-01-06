"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PaymentSuccessView = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-6 rounded-full bg-green-100 p-6 dark:bg-green-900/30"
      >
        <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
      >
        Payment Successful!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 max-w-md text-muted-foreground"
      >
        Congratulations! Your transaction has been verified securely. You are
        now a Premium Member.
      </motion.p>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg" className="w-full sm:w-auto">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/explore-travelers">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Find Travelers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessView;