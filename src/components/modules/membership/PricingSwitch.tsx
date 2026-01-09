"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, X, Loader2, Plane, Globe, ShieldCheck, Zap, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getCookies } from "@/services/auth/tokenHandler";
import { useRouter } from "next/navigation";
import { createSubscriptionSession } from "@/services/payment/payment.service";

const monthlyFeatures = [
  { text: "Verified Traveler Badge", included: true },
  { text: "Unlimited Connection Requests", included: true },
  { text: "Priority Email Support", included: true },
  { text: "Profile View Insights", included: false },
  { text: "Exclusive Travel Deals", included: false },
  { text: "Offline Access", included: false },
];

const yearlyFeatures = [
  { text: "Verified Traveler Badge", included: true },
  { text: "Unlimited Connection Requests", included: true },
  { text: "24/7 Priority Support", included: true },
  { text: "Profile View Insights", included: true },
  { text: "Exclusive Travel Deals", included: true },
  { text: "Offline Access", included: true },
];

const PricingSwitch = () => {
  const [loading, setLoading] = useState(false);
  const isSubmittingRef = useRef(false);
  const router = useRouter();

  const handleSubscription = async (
    planType: "Monthly" | "Yearly",
    amount: number
  ) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setLoading(true);

    try {
      const token = await getCookies("accessToken");
      if (!token) {
        toast.error("Please login to subscribe!");
        router.push("/login");
        return;
      }

      const result = await createSubscriptionSession({
        subscriptionType: planType,
        amount,
      });

      if (result?.success && result?.data?.paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(result?.message || "Payment initiation failed.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(() => (isSubmittingRef.current = false), 1000);
    }
  };

  return (
    <section className="relative w-full py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        {/* Monthly */}
        <motion.div whileHover={{ y: -6 }}>
          <Card className="relative flex h-full flex-col rounded-3xl border bg-card/60 p-8 backdrop-blur">
            <Plane className="mb-6 h-10 w-10 text-primary" />
            <h3 className="text-2xl font-bold">Explorer</h3>
            <p className="mb-6 text-muted-foreground">
              Ideal for casual and short-term travelers.
            </p>

            <div className="mb-8 flex items-end gap-2">
              <span className="text-5xl font-extrabold">$50</span>
              <span className="text-muted-foreground">/month</span>
            </div>

            <ul className="flex-1 space-y-4">
              {monthlyFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <Check className="text-primary" />
                  ) : (
                    <X className="opacity-40" />
                  )}
                  <span className={cn(!f.included && "opacity-60")}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleSubscription("Monthly", 50)}
              className="mt-10 h-14 rounded-xl text-lg font-bold"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Choose Monthly"}
            </Button>
          </Card>
        </motion.div>

        {/* Yearly */}
        <motion.div whileHover={{ y: -10 }}>
          <Card className="relative flex h-full flex-col rounded-3xl border-2 border-primary bg-linear-to-br from-primary/10 to-transparent p-8">
            <Badge className="absolute right-6 top-6 bg-primary text-white">
              <Sparkles className="mr-1 h-3 w-3" /> Recommended
            </Badge>

            <Globe className="mb-6 h-10 w-10 text-primary" />
            <h3 className="text-2xl font-bold">Global Nomad</h3>
            <p className="mb-6 text-muted-foreground">
              Full access for serious travelers.
            </p>

            <div className="mb-2 flex items-end gap-2">
              <span className="text-5xl font-extrabold">$200</span>
              <span className="text-muted-foreground">/year</span>
            </div>

            <p className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-500">
              <Zap size={14} /> Save $400 yearly
            </p>

            <ul className="flex-1 space-y-4">
              {yearlyFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <Check className="text-primary" />
                  {f.text}
                </li>
              ))}
            </ul>

            <Button
              disabled={loading}
              onClick={() => handleSubscription("Yearly", 200)}
              className="mt-10 h-14 rounded-xl text-lg font-bold shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Get Full Access"}
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Trust */}
      <div className="mt-20 flex justify-center gap-10 text-sm font-bold opacity-60">
        <span className="flex items-center gap-2">
          <ShieldCheck /> Secure Payment
        </span>
        <span className="flex items-center gap-2">
          <Zap /> Instant Activation
        </span>
      </div>
    </section>
  );
};

export default PricingSwitch;
