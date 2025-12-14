import { Card, CardContent } from "@/components/ui/card";
import React, { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import scholarshipService from "@/services/ScholarshipService";
import { useScholarship } from "@/context/ScholarshipContext";
import { useQuery } from "@tanstack/react-query";

const PopularScholarship = () => {
  const scrollContainerRef = useRef(null);
  const { filters, setShowAllList, updateFilter } = useScholarship();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["popularity-scholarships", filters],
    queryFn: async () => {
      const params = { status: filters.status || "open", ...filters };
      const response = await scholarshipService.getPopularityScholarships(
        params
      );
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
      const scrollAmount = 354;
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
    <div className="flex flex-col gap-6 mb-4">
      <div className="flex flex-row justify-between items-center mx-4 px-2">
        <h3 className="font-medium text-2xl">Popular Scholarship</h3>

        <div
          onClick={handleSeeMore}
          className="text-lg font-medium text-sky-400 opacity-75 hover:text-sky-600 transition duration-150 cursor-pointer"
        >
          See More
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-slate-100 rounded-2xl"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex flex-row gap-2 overflow-x-auto px-4 scroll-smooth scrollbar-hide py-2" // Tambah py-2 biar shadow ga kepotong
          >
            {scholarships.map((scholarship) => (
              <Link  to={`/scholarship/show/${scholarship.id}`}>

             
              <Card
                key={scholarship.id}
                className=" hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0 w-[350px] min-w-[350px] h-[520px] m-0 bg-white overflow-hidden border-none shadow-md mx-4 mb-2 flex flex-col"
              >
                
                <img
                  src={scholarship.image || "https://placehold.co/300x200"}
                  alt={scholarship.name}
                  className="w-full h-60 object-cover cursor-pointer"
                />

                <CardContent className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2 cursor-pointer line-clamp-2 min-h-14">
                    {scholarship.name}
                  </h3>

                  <p className="text-sm text-muted-foreground text-justify mb-4 line-clamp-3">
                    {scholarship.description}
                  </p>

                  <div className="flex gap-2 justify-center mb-2 text-xs flex-wrap">
                    <span className="bg-primary/10 px-2 py-1 rounded-full">
                      {scholarship.location}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {scholarship.status}
                    </span>
                  </div>
                  <Link
                    to={`/scholarship/show/${scholarship.id}`}
                    className="w-full mt-auto"
                  >
                    <Button className="cursor-pointer w-full mt-auto bg-[#3DBDC2] text-white hover:bg-[#2da8ad] transition-colors">
                      See Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
               </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-slate-100 rounded-2xl"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PopularScholarship;
