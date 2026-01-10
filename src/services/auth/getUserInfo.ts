/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/serverFetchHelper";
import { getCookies } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserInfo } from "@/types/user.interface";
import { revalidateTag } from "next/cache";

export const getUserInfo = async () => {
  let userInfo: IUserInfo | any;
  try {
    const response = await serverFetch.get("/users/me", {
      cache: "force-cache",
      next: { tags: ["USERS"] },
    });
    const result = await response.json();
    if (result.success) {
      const accessToken = await getCookies("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }

      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;
    }

    userInfo = {
      ...result,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "TRAVELER",
    };
  }
};

// === Update User Profile Action ===

export async function updateProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();
    const data: any = {};
    formData.forEach((value, key) => {
      if (key === "profileImage") return;
      if (key === "travelInterests" || key === "visitedCountries") {
        if (typeof value === "string" && value.trim().length > 0) {
          data[key] = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        } else {
          data[key] = [];
        }
      } else {
        data[key] = value;
      }
    });

    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("profileImage") as File;
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }
    const response = await serverFetch.patch(`/users/update-my-profile`, {
      body: uploadFormData,
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("USERS",);
    }

    return result;
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while updating profile.",
    };
  }
}

export async function softDeleteUser(travelerId: string) {
  try {
    const response = await serverFetch.delete(
      `/users/delete-traveler/${travelerId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      revalidateTag("USERS",);
    }

    return result;
  } catch (error: any) {
    console.error("Soft Delete Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while deleting user.",
    };
  }
}