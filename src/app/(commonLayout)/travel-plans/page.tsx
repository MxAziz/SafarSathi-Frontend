import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users, Clock, CheckCircle2, Star, } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RequestButton } from "@/components/modules/TravelPlan/RequestButton";
import { getTravelPlanById } from "@/services/traveler/travelPlan.service";
import Link from "next/link";
import { ReviewSection } from "@/components/modules/Reviews/ReviewSection";
import { getReviews } from "@/services/review/review.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Dynamic Metadata Generator for Travel Details
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plan = await getTravelPlanById(id);
  if (!plan) {
    return {
      title: "Trip Not Found | GoPal",
      description: "The travel plan you are looking for does not exist.",
    };
  }

  const tripDate = format(new Date(plan.startDate), "MMMM d, yyyy");

  return {
    title: `${plan.title} - Trip to ${plan.destination} | GoPal`,
    description: `Join this ${plan.travelType} trip to ${plan.destination} starting on ${tripDate}. Budget: ${plan.budgetRange}. Organized by ${plan.traveler?.name}.`,
    keywords: [
      plan.destination,
      "Travel Plan",
      plan.travelType,
      "Group Trip",
      "GoPal Travel",
      "Trip Itinerary",
    ],
  };
}

// Helper for duration calculation
function getDays(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = Math.abs(e.getTime() - s.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default async function TravelPlanDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: user } = await getUserInfo();
  const [plan, reviewsResult] = await Promise.all([
    getTravelPlanById(id),
    getReviews(id),
  ]);

  if (!plan) return notFound();

  const reviews = reviewsResult?.data || [];

  // const isOwner = currentUser?.id === plan.travelerId;
  // const isOwner = false; // আপাতত false

  const heroImage =
    plan?.imageUrl ||
    `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop`;

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20">
      {/* 1. Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <Image
          src={heroImage}
          alt={plan.destination}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-10">
          <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 text-sm">
            {plan?.travelType} Trip
          </Badge>
          <h1 className="text-4xl md:text-6xl tracking-tight font-extrabold text-white mb-2 shadow-sm">
            {plan?.title}
          </h1>
          <div className="flex items-center text-white/90 gap-4 text-lg">
            <span className="flex items-center gap-1">
              <MapPin className="w-5 h-5" /> {plan?.destination}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl">About this Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {plan?.description}
                </p>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">
                      Duration
                    </div>
                    <div className="font-bold">
                      {getDays(plan.startDate, plan.endDate)} Days
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-bold capitalize">
                      {plan.travelType.toLowerCase()}
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-bold">{plan.budgetRange}</div>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">Start</div>
                    <div className="font-bold">
                      {format(new Date(plan?.startDate), "MMM d")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary Section */}
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl">Itinerary Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 space-y-8 pl-8 py-2">
                  {[1, 2, 3].map((day) => (
                    <div key={day} className="relative">
                      <div className="absolute -left-[41px] bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-black">
                        {day}
                      </div>
                      <h4 className="font-bold text-lg mb-1">
                        Day {day}: Exploration & Fun
                      </h4>
                      <p className="text-muted-foreground">
                        Detailed activities for day {day} would go here.
                        Visiting local landmarks, trying authentic food, and
                        evening gatherings.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ✅ Reviews Section Added Here */}
            <ReviewSection planId={id} reviews={reviews} user={user} />

            {/* Host Profile Summary */}
            <Card className="border-none shadow-none overflow-hidden">
              <div className="bg-zinc-100 dark:bg-zinc-900 p-6 flex items-center gap-6">
                <Avatar className="w-20 h-20 border-4 border-white dark:border-black shadow-sm">
                  <AvatarFallback className="text-2xl">
                    {plan?.traveler?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{plan.traveler.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                    <span>Host & Organizer</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="ml-1 font-medium">
                        {plan?.traveler?.averageRating != null
                          ? Number(plan.traveler.averageRating).toFixed(1)
                          : "New"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">
                  Why travel with {plan.traveler.name.split(" ")[0]}?
                </h4>
                <p className="text-muted-foreground text-sm">
                  &quot;I love exploring new cultures and meeting people. I
                  ensure safe and fun trips for everyone!&quot;
                </p>
                <Link href={`/explore-travelers/${plan?.traveler?.id}`}>
                  <Button
                    variant="link"
                    className="px-0 mt-2 text-primary cursor-pointer"
                  >
                    View Full Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* 3. Sidebar (Right Column) - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-none border-primary/10 border-2">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estimated Cost
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {plan?.budgetRange}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* ... Sidebar Content ... */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Start Date
                      </span>
                      <span className="font-medium">
                        {format(new Date(plan.startDate), "PPP")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> End Date
                      </span>
                      <span className="font-medium">
                        {format(new Date(plan.endDate), "PPP")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" /> Slots
                      </span>
                      <span className="font-medium text-green-600">
                        4 Spots Left
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Non-smoking
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Early Bird
                      </Badge>
                    </div>
                  </div>

                  <RequestButton id={plan.id} />

                  <p className="text-xs text-center text-muted-foreground mt-2">
                    You won&apos;t be charged yet. Host needs to approve.
                  </p>
                </CardContent>
              </Card>

              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 flex items-start gap-3 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Identity Verified</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    This trip is hosted by a verified traveler. Payment is held
                    securely until the trip starts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}