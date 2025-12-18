import React, { useState, useEffect } from "react"; // Tambah useEffect
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom"; // <--- WAJIB IMPORT INI
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
import { BookOpen } from "lucide-react";

export const ElearningPage = () => {
  // --- 1. SETUP SCROLL LOGIC ---
  const { hash } = useLocation(); // Ambil hash dari URL (misal: #course)

  // ... (State Login & Pagination Tetap Sama) ...
  const token = localStorage.getItem("token");
  const isLoggedIn = !!localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [popularPage, setPopularPage] = useState(1);
  const popularLimit = 10;
  const [bootcampPage, setBootcampPage] = useState(1);
  const bootcampLimit = 10;

  // ... (Query Tetap Sama) ...
  const {
    data: courses = [],
    isLoading: loadingCourses,
    isError: isCoursesError,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: ElearningService.fetchCourses,
    staleTime: 1000 * 60 * 5,
  });

  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ["enrolled-courses", token],
    queryFn: async () => {
      if (!isLoggedIn) return [];
      try {
        const res = await ProfileService.getEnrolledCourses();
        return Array.isArray(res) ? res : res.data || [];
      } catch (err) {
        return [];
      }
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 2,
  });

  // --- 2. EFFECT UNTUK SCROLL OTOMATIS ---
  // Dijalankan setiap kali loading selesai atau hash berubah
  useEffect(() => {
    // Cek jika tidak loading DAN ada hash di URL
    if (!loadingCourses && hash) {
      // Hapus tanda pagar '#' jadi tinggal 'course' atau 'bootcamp'
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        // Beri sedikit timeout agar render UI benar-benar selesai
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [loadingCourses, hash]); // Dependency: Jalankan saat loading selesai

  // ... (Logic Pagination Tetap Sama) ...
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const idxLastPop = popularPage * popularLimit;
  const idxFirstPop = idxLastPop - popularLimit;
  const currentPopularCourses = courses.slice(idxFirstPop, idxLastPop);
  const totalPopularPages = Math.ceil(courses.length / popularLimit);

  const idxLastBoot = bootcampPage * bootcampLimit;
  const idxFirstBoot = idxLastBoot - bootcampLimit;
  const currentBootcampCourses = courses.slice(idxFirstBoot, idxLastBoot);
  const totalBootcampPages = Math.ceil(courses.length / bootcampLimit);

  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  // ... (Loading & Error UI Tetap Sama) ...
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
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

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

        {isLoggedIn &&
          (enrolledCourses.length > 0 ? (
            <ElearningEnrolledList
              title="Kursus yang Sedang Diikuti"
              subtitle="Lanjutkan progres belajar Anda."
              courses={enrolledCourses}
            />
          ) : (
            <section className="px-6 py-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Kursus yang Sedang Diikuti
                </h2>
                <p className="text-muted-foreground">
                  Lanjutkan progres belajar Anda.
                </p>
              </div>
              <div className="w-full py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-gray-50/50">
                <div className="bg-white p-4 rounded-full shadow-sm">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Belum ada kursus yang diikuti
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1">
                    Anda belum mendaftar di kursus manapun. Yuk, mulai
                    perjalanan belajar Anda sekarang!
                  </p>
                </div>
              </div>
            </section>
          ))}

        {/* --- 3. PASANG ID UNTUK COURSE --- */}
        {/* Tambahkan div wrapper dengan ID 'course' dan class scroll-mt biar gak ketutup navbar */}
        <div>
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
        </div>

        {/* --- SECTION 3: TERPOPULER --- */}
        <div id="course" className="scroll-mt-10">
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
        </div>

        <InfoBootcamp />

        {/* --- 4. PASANG ID UNTUK BOOTCAMP --- */}
        <div id="bootcamp" className="scroll-mt-10">
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
        </div>
      </main>
    </div>
  );
};
