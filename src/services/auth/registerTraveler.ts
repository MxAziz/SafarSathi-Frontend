/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IInputErrorState } from "@/utility/getInputFieldError";
import { serverFetch } from "@/utility/serverFetchHelper";
import { zodValidator } from "@/utility/zodValidator";
import { registerTravelerZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerTraveler = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const travelerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    const validatedPayload = zodValidator(
      travelerData,
      registerTravelerZodSchema
    );
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
      name: validatedPayload.data?.name,
      email: validatedPayload.data?.email,
      password: validatedPayload.data?.password,
    };

    const res = await serverFetch.post("/users/register", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayload),
    });
    const data = await res.json();
    if (data.success) {
      await loginUser(_currentState, formData);
    }

    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
};