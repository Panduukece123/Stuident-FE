import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/shared/navbar";
import { Footer } from "../components/shared/footer"; // Assuming Footer exists
import { Header } from "../components/section/HeaderSection";
import { ElearningCategories } from "../components/section/ElearningCategories";
import { ElearningCourseList } from "../components/section/ElearningCourseList";

export const ElearningPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCourses = async () => {
    try {
      setLoading(true);
      console.log(`Fetching all courses...`);
      // Fetch all courses (or as many as API returns in one page)
      const response = await axios.get(`/api/courses`);
      console.log("Response received:", response);

      const responseData = response.data;
      const data = responseData.data || [];

      if (Array.isArray(data)) {
        const mappedCourses = data.map((course) => ({
          title: course.title || "Untitled Course",
          level: course.level || "Beginner",
          rating: course.rating || 4.8,
          reviews: course.reviews_count || 120,
          description: course.description || "No description available.",
          price: course.price ? Number(course.price) : 0,
          image: course.image_url || null,
          instructor: course.instructor,
          category: course.category || "Umum", // Map category
        }));

        // Store ALL fetched courses
        setCourses(mappedCourses);
      } else {
        console.error("API response is not an array:", data);
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      let errorMessage = "Gagal memuat data kursus.";

      if (err.response) {
        errorMessage += ` Server Error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage += " Tidak ada respon dari server.";
      } else {
        errorMessage += ` ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
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
          onClick={() => window.location.reload()}
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
        <Header />
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
