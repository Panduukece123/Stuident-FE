import React from "react";
import { Link } from "react-router-dom";
import { EnrolledCourseCard } from "../shared/EnrolledCourseCard";
import { Search } from "lucide-react"; // Import Icon
import { Input } from "@/components/ui/input"; // Import Input

export const ElearningEnrolledList = ({ title, subtitle, courses = [], searchQuery, onSearchChange }) => {
  
  const displayCourses = courses; 

  // Note: Early return null dihapus agar Search Bar tetap muncul walau hasil search 0
  // if (displayCourses.length === 0) { return null; }

  return (
    <section className="pt-12 pb-4 px-6 bg-background border-t">
      <div className="">
        
        {/* --- HEADER (JUDUL + SEARCH) --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Search Bar */}
            {onSearchChange && (
                <div className="w-full md:w-72 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Cari..."
                        className="pl-9 bg-white"
                    />
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCourses.map((item, index) => {
            const courseId = item.id;
            return (
              <Link 
                to={`/my-courses/learn/${courseId}`} 
                key={item.id || index} 
                className="block h-full transition-transform hover:scale-[1.02]" 
              >
                <EnrolledCourseCard {...item} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};