import { EnrolledCourseList } from "@/components/section/EnrolledCourseList";
import React, { useEffect, useState } from "react";
import ProfileService from "@/services/ProfileService";
import { Input } from "@/components/ui/input"; // Pastikan punya komponen Input
import { Search } from "lucide-react"; // Icon Search

export const MyProfileEnrolledCourse = () => {
  // 1. State
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // <--- State untuk Search

  // 2. Fetch Data
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const data = await ProfileService.getEnrolledCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  // 3. LOGIC FILTERING
  // Kita filter courses berdasarkan input search (case insensitive)
  const filteredCourses = courses.filter((course) => {
    // Pastikan properti namanya sesuai backend (misal: course.title atau course.course_name)
    // Di sini saya asumsikan namanya 'title' atau ada di dalam object 'course.title'
    const courseName = course.title || course.course?.title || "";
    return courseName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // 4. TAMPILAN LOADING
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 5. TAMPILAN UTAMA
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
        {/* Render filteredCourses, bukan courses */}
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