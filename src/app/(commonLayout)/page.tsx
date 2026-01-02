import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorksSection from "@/components/modules/Home/howItWorks";
import PopularDestinationsSection from "@/components/modules/Home/PopularDestinations";
import TestimonialsSection from "@/components/modules/Home/Testimonials";
import WhyChooseUsSection from "@/components/modules/Home/WhyChooseUs";
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
        <HeroSection />

        {/* Popular Destinations Section */}
        <PopularDestinationsSection />

        {/* how it works section */}
        <HowItWorksSection />

        {/* testimonials section */}
        <TestimonialsSection />

        {/* why choose us section */}
        <WhyChooseUsSection />

      </main>
    </>
  );
}
