"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, ImagePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils"; // Shadcn utility

interface ImageUploaderProps {
  defaultImage?: string | null;
  name?: string;
  label?: string;
  className?: string;
}

export default function UploaderImage({
  defaultImage,
  name = "image",
  label = "Upload Image",
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(
    defaultImage || undefined
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative group cursor-pointer">
        <Avatar className="w-32 h-32 border-4 border-background shadow-lg rounded-xl">
          <AvatarImage src={preview} className="object-cover" />
          <AvatarFallback className="rounded-xl bg-secondary">
            <ImagePlus className="w-10 h-10 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Hidden Input for Form Data */}
        <input
          type="file"
          name={name}
          id={name}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Trigger Label Overlay */}
        <label
          htmlFor={name}
          className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
        >
          <Camera className="w-8 h-8" />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}