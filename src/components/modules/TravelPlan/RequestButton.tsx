"use client";

import { Button } from "@/components/ui/button";
import { sendTripRequest } from "@/services/traveler/tripRequest.service";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you use Sonner or Shadcn toast

export function RequestButton({ id }: { id: string }) {
  const router = useRouter();
  const handleJoin = async () => {
    const result = await sendTripRequest(id);
    if (result.success) {
      toast.success("Request sent to the host!");
      router.push("/dashboard/requested-trips");
    } else {
      toast.error(result.message || "Request sent failed to the host!");
    }
  };

  return (
    <Button
      onClick={handleJoin}
      size="lg"
      className="w-full text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all"
    >
      <Send className="w-4 h-4 mr-2" />
      Request to Join
    </Button>
  );
}