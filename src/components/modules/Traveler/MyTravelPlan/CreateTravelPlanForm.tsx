"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { getInputFieldError, IInputErrorState, } from "@/utility/getInputFieldError";
import { TravelType } from "@/types/travelPlan.interface";
import UploaderImage from "@/components/shared/UploaderImage";

interface CreateTravelPlanFormProps {
  formAction: (payload: FormData) => void;
  state: IInputErrorState;
  isPending: boolean;
}

export default function CreateTravelPlanForm({
  formAction,
  state,
  isPending,
}: CreateTravelPlanFormProps) {
  const [travelType, setTravelType] = useState<string>(TravelType.SOLO);

  return (
    <form action={formAction} className="space-y-6">
      {/* --- Image Uploader --- */}
      <div className="flex flex-col items-center justify-center pb-4">
        <UploaderImage name="imageUrl" label="Upload Cover Photo" />
        {getInputFieldError("imageUrl", state) && (
          <p className="text-destructive font-medium text-xs mt-1">
            {getInputFieldError("imageUrl", state)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Solo Retreat"
            className={
              getInputFieldError("title", state) ? "border-red-500" : ""
            }
          />
          {getInputFieldError("title", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("title", state)}
            </p>
          )}
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            name="destination"
            placeholder="e.g. Thailand"
            className={
              getInputFieldError("destination", state) ? "border-red-500" : ""
            }
          />
          {getInputFieldError("destination", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("destination", state)}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your trip..."
          className={`min-h-[100px] ${
            getInputFieldError("description", state) ? "border-red-500" : ""
          }`}
        />
        {getInputFieldError("description", state) && (
          <p className="text-destructive font-medium text-xs">
            {getInputFieldError("description", state)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            className={
              getInputFieldError("startDate", state) ? "border-red-500" : ""
            }
          />
          {getInputFieldError("startDate", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("startDate", state)}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            className={
              getInputFieldError("endDate", state) ? "border-red-500" : ""
            }
          />
          {getInputFieldError("endDate", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("endDate", state)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range</Label>
          <Input
            id="budgetRange"
            name="budgetRange"
            placeholder="$500 - $1000"
            className={
              getInputFieldError("budgetRange", state) ? "border-red-500" : ""
            }
          />
          {getInputFieldError("budgetRange", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("budgetRange", state)}
            </p>
          )}
        </div>

        {/* Travel Type */}
        <div className="space-y-2">
          <Label>Travel Type</Label>
          <input type="hidden" name="travelType" value={travelType} />
          <Select value={travelType} onValueChange={setTravelType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TravelType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getInputFieldError("travelType", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("travelType", state)}
            </p>
          )}
        </div>
      </div>

      {/* Visibility */}
      <div className="flex items-center space-x-2 bg-secondary/20 p-3 rounded-lg">
        <Switch id="visibility" name="visibility" defaultChecked={true} />
        <div className="flex flex-col">
          <Label htmlFor="visibility" className="cursor-pointer">
            Public Visibility
          </Label>
          <span className="text-[10px] text-muted-foreground">
            Allow others to see this plan
          </span>
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Plan
        </Button>
      </div>
    </form>
  );
}