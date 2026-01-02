import { z } from "zod";
import { TravelType } from "@/types/travelPlan.interface";

export const createTravelPlanZodSchema = z.object({
  title: z.string({ error: "Title is required" }).min(1, "Title is required"),
  destination: z
    .string({ error: "Destination is required" })
    .min(1, "Destination is required"),
  description: z
    .string({ error: "Description is required" })
    .min(1, "Description is required"),
  budgetRange: z
    .string({ error: "Budget range is required" })
    .min(1, "Budget range is required"),

  // Date validation fix
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),

  // Enum validation fix (Use nativeEnum)
  travelType: z.enum(TravelType, { error: "Travel type is required" }),

  visibility: z.boolean(),
});