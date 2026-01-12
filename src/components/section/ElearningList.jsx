import React from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "../shared/CourseCard";
import { Search } from "lucide-react"; 
import { Input } from "@/components/ui/input";

// 1. Tambahkan Helper Format Rupiah di sini (atau import dari utils)
const formatRupiah = (value) => {
  const amount = Number(value);
  if (amount === 0) return "Gratis";
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const ElearningList = ({ title, subtitle, courses, searchQuery, onSearchChange, hideHeader }) => {
  return (
    <section className="pb-4 bg-background ">
      <div className="">
        
        {/* --- HEADER (JUDUL + SEARCH) --- */}
        {/* Tambahkan logic hideHeader biar fleksibel kalau mau dipake tanpa judul */}
        {!hideHeader && (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
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
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => {
            const formattedPrice = formatRupiah(course.price);

            return (
                <Link 
                  to={`/course/show/${course.id}`} 
                  key={course.id || index} 
                  className="block h-full transition-transform hover:scale-[1.02]" 
                >
                  <CourseCard 
                    {...course} 
                    price={formattedPrice} // <-- Kirim harga yang sudah rapi
                  />
                </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};