import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Failed | Transaction Declined - SafarSathi",
  description:
    "We couldn't process your payment. No charges were made to your account. Please check your payment details and try again.",
  robots: {
    index: false,
    follow: false,
  },
};

const PaymentFailPage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-6 dark:bg-red-900/30">
        <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        Payment Failed
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Oops! Something went wrong with your transaction. No charges were made.
        Please try again.
      </p>

      <div className="flex gap-4">
        <Link href="/membership">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailPage;