/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";

export async function getTravelerDashboardData() {
  try {
    const response = await serverFetch.get(`/stats/dashboard/traveler`, {
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching stats travelers:", error);
    return {
      success: false,
      message: "Failed to fetch stats travelers",
      data: [],
    };
  }
}