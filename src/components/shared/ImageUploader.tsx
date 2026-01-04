"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function ImageUploader({
  defaultImage,
}: {
  defaultImage: string;
}) {
  const [preview, setPreview] = useState(defaultImage);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group cursor-pointer">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={preview} className="object-cover" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        {/* Hidden Input for Form Data */}
        <input
          type="file"
          name="profileImage"
          id="profileImage"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Trigger Label */}
        <label
          htmlFor="profileImage"
          className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
        >
          <Camera className="w-8 h-8" />
        </label>
      </div>
      <p className="text-xs text-gray-500">Click image to change</p>
    </div>
  );
}