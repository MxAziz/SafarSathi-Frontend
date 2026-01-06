import { Button } from "@/components/ui/button";
import { Ban, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled | Transaction Aborted - SafarSathi",
  description:
    "The payment process was cancelled. No charges were applied to your account. You can return to the membership page to select a plan again.",
  robots: {
    index: false,
    follow: false,
  },
};

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Icon Wrapper */}
      <div className="mb-6 rounded-full bg-yellow-100 p-6 dark:bg-yellow-900/30">
        <Ban className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        Payment Cancelled
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-md text-muted-foreground">
        You have cancelled the payment process. No charges were made to your
        account. If this was a mistake, you can try subscribing again.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/membership">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Return to Pricing
          </Button>
        </Link>
        <Link href="/">
          <Button
            size="lg"
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelPage;