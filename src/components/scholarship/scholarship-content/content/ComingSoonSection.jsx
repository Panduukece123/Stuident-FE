import ComingSoonItem from "@/components/shared/ComingSoonItem";
import React, { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comingSoonData } from "@/data/mockData";

const ComingSoonSection = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370; // 350px width + 20px gap
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
    <div className="flex flex-col gap-6 mb-4">
      <div className="flex flex-row justify-between items-center mx-4 px-2">
        <h3 className="font-medium text-2xl">Coming Soon</h3>

        <Link
          to="/coming-soon-list"
          className="text-lg font-medium opacity-75 text-sky-400 hover:text-sky-600 transition duration-150"
        >
          See More
        </Link>
      </div>

      {/* card */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-slate-100 rounded-2xl "
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8 text-gray-800" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-6 mx-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth scrollbar-hide"
        >
          {comingSoonData.map((item) => (
            <ComingSoonItem key={item.id} name={item.name} />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-slate-100 rounded-2xl "
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8 text-gray-800" />
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonSection;
