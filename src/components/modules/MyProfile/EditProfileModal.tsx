/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";

import { updateProfile } from "@/services/auth/getUserInfo";
import ImageUploader from "@/components/shared/ImageUploader";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { toast } from "sonner";

export function EditProfileModal({ data, role }: { data: any; role: string }) {
  const [open, setOpen] = useState(false);
  const isTraveler = role === "TRAVELER";

  const handleFormAction = async (formData: FormData) => {
    const res = await updateProfile(formData);

    if (res.success) {
      setOpen(false);
      toast.success("Profile update Successfully!");
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full shadow-lg gap-2">
          <Edit className="w-4 h-4" />{" "}
          <span className="hidden sm:inline">Edit Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] w-[95%] max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal details below.
          </DialogDescription>
        </DialogHeader>

        {/* Server Action Form */}
        <form action={handleFormAction} className="space-y-6 py-4">
          {/* Image Upload */}
          <div className="flex justify-center">
            <ImageUploader defaultImage={data?.profileImage || ""} />
          </div>

          <div className="grid gap-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" defaultValue={data?.name} required />
            </div>

            {/* Email (Read Only) */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-500">
                Email (Cannot be changed)
              </Label>
              <Input value={data?.email} disabled className="bg-gray-100" />
            </div>

            {/* Phone & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactNumber">Phone</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  defaultValue={data?.contactNumber}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  defaultValue={data?.user?.gender || "Male"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={data?.address} />
            </div>

            {/* Traveler Fields */}
            {isTraveler && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    defaultValue={data?.currentLocation}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    defaultValue={data?.bio}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="travelInterests">
                    Travel Interests (Comma separated)
                  </Label>
                  <Input
                    id="travelInterests"
                    name="travelInterests"
                    defaultValue={data?.travelInterests?.join(", ")}
                    placeholder="Scuba Diving, Hiking, Food"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="visitedCountries">
                    Visited Countries (Comma separated)
                  </Label>
                  <Input
                    id="visitedCountries"
                    name="visitedCountries"
                    defaultValue={data?.visitedCountries?.join(", ")}
                    placeholder="USA, Canada, Japan"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}