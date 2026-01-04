// app/dashboard/buddy-requests/page.tsx

import { RequestsTable } from "@/components/modules/Traveler/BuddyRequests/RequestsTable";
import { getIncomingRequests } from "@/services/traveler/tripRequest.service";
import { UserPlus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buddy Requests | Manage Trip Participants - SafarSathi",
  description:
    "Review incoming requests from travelers who want to join your trips. Approve compatible travel buddies, manage applications, and finalize your travel team.",
  robots: {
    index: false,
    follow: true,
  },
};

const BuddyRequestsPage = async () => {
  const { data } = await getIncomingRequests();

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Buddy Requests
          </h1>
        </div>
        <p className="text-muted-foreground ml-1">
          Manage incoming requests from travelers who want to join your trips.
        </p>
      </div>

      {/* Main Table Content */}
      <section>
        <RequestsTable requests={data || []} />
      </section>
    </div>
  );
};

export default BuddyRequestsPage;