/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";

export async function getAllTravelers(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/users${
        queryString ? `?${queryString}` : "?sortBy=createdAt&sortOrder=desc"
      }`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching travelers:", error);
    return {
      success: false,
      message: "Failed to fetch travelers",
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}

export async function getRecommendedTravelers() {
  try {
    const response = await serverFetch.get(`/users/matches`, {
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching no match travelers:", error);
    return {
      success: false,
      message: "Failed to fetch no match travelers",
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}

export async function getTravelerById(id: string) {
  try {
    const response = await serverFetch.get(`/users/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to fetch from server",
        data: undefined,
      };
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching traveler by Id:", error);

    return {
      success: false,
      message: error?.message || "Something went wrong",
      data: undefined,
    };
  }
}