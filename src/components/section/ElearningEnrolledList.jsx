import React from "react";
import { Link } from "react-router-dom";
import { EnrolledCourseCard } from "../shared/EnrolledCourseCard";

export const ElearningEnrolledList = ({ title, subtitle, courses = [] }) => {
  
  const displayCourses = courses; 

  if (displayCourses.length === 0) {
     return null; // Atau return div kosong biar rapi
  }

  return (
    <section className="py-12 px-6 bg-background border-t">
      <div className="">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
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