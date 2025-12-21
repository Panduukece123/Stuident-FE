import { EnrolledCourseList } from "@/components/section/EnrolledCourseList";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // 1. Import useQuery
import ProfileService from "@/services/ProfileService";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MyProfileEnrolledSkeleton } from "@/components/ProfileSkeleton";

export const MyProfileEnrolledCourse = () => {
  // --- STATE ---
  // Kita hanya butuh state untuk UI (Search), data & loading diurus TanStack
  const [searchQuery, setSearchQuery] = useState("");

  // --- 2. FETCH DATA DENGAN TANSTACK QUERY ---
  const { 
    data: courses = [], // Default ke array kosong biar gak error pas filter
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["my-enrolled-courses"], // Key unik untuk cache
    queryFn: async () => {
      const res = await ProfileService.getEnrolledCourses();
      // Pastikan return-nya Array. Jaga-jaga kalau response-nya { data: [...] }
      return Array.isArray(res) ? res : (res.data || []);
    },
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
  });

  // --- 3. LOGIC FILTERING (Client Side) ---
  // Filter dijalankan setiap render berdasarkan data dari TanStack & state search
  const filteredCourses = courses.filter((course) => {
    // Sesuaikan field ini dengan struktur JSON backendmu
    const courseName = course.title || course.course?.title || "";
    return courseName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // --- 4. TAMPILAN LOADING ---
  if (isLoading) {
    return <MyProfileEnrolledSkeleton />
  }

  // Opsional: Tampilan Error
  if (isError) {
    return (
      <div className="min-h-[20vh] flex items-center justify-center text-red-500">
        Gagal memuat data kursus.
      </div>
    );
  }

  // --- 5. TAMPILAN UTAMA ---
  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">Enrolled Course</h1>
      </div>

      {/* --- BAGIAN SEARCH --- */}
      <div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari kursus saya..."
            className="pl-9 bg-white border-neutral-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        {/* Render filteredCourses */}
        {filteredCourses.length > 0 ? (
          <EnrolledCourseList courses={filteredCourses} />
        ) : (
          <div className="text-center py-10 text-muted-foreground bg-neutral-50 rounded-xl border border-dashed border-neutral-200 mx-4 md:mx-0">
            {searchQuery ? (
              <span>Kursus "{searchQuery}" tidak ditemukan.</span>
            ) : (
              <span>Kamu belum mengikuti kursus apapun.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};