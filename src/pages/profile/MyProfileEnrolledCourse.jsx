import { EnrolledCourseList } from "@/components/section/EnrolledCourseList";
import React, { useEffect, useState } from "react";
import ProfileService from "@/services/ProfileService";

export const MyProfileEnrolledCourse = () => {
  // 1. State
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 3. TAMPILAN LOADING (Early Return)
  // Kode ini ditaruh di sini supaya kalau loading, yang bawah tidak dijalankan
  if (loading) {
    return (
      // Saya ubah dikit jadi min-h-[50vh] biar pas di tengah area konten (tidak sepenuh layar browser)
      // Tapi kalau mau full layar, kembalikan ke "min-h-screen"
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 4. TAMPILAN UTAMA (Jika sudah tidak loading)
  return (
    <div>
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">Enrolled Course</h1>
      </div>
      <div>
        {/* Pengecekan data kosong */}
        {courses.length > 0 ? (
          <EnrolledCourseList courses={courses} />
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            Kamu belum mengikuti kursus apapun.
          </div>
        )}
      </div>
    </div>
  );
};