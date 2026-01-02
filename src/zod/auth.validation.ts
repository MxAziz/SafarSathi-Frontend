import z from "zod";

export const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Invalid email address.",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 characters.",
    })
    .max(10, {
      error: "Password must be 10 characters or less.",
    }),
});

export const registerTravelerZodSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required." }),
    email: z.email({ error: "Email is required." }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long." })
      .max(10, { error: "Password cannot exceed 10 characters." })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        error: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(8, { error: "Confirm password is required" }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Confirm passwords do not match",
    path: ["confirmPassword"],
  });