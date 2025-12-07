import { Card, CardContent } from "@/components/ui/card";
import React, { useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scholarshipData } from "@/data/mockData";

const PopularScholarship = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 354; // 350px width + 4px gap
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
    <div className="flex flex-col gap-6 mb-4 ">
      <div className="flex flex-row justify-between items-center mx-4 px-2">
        <h3 className="font-medium text-2xl">Popular Scholarship</h3>

        <Link
          to="/popular-scholarship-list"
          className="text-lg font-medium text-sky-400 opacity-75 hover:text-sky-600 transition duration-150"
        >
          See More
        </Link>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10  hover:bg-slate-100 rounded-2xl "
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-2 overflow-x-auto px-4 scroll-smooth scrollbar-hide"
        >
          {/* card */}
          {scholarshipData.map((scholarship) => (
            <Card
              key={scholarship.id}
              className="w-[350px] min-w-[350px] m-0 p-0 bg-white overflow-hidden border-none shadow-md mx-4 mb-2"
            >
              <img
                src="https://placehold.co/300x200"
                alt={scholarship.name}
                className="w-full h-60 object-cover cursor-pointer"
              />

              <CardContent className="text-center p-4 h-50">
                {" "}
                {/* Atur padding teks di sini */}
                <h3 className="font-semibold text-lg mb-2 cursor-pointer">
                  {scholarship.name}
                </h3>
                <p className="text-sm text-muted-foreground text-justify mb-4">
                  {scholarship.deskripsi}
                </p>

                <Button className="text-center bg-[#3DBDC2] text-white px-4 py-2 rounded-md mt-4 cursor-pointer">See Detail</Button>
              </CardContent>
              
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10  hover:bg-slate-100 rounded-2xl"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6 " />
        </Button>

        
      </div>
    </div>
  );
};

export default PopularScholarship;
