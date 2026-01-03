import React from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../shared/CourseCard";

export const ElearningBootcampList = ({ title, subtitle, courses = [] }) => {
  // HAPUS LOGIC FILTER DI SINI.
  // Component ini harusnya menerima data yang SUDAH BERSIH (sudah filter bootcamp semua)
  // dan SUDAH DIPOTONG (pagination) dari Parent.

  return (
    <section className="py-12 px-6 bg-background border-t">
      <div className="">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Grid sudah benar lg:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Langsung map saja, jangan filter lagi */}
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
        
        {/* Opsional: Handling jika kosong */}
        {courses.length === 0 && (
           <div className="text-center text-gray-500 py-10 col-span-full">
             Belum ada bootcamp tersedia.
           </div>
        )}
      </div>
    </section>
  );
};