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
  { text: "Priority Support (Email)", included: true },
  { text: "See Who Viewed Profile", included: false },
  { text: "Exclusive Travel Deals", included: false },
  { text: "Offline Mode Access", included: false },
];

const yearlyFeatures = [
  { text: "Verified Traveler Badge", included: true },
  { text: "Unlimited Connection Requests", included: true },
  { text: "Priority Support (24/7 Live Chat)", included: true },
  { text: "See Who Viewed Profile", included: true },
  { text: "Exclusive Travel Deals", included: true },
  { text: "Offline Mode Access", included: true },
];

const PricingSwitch = () => {
  const [isYearly, setIsYearly] = useState(false);
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
        amount: amount,
      });

      if (result?.success && result?.data?.paymentUrl) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(
          result?.message || "Failed to initiate payment. Try again."
        );
        isSubmittingRef.current = false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!",);
      isSubmittingRef.current = false;
    } finally {
      setLoading(false);
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* --- Toggle Section --- */}
      <div className="mb-16 flex items-center justify-center gap-4 bg-muted/30 p-2 rounded-full border shadow-inner backdrop-blur-sm">
        <button
          className={cn(
            "text-sm font-bold transition-all px-6 py-2.5 rounded-full",
            !isYearly
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={cn(
            "text-sm font-bold transition-all px-6 py-2.5 rounded-full flex items-center gap-2",
            isYearly
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setIsYearly(true)}
        >
          Yearly
          <Badge className="bg-emerald-500 text-white text-[10px] border-none">
            Save 67%
          </Badge>
        </button>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid w-full gap-8 md:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
        {/* Monthly Explorer Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <Card className="flex flex-col border-border bg-card/50 backdrop-blur-sm p-8 h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md shadow-none">
            <div className="mb-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Plane size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Explorer
              </h3>
              <p className="text-muted-foreground">
                Perfect for short adventures and testing the waters.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-foreground">$50</span>
                <span className="text-muted-foreground font-semibold">
                  /month
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                What&apos;s included:
              </p>
              <ul className="space-y-4">
                {monthlyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground opacity-40 shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <Button
                variant="outline"
                className="w-full h-14 rounded-xl border-2 font-bold text-lg transition-all hover:bg-primary hover:text-primary-foreground"
                disabled={loading}
                onClick={() => handleSubscription("Monthly", 50)}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Start Monthly Plan"
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Yearly Nomad Card (Recommended) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-full"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full" />

          <Card className="flex flex-col border-primary bg-card dark:bg-zinc-950 p-8 h-full   transition-all duration-300 hover:-translate-y-2 shadow-none">
            <div className="absolute -top-4 right-8">
              <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg border-2 border-background">
                <Sparkles size={12} className="mr-2 fill-current" />
                Recommended
              </Badge>
            </div>

            <div className="mb-6">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-lg shadow-primary/20">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Global Nomad
              </h3>
              <p className="text-muted-foreground">
                The ultimate choice for dedicated travelers who want it all.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">$200</span>
                <span className="text-muted-foreground font-semibold">
                  /year
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <Zap size={14} fill="currentColor" />
                You save $400 per year
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                Everything in Explorer, plus:
              </p>
              <ul className="space-y-4">
                {yearlyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary stroke-[3px]" />
                    </div>
                    <span className="text-foreground font-bold italic">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <Button
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                disabled={loading}
                onClick={() => handleSubscription("Yearly", 200)}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Get Full Access"
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Trust Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 flex flex-wrap justify-center items-center gap-12 grayscale opacity-50"
      >
        <div className="flex items-center gap-2 font-bold text-xl">
          <ShieldCheck /> SSL SECURE
        </div>
        <div className="flex items-center gap-2 font-bold text-xl">
          <Zap /> FAST ACTIVATION
        </div>
        <div className="flex items-center gap-2 font-bold text-xl">
          TRUSTED BY 10K+
        </div>
      </motion.div>
    </div>
  );
};

export default PricingSwitch;