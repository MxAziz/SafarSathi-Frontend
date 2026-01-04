/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";

export async function getAdminStats() {
  try {
    const res = await serverFetch.get(`/stats/dashboard/admin`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If serverFetch returns a Response-like object with .json()
    const stats = await res.json();

    if (!stats.success) {
      throw new Error(stats.message);
    }

    return stats;
  } catch (error: any) {
    console.error("Admin Stats Error:", error);

    return {
      success: false,
      message:
        error?.message || "Something went wrong while fetching admin stats.",
    };
  }
}