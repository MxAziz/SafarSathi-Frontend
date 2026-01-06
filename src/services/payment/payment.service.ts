/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";
// import { redirect } from "next/navigation";

export const createSubscriptionSession = async ({
  subscriptionType,
  amount,
}: {
  subscriptionType: string;
  amount: number;
}) => {
  try {
    const newPayload = {
      subscriptionType: subscriptionType,
      amount: amount,
    };

    const res = await serverFetch.post("/payments/subscribe", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayload),
    });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Payment session creation failed");
    }

    // if (data?.data?.paymentUrl) {
    //   redirect(data.data.paymentUrl);
    // }

    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};