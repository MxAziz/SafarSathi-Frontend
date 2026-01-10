/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import {
  Star,
  MessageSquarePlus,
  User,
  MoreVertical,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { IReview } from "@/types/review.interface";
import { ReviewFormModal } from "./ReviewFormModal";
import { deleteReview } from "@/services/review/review.service";
import { toast } from "sonner";

interface ReviewSectionProps {
  planId: string;
  reviews: IReview[];
  user: any;
}

export const ReviewSection = ({
  planId,
  reviews,
  user,
}: ReviewSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const router = useRouter();

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const displayedReviews = useMemo(() => {
    const myReview = user
      ? reviews.find((r) => r.travelerId === user.id)
      : null;

    const otherReviews = user
      ? reviews.filter((r) => r.travelerId !== user.id)
      : reviews;

    if (myReview) {
      return [myReview, ...otherReviews.slice(0, 5)];
    }

    return reviews.slice(0, 6);
  }, [reviews, user]);

  const handleEditClick = (review: IReview) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingReviewId) return;
    try {
      const res = await deleteReview(deletingReviewId, planId);
      if (res.success) {
        toast.success("Review deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingReviewId(null);
    }
  };

  // Review Card Component
  const ReviewCard = ({ review }: { review: IReview }) => {
    const isMyReview = user?.id === review.travelerId;

    return (
      <Card className="h-full shadow-none hover:shadow-md transition-shadow group relative border-zinc-200 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage src={review.traveler?.profileImage} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {review.traveler?.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(review.createdAt), "dd MMM, yyyy")}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1 mt-0.5" />
              <span className="text-xs font-bold text-yellow-700">
                {review.rating}.0
              </span>
            </div>
            {isMyReview && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditClick(review)}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => setDeletingReviewId(review.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed wrap-break-words">
            {review.comment}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8 mt-12 mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Reviews & Experiences
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="text-lg font-bold">{avgRating}</span>
            <span className="text-muted-foreground mx-1">•</span>
            <span className="text-muted-foreground underline cursor-pointer hover:text-primary transition-colors">
              {reviews.length} reviews
            </span>
          </div>
        </div>

        {user && (
          <Button
            onClick={() => {
              setEditingReview(null);
              setIsModalOpen(true);
            }}
            variant="outline"
            className="gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" /> Write a Review
          </Button>
        )}
      </div>

      {/* Main Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {/* ✅ Professional Button Design: Airbnb Style */}
          {reviews.length > 6 && (
            <div className="flex justify-start">
              {" "}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-2 px-8 h-auto text-base font-medium border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-all bg-transparent w-full md:w-auto"
                  >
                    Show all {reviews.length} reviews
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      {avgRating}{" "}
                      <span className="text-muted-foreground font-normal text-lg">
                        • {reviews.length} reviews
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="overflow-y-auto pr-2 mt-2 space-y-4 p-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviews.map((review) => (
                        <div key={review.id}>
                          <ReviewCard review={review} />
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed">
          <Avatar className="w-16 h-16 mx-auto mb-4 opacity-50">
            <AvatarFallback>
              <MessageSquarePlus className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">No reviews yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mt-2">
            This trip hasn&apos;t been reviewed yet. If you&apos;ve traveled
            with this host, be the first to share your experience!
          </p>
        </div>
      )}

      <ReviewFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planId={planId}
        initialData={editingReview}
      />

      <AlertDialog
        open={!!deletingReviewId}
        onOpenChange={() => setDeletingReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};