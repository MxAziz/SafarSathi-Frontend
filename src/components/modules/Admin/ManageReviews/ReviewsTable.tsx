import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, MessageSquareOff, Quote } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import DeleteReviewDialog from "./DeleteReviewDialog";

// Interface based on your data structure
interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  traveler: {
    name: string;
    email: string;
  };
  travelPlan: {
    title: string;
    destination: string;
  };
}

export default function ReviewsTable({ reviews }: { reviews: IReview[] }) {
  // Helper to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          ({rating})
        </span>
      </div>
    );
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Empty State
  if (!reviews || reviews.length === 0) {
    return (
      <Card className="shadow-sm border-none bg-background">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-muted/10 border-dashed">
            <div className="bg-muted p-4 rounded-full mb-3">
              <MessageSquareOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Reviews Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              There are no reviews submitted yet. Check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-none bg-background">
      <CardHeader>
        <CardTitle>All Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[250px]">Reviewer</TableHead>
                <TableHead className="hidden md:table-cell w-[300px]">
                  Travel Plan
                </TableHead>
                <TableHead className="hidden lg:table-cell">Comment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review, idx) => (
                <TableRow
                  key={review.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  {/* 1. Reviewer Info */}
                  <TableCell className="align-top">
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border mt-0.5">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {review.traveler.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {review.traveler.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 2. Travel Plan Info */}
                  <TableCell className="hidden md:table-cell align-top">
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-sm font-medium line-clamp-1"
                          title={review.travelPlan.title}
                        >
                          {review.travelPlan.title}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">
                            {review.travelPlan.destination}
                          </span>
                        </div>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 3. Comment Preview */}
                  <TableCell className="hidden lg:table-cell align-top">
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="relative pl-3 border-l-2 border-muted italic text-sm text-muted-foreground max-w-md">
                        <Quote className="absolute -top-1 -left-1 w-2 h-2 text-muted-foreground/50 rotate-180" />
                        <p className="line-clamp-2" title={review.comment}>
                          {review.comment}
                        </p>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 4. Rating Badge */}
                  <TableCell className="align-top">
                    <BlurFade delay={0.05 * idx} inView>
                      <Badge
                        variant="outline"
                        className={`font-normal ${
                          review.rating >= 4
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-yellow-200 bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {renderStars(review.rating)}
                      </Badge>
                    </BlurFade>
                  </TableCell>

                  {/* 5. Actions */}
                  <TableCell className="text-right align-top">
                    <BlurFade delay={0.05 * idx} inView>
                      <DeleteReviewDialog id={review.id} />
                    </BlurFade>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}