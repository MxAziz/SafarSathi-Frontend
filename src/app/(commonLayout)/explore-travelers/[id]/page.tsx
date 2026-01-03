import BlurFade2 from "@/components/magicui/blur-fade2";
import { TravelerContactInfo } from "@/components/modules/Explore-Travelers/Traveler-Contact-Info";
import { TravelerDetails } from "@/components/modules/Explore-Travelers/Traveler-Details";
import { TravelerProfileCard } from "@/components/modules/Explore-Travelers/Traveler-Profile-Card";
import { getTravelerById } from "@/services/traveler/traveler.service";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: traveler } = await getTravelerById(id);
  if (!traveler) {
    return {
      title: "Traveler Not Found | SafarSathi",
      description: "The traveler profile you are looking for does not exist.",
    };
  }

  return {
    title: `${traveler.name} | Travel Buddy Profile - SafarSathi`,
    description:
      traveler.bio ||
      `Connect with ${traveler.name} on SafarSathi. View their travel history, interests, and upcoming trip plans to see if you match as travel buddies.`,
    keywords: [
      traveler.name,
      "Travel Buddy",
      "SafarSathi Profile",
      "Travel Companion",
      "Trip Partner",
    ],
  };
}

export default async function TravelerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: traveler } = await getTravelerById(id);
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <BlurFade2 delay={0.1} inView>
          <TravelerProfileCard traveler={traveler} />
        </BlurFade2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar (Contact Info) */}
          <div className="lg:col-span-1">
            <BlurFade2 delay={0.2} inView className="h-full">
              <TravelerContactInfo traveler={traveler} />
            </BlurFade2>
          </div>

          {/* Right Main Content (Details) */}
          <div className="lg:col-span-2">
            <BlurFade2 delay={0.3} inView>
              <TravelerDetails traveler={traveler} />
            </BlurFade2>
          </div>
        </div>
      </div>
    </div>
  );
}