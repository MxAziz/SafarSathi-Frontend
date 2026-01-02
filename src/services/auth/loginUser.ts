/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IInputErrorState } from "@/utility/getInputFieldError";
import { serverFetch } from "@/utility/serverFetchHelper";
import { zodValidator } from "@/utility/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { setCookies } from "./tokenHandler";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import {
  getDefaultDashboardRoutes,
  isValidRedirectForRole,
  UserRole,
} from "@/utility/auth-utils";
import { redirect } from "next/navigation";

export const loginUser = async (_currentState: any, formData: any) => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      password: formData.get("password"),
      email: formData.get("email"),
    };

    const validatedPayload = zodValidator(loginData, loginValidationZodSchema);
    // Validation failed
    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors?.map((err: any) => ({
          field: String(err.field), // ensure string
          message: err.message,
        })),
      } as IInputErrorState;
    }

    const newPayload = {
      email: validatedPayload.data?.email,
      password: validatedPayload.data?.password,
    };

    const res = await serverFetch.post("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayload),
    });
    const data = await res.json();

    const setCookiesHeaders = res.headers.getSetCookie();
    if (setCookiesHeaders && setCookiesHeaders.length > 0) {
      setCookiesHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No set cookies headers found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await setCookies("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookies("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifyToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (typeof verifyToken === "string") {
      throw new Error("Invalid token");
    }
    const userRole = verifyToken.role as UserRole;
    if (!data?.success) {
      throw new Error(data.message || "Login failed");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
};