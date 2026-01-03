/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { addReview, updateReview } from "@/services/review/review.service";
import { IReview } from "@/types/review.interface";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  initialData?: IReview | null;
}

export const ReviewFormModal = ({
  isOpen,
  onClose,
  planId,
  initialData,
}: ReviewFormModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setRating(initialData.rating);
        setValue("comment", initialData.comment);
      } else {
        setRating(0);
        reset({ comment: "" });
      }
    }
  }, [isOpen, initialData, setValue, reset]);

  const onSubmit = async (data: any) => {
    if (rating === 0) {
      toast.error("Please select a rating star!");
      return;
    }

    setIsLoading(true);
    try {
      let res;

      if (initialData) {
        // --- UPDATE MODE ---
        res = await updateReview(initialData.id, planId, { ...data, rating });
      } else {
        // --- CREATE MODE ---
        res = await addReview(planId, { ...data, rating });
      }

      if (res?.success) {
        toast.success(initialData ? "Review updated!" : "Review submitted!");
        reset();
        setRating(0);
        router.refresh();
        onClose();
      } else {
        toast.error(res.error || "Operation failed");
      }
    } catch (error) {
      toast.error("Something went wrong!",);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update your review" : "Share your experience"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
          {/* Star Rating Input */}
          <div className="flex flex-col items-center gap-2">
            <Label>How was your experience?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-transparent text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-yellow-600 h-5">
              {hoverRating || rating
                ? ["Terrible", "Bad", "Okay", "Good", "Excellent"][
                    (hoverRating || rating) - 1
                  ]
                : ""}
            </span>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <Label htmlFor="comment">Write a review</Label>
            <Textarea
              id="comment"
              placeholder="Tell us about the trip details, host behavior, etc..."
              className="min-h-[100px] resize-none focus-visible:ring-primary"
              {...register("comment", { required: "Review text is required" })}
            />
            {errors.comment && (
              <p className="text-xs text-red-500">
                {errors.comment.message as string}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update Review" : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};