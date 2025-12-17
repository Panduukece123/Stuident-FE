import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // <--- IMPORT PENTING
import { Navbar } from "../components/shared/Navbar";
import { ElearningBanner } from "../components/section/ElearningBanner";
import { ElearningCategories } from "../components/section/ElearningCategories";
import { ElearningCourseList } from "../components/section/ElearningCourseList";
import ElearningService from "@/services/elearningService";
import ProfileService from "@/services/ProfileService";
import { ElearningList } from "@/components/section/ElearningList";
import { InfoBootcamp } from "@/components/section/InfoBootcampSection";
import { ElearningBootcampList } from "@/components/section/ElearningBootcampList";
import { ElearningEnrolledList } from "@/components/section/ElearningEnrolledList";

export const ElearningPage = () => {
  // --- PAGINATION STATE (Tetap pakai useState) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [popularPage, setPopularPage] = useState(1);
  const popularLimit = 10;

  const [bootcampPage, setBootcampPage] = useState(1);
  const bootcampLimit = 10;

  // --- 1. QUERY: AMBIL SEMUA KURSUS (KATALOG) ---
  const { 
    data: courses = [], // Default empty array biar gak error map
    isLoading: loadingCourses, 
    isError: isCoursesError,
    error: coursesError 
  } = useQuery({
    queryKey: ["courses"], // Key unik untuk cache
    queryFn: ElearningService.fetchCourses,
    staleTime: 1000 * 60 * 5, // Data dianggap segar selama 5 menit
  });

  // --- 2. QUERY: AMBIL ENROLLED COURSES (USER LOGGED IN) ---
  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ["enrolled-courses"],
    queryFn: async () => {
      try {
        // Logic safe fetch seperti sebelumnya
        const res = await ProfileService.getEnrolledCourses();
        return Array.isArray(res) ? res : (res.data || []);
      } catch (err) {
        // Kalau error (401 Guest), kembalikan array kosong (silent fail)
        return [];
      }
    },
    retry: false, // Jangan coba ulang kalau gagal (biar gak spam 401)
    staleTime: 1000 * 60 * 2, // 2 menit
  });

  // --- LOGIC PAGINATION (Sama Persis) ---
  // Pagination 1: Temukan Keahlian Baru
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Pagination 2: Terpopuler
  const idxLastPop = popularPage * popularLimit;
  const idxFirstPop = idxLastPop - popularLimit;
  const currentPopularCourses = courses.slice(idxFirstPop, idxLastPop);
  const totalPopularPages = Math.ceil(courses.length / popularLimit);

  // Pagination 3: Bootcamp
  const idxLastBoot = bootcampPage * bootcampLimit;
  const idxFirstBoot = idxLastBoot - bootcampLimit;
  const currentBootcampCourses = courses.slice(idxFirstBoot, idxLastBoot);
  const totalBootcampPages = Math.ceil(courses.length / bootcampLimit);

  // Kategori Unik
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  // --- UI LOADING & ERROR ---
  // Cukup cek loadingCourses karena enrolledCourses sifatnya opsional/silent
  if (loadingCourses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isCoursesError) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-500 font-medium">
          {coursesError?.message || "Gagal memuat katalog kursus."}
        </p>
        <button
          onClick={() => window.location.reload()} // Reload manual atau invalidate query
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // --- HELPER COMPONENT ---
  const PaginationControl = ({ page, total, onPageChange }) => {
    if (total <= 1) return null;
    return (
      <div className="container mx-auto px-6 py-4 flex justify-center items-center gap-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {page} of {total}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === total}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ElearningBanner />
        <ElearningCategories categories={uniqueCategories} />

        {/* SECTION 1: ENROLLED COURSES (Otomatis muncul jika ada data) */}
        {enrolledCourses.length > 0 && (
          <ElearningEnrolledList
            title="Kursus yang Sedang Diikuti"
            subtitle="Lanjutkan progres belajar Anda."
            courses={enrolledCourses} 
          />
        )}

        {/* SECTION 2: TEMUKAN KEAHLIAN BARU */}
        <ElearningList
          title="Temukan Keahlian Baru"
          subtitle="Perluas wawasan Anda dengan mempelajari topik-topik relevan."
          courses={currentCourses}
        />
        <PaginationControl 
          page={currentPage} 
          total={totalPages} 
          onPageChange={setCurrentPage} 
        />

        {/* SECTION 3: TERPOPULER */}
        <ElearningCourseList
          title="Kursus Terpopuler"
          subtitle="Lihat apa yang sedang dipelajari oleh ribuan anggota lain."
          courses={currentPopularCourses}
        />
        <PaginationControl 
          page={popularPage} 
          total={totalPopularPages} 
          onPageChange={setPopularPage} 
        />

        {/* SECTION 4: INFO BOOTCAMP */}
        <InfoBootcamp />

        {/* SECTION 5: BOOTCAMP LIST */}
        <ElearningBootcampList
          title="Kursus Bootcamp"
          subtitle="Pilih kursus terbaik untuk meningkatkan skill kamu"
          courses={currentBootcampCourses}
        />
        <PaginationControl 
          page={bootcampPage} 
          total={totalBootcampPages} 
          onPageChange={setBootcampPage} 
        />

      </main>
    </div>
  );
};