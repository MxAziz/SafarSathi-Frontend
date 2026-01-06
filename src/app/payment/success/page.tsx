/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import PaymentSuccessView from "@/components/modules/Payment/PaymentSuccessView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Welcome to Premium - SafarSathi",
  description:
    "Your payment has been processed successfully. Thank you for upgrading your journey with SafarSathi.",
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: {
    session_id?: string;
  };
}

const PaymentSuccessPage = async ({ searchParams }: Props) => {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/dashboard");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      redirect("/payment/fail");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error verifying payment:", error);
    redirect("/dashboard");
  }

  return <PaymentSuccessView />;
};

export default PaymentSuccessPage;