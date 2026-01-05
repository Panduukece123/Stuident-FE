import ComingSoonItem from "@/components/shared/ComingSoonItem";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, CalendarClock, BellRing } from "lucide-react"; // Icon baru
import { Button } from "@/components/ui/button";
import { comingSoonData } from "@/data/mockData";

const ComingSoonSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-12 mb-16 px-4 lg:px-8">
      {/* Header Section */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-full">
            <CalendarClock className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
              Coming Soon
              <BellRing className="w-4 h-4 text-teal-500/70" />
            </h3>
            <p className="text-sm text-gray-500">
              Prepare yourself for upcoming opportunities
            </p>
          </div>
        </div>
        
        {/* Optional: Tombol 'Notify Me' atau semacamnya kalau mau */}
      </div>

      {/* Card Slider Container */}
      <div className="relative group/slider">
        {/* Tombol Kiri */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md border-gray-200 hover:bg-white hover:scale-105 transition-all hidden md:flex opacity-0 group-hover/slider:opacity-100"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </Button>

        {/* Scrollable Area */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-5 overflow-x-auto pb-4 px-2 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {comingSoonData.map((item) => (
            // Bungkus item dengan snap-center agar berhenti pas di tengah saat digeser
            <div key={item.id} className="snap-center flex-shrink-0">
              <ComingSoonItem name={item.name} />
            </div>
          ))}
        </div>

        {/* Tombol Kanan */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md border-gray-200 hover:bg-white hover:scale-105 transition-all hidden md:flex opacity-0 group-hover/slider:opacity-100"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonSection;