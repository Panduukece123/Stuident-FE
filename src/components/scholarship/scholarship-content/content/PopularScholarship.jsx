import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Flame, Sparkles } from "lucide-react"; // Tambah icon Flame/Sparkles
import { Button } from "@/components/ui/button";
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";
import { ScholarshipCard } from "@/components/shared/ScholarshipCard";

const PopularScholarship = () => {
  const scrollContainerRef = useRef(null);
  const { filters, setShowAllList, updateFilter } = useScholarship();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["popularity-scholarships", filters],
    queryFn: async () => {
      const params = { status: filters.status || "open", ...filters };
      const response = await scholarshipService.getPopularityScholarships(params);
      if (!response.sukses) {
        throw new Error("Failed to fetch popular scholarships");
      }
      return response.data;
    },
    select: (data) =>
      data
        .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
        .slice(0, 6),
    placeholderData: [],
  });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; 
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSeeMore = () => {
    setShowAllList(true);
    updateFilter("sort", "popular");
  };

  return (
    <div className="relative flex flex-col gap-6 mb-10 py-8 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl mx-4 lg:mx-8 border border-blue-100/50 shadow-lg overflow-hidden">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-row justify-between items-center px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-full">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
              Beasiswa Populer
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </h3>
            <p className="text-sm text-gray-500 hidden md:block">
              Beasiswa yang paling populer di platform kami
            </p>
          </div>
        </div>

        <div
          onClick={handleSeeMore}
          className="group flex items-center gap-1 text-sm font-semibold text-primary cursor-pointer px-3 py-1.5 rounded-full hover:bg-primary/10 transition-all duration-200"
        >
          Lihat Semua
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="relative group/slider">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md border-gray-200 hover:bg-white hover:scale-105 transition-all hidden md:flex opacity-0 group-hover/slider:opacity-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Container Card */}
          <div
            ref={scrollContainerRef}
            className="flex flex-row gap-5 overflow-x-auto px-6 lg:px-10 py-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="snap-center w-[325px] min-w-[320px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1">
                <ScholarshipCard
                  id={scholarship.id}
                  name={scholarship.name}
                  organization={scholarship.organization?.name}
                  description={scholarship.description}
                  location={scholarship.location}
                  status={scholarship.status}
                  studyField={scholarship.study_field}
                  deadline={scholarship.deadline}
                  image_url={scholarship.image_url}
                />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md border-gray-200 hover:bg-white hover:scale-105 transition-all hidden md:flex opacity-0 group-hover/slider:opacity-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PopularScholarship;