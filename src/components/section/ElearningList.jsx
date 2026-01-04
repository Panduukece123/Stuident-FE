import React from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../shared/CourseCard";
import { Search } from "lucide-react"; 
import { Input } from "@/components/ui/input";

export const ElearningList = ({ title, subtitle, courses, searchQuery, onSearchChange }) => {
  return (
    <section className="pt-12 pb-4 px-6 bg-background border-t">
      <div className="">
        
        {/* --- HEADER (JUDUL + SEARCH) --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>

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
          {courses.map((course, index) => (
            <Link 
              to={`/course/show/${course.id}`} 
              key={course.id || index} 
              className="block h-full transition-transform hover:scale-[1.02]" 
            >
              <CourseCard {...course} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};