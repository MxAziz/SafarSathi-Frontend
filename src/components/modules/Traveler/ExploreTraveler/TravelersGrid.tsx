"use client";

import { useState } from "react";

import TravelerCard from "./TravelerCard";
import TravelerDetailsModal from "./TravelerDetailsModal";
import { ITraveler } from "@/types/traveler.interface";
import BlurFade from "@/components/magicui/blur-fade";

export default function TravelersGrid({
  travelers,
}: {
  travelers: ITraveler[];
}) {
  const [selectedTraveler, setSelectedTraveler] = useState<ITraveler | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (traveler: ITraveler) => {
    setSelectedTraveler(traveler);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {travelers.map((traveler, index) => (
          <BlurFade key={traveler.id} delay={0.25 + index * 0.05} inView>
            <TravelerCard
              traveler={traveler}
              onClick={() => handleCardClick(traveler)}
            />
          </BlurFade>
        ))}
      </div>

      {/* Modal */}
      <TravelerDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        traveler={selectedTraveler}
      />
    </>
  );
}