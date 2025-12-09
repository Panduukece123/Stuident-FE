import React, { useEffect, useState } from "react";
import { Navbar } from "../components/shared/navbar";
import { Footer } from "../components/shared/footer"; // Assuming Footer exists
import { ElearningBanner } from "../components/section/ElearningBanner";
import { ElearningCategories } from "../components/section/ElearningCategories";
import { ElearningCourseList } from "../components/section/ElearningCourseList";
import ElearningService from "../services/elearningService";

export const ElearningPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      const data = await ElearningService.fetchCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Extract unique categories
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the list section (optional, or keep top of page)
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar is usually handled by Layout, but if this page is standalone or needs specific navbar state, we might need to adjust. 
          For now, I'll assume AppLayout handles Navbar and Footer, but the user asked for a specific look.
          If I put Navbar here, it might duplicate if AppLayout also has it. 
          I will check AppLayout first.
      */}

      <main className="flex-1">
        <ElearningBanner />
        <ElearningCategories categories={uniqueCategories} />

        {/* Using the same fetched courses for demonstration.  
            In a real app, you might filter these based on user enrollment or popularity. */}
        <ElearningCourseList
          title="Kursus yang Sedang Diikuti"
          subtitle="Ini adalah daftar kursus yang sedang aktif Anda pelajari. Selesaikan semuanya untuk mendapatkan sertifikat dan keahlian baru."
          courses={courses.slice(0, 3)}
        />

        <ElearningCourseList
          title="Temukan Keahlian Baru"
          subtitle="Dunia terus berubah dan keahlian baru selalu dibutuhkan. Perluas wawasan Anda dengan mempelajari topik-topik relevan yang kami pilihkan ini."
          courses={currentCourses}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="container mx-auto px-6 py-4 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-accent cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        <ElearningCourseList
          title="Kursus Terpopuler"
          subtitle="Lihat apa yang sedang dipelajari oleh ribuan anggota lain. Ini adalah topik-topik terpanas di platform kami saat ini."
          courses={courses}
        />
      </main>
    </div>
  );
};
