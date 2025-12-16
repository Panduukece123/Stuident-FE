import React, { useEffect, useState } from "react";
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
  // --- STATE DATA ---
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- PAGINATION STATE (DIPISAH SUPAYA TIDAK BENTROK) ---
  
  // 1. Pagination: Temukan Keahlian Baru (4 item)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 2. Pagination: Kursus Terpopuler (8 item)
  const [popularPage, setPopularPage] = useState(1);
  const popularLimit = 10;

  // 3. Pagination: Bootcamp (8 item)
  const [bootcampPage, setBootcampPage] = useState(1);
  const bootcampLimit = 10;

  // --- FETCH DATA ---
  const fetchCoursesData = async () => {
    try {
      setLoading(true);

      // 1. Ambil Katalog
      const allCoursesData = await ElearningService.fetchCourses();
      setCourses(allCoursesData);

      // 2. Ambil Enrolled (Optional)
      try {
        const myEnrolledData = await ProfileService.getEnrolledCourses();
        const safeEnrolledData = Array.isArray(myEnrolledData) 
            ? myEnrolledData 
            : (myEnrolledData.data || []);
        setEnrolledCourses(safeEnrolledData);
      } catch (enrolledError) {
        console.warn("User belum login atau tidak ada enrolled courses.");
        setEnrolledCourses([]); 
      }

    } catch (err) {
      console.error("Critical Error:", err);
      setError("Gagal memuat katalog kursus.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  // --- LOGIC PAGINATION 1: TEMUKAN KEAHLIAN BARU ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // --- LOGIC PAGINATION 2: TERPOPULER ---
  const idxLastPop = popularPage * popularLimit;
  const idxFirstPop = idxLastPop - popularLimit;
  // (Opsional) Kalau mau diurutkan berdasarkan rating, tambahkan .sort() sebelum slice
  const currentPopularCourses = courses.slice(idxFirstPop, idxLastPop);
  const totalPopularPages = Math.ceil(courses.length / popularLimit);

  // --- LOGIC PAGINATION 3: BOOTCAMP ---
  const idxLastBoot = bootcampPage * bootcampLimit;
  const idxFirstBoot = idxLastBoot - bootcampLimit;
  const currentBootcampCourses = courses.slice(idxFirstBoot, idxLastBoot);
  const totalBootcampPages = Math.ceil(courses.length / bootcampLimit);

  // --- KATEGORI UNIK ---
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  // --- LOADING & ERROR UI ---
  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => fetchCoursesData()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // --- HELPER UNTUK RENDER TOMBOL PAGINATION (BIAR RAPI) ---
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

        {/* SECTION 1: ENROLLED COURSES */}
        {enrolledCourses.length > 0 && (
          <ElearningEnrolledList
            title="Kursus yang Sedang Diikuti"
            subtitle="Lanjutkan progres belajar Anda."
            courses={enrolledCourses} 
          />
        )}

        {/* SECTION 2: TEMUKAN KEAHLIAN BARU (4 Item/Page) */}
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

        {/* SECTION 3: TERPOPULER (8 Item/Page) */}
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

        {/* SECTION 4: INFO BOOTCAMP (Static) */}
        <InfoBootcamp />

        {/* SECTION 5: BOOTCAMP LIST (8 Item/Page) */}
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