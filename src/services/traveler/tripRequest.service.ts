/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";

export const sendTripRequest = async (id: string) => {
  try {
    const res = await serverFetch.post("/trip-requests/request", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ travelPlanId: id }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to submit trip request");
    }

    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Server Action Error:", error);

    return {
      success: false,
      message: error.message || "Failed to submit trip request",
    };
  }
};

export const getMyTripRequest = async () => {
  try {
    const res = await serverFetch.get("/trip-requests/my-request", {
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to get trip request");
    }

    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Server Action Error:", error);

    return {
      success: false,
      message: error.message || "Failed to get trip request",
    };
  }
};

export const getIncomingRequests = async () => {
  try {
    const res = await serverFetch.get("/trip-requests/incoming", {
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to get trip request");
    }

    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Server Action Error:", error);

    return {
      success: false,
      message: error.message || "Failed to get trip request",
    };
  }
};

export const respondToBuddyRequest = async (
  requestId: string,
  status: string
) => {
  try {
    const res = await serverFetch.patch("/trip-requests/respond", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, status }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to respond to trip request");
    }
    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Server Action Error:", error);

    return {
      success: false,
      message: error.message || "Failed to respond to trip request",
    };
  }
};