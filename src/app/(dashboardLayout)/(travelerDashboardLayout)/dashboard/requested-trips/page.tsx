/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyState } from "@/components/modules/Traveler/RequestedTrip/EmptyState";
import { RequestCard } from "@/components/modules/Traveler/RequestedTrip/RequestCard";
import { getMyTripRequest } from "@/services/traveler/tripRequest.service";
import { Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sent Trip Requests | Track Application Status - SafarSathi",
  description:
    "View and manage your requests to join other travelers' plans. Check if your request is pending, approved, or rejected by the host.",
  robots: {
    index: false,
    follow: true,
  },
};

const MyRequestTripPage = async () => {
  const { data } = await getMyTripRequest();

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Send className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Requested Trips
          </h1>
        </div>
        <p className="text-muted-foreground ml-1">
          Track the status and details of your sent travel requests.
        </p>
      </div>

      {/* Main Content */}
      <section>
        {!data || data.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-5">
            {data.map((request: any, index: number) => (
              <RequestCard key={request.id} request={request} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyRequestTripPage;