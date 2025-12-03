import React from "react";
import { CourseCard } from "../shared/CourseCard";

export const ElearningCourseList = ({ title, subtitle, courses }) => {
  return (
    <section className="py-12 px-6 bg-background border-t">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};
