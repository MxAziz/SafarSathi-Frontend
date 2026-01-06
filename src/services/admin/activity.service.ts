/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";

export async function getSystemActivities(queryString?: string) {
  try {
    const params =
      queryString || "page=1&limit=10&sortBy=createdAt&sortOrder=desc";

    const res = await serverFetch.get(`/activities?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const activity = await res.json();

    if (!activity.success) {
      throw new Error(activity.message || "Failed to fetch activities.");
    }

    return activity;
  } catch (error: any) {
    console.error("Admin Activity Error:", error);
    return {
      success: false,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}