import FeaturedPlans from "@/components/modules/Home/FeaturedPlans";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorksSection from "@/components/modules/Home/howItWorks";
import JoinCommunitySection from "@/components/modules/Home/JoinCommunity";
import PopularDestinationsSection from "@/components/modules/Home/PopularDestinations";
import SponsorsSection from "@/components/modules/Home/Sponsors";
import TestimonialsSection from "@/components/modules/Home/Testimonials";
import WhyChooseUsSection from "@/components/modules/Home/WhyChooseUs";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SafarSathi | Find Your Perfect Travel Buddy & Explore the World",
  description:
    "Connect with compatible travelers, plan meetups, and turn solo trips into shared adventures. Join SafarSathi - the secure platform for finding travel companions globally.",
};

export default async function HomePage() {
    const { data: user } = await getUserInfo();

  return (
    <>
      <main>
        {/* hero section */}
        <HeroSection />

        {/* 3. Featured Plans: The most important dynamic content */}
        {user && user?.user?.role === "TRAVELER" && <FeaturedPlans />}

        {/* Popular Destinations Section */}
        <PopularDestinationsSection />

        {/* how it works section */}
        <HowItWorksSection />

        {/* testimonials section */}
        <TestimonialsSection />

        {/* why choose us section */}
        <WhyChooseUsSection />

        {/* top rated travelers section */}
        <JoinCommunitySection />

        {/* sponsors section */}
        <SponsorsSection />

      </main>
    </>
  );
}
