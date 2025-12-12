import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import { CourseCard } from "../shared/CourseCard";

export const ElearningBootcampList = ({ title, subtitle, courses }) => {
  return (
    <section className="py-12 px-6 bg-background border-t">
      <div className="">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
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