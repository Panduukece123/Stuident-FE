import React from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../shared/CourseCard"; // Sesuaikan path import

export const ElearningCourseList = ({ title, subtitle, courses = [] }) => {
  // HAPUS LOGIC FILTER DI SINI. TERIMA APA ADANYA.
  
  return (
    <section className="py-12 px-6 bg-background border-t">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Pastikan lg:grid-cols-4 agar muat 4 baris */}
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