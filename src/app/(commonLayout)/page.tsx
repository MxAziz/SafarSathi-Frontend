import HeroSection from "@/components/modules/Home/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SafarSathi | Find Your Perfect Travel Buddy & Explore the World",
  description:
    "Connect with compatible travelers, plan meetups, and turn solo trips into shared adventures. Join SafarSathi - the secure platform for finding travel companions globally.",
};

export default function HomePage() {
  return (
    <>
      <main>
        {/* hero section */}
        <HeroSection/>

      </main>
    </>
  );
}
