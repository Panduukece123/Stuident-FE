import api from "./Api";

/**
 * Service untuk menangani API calls terkait e-learning
 */
class ElearningService {
  /**
   * Mengambil semua kursus dari API
   * @returns {Promise<Array>} Array of course objects
   */
  static async fetchCourses() {
    try {
      console.log(`Fetching all courses...`);
      const response = await api.get("/courses");
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
          category: course.category || "Umum",
        }));

        return mappedCourses;
      } else {
        console.error("API response is not an array:", data);
        return [];
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

      throw new Error(errorMessage);
    }
  }

  /**
   * Mengambil kursus berdasarkan kategori
   * @param {string} category - Kategori kursus
   * @returns {Promise<Array>} Array of course objects untuk kategori tertentu
   */
  static async fetchCoursesByCategory(category) {
    const allCourses = await this.fetchCourses();
    return allCourses.filter((course) => course.category === category);
  }

  /**
   * Mengambil kursus berdasarkan level
   * @param {string} level - Level kursus (Beginner, Intermediate, Advanced)
   * @returns {Promise<Array>} Array of course objects untuk level tertentu
   */
  static async fetchCoursesByLevel(level) {
    const allCourses = await this.fetchCourses();
    return allCourses.filter((course) => course.level === level);
  }

  /**
   * Mengambil kursus populer berdasarkan rating
   * @param {number} limit - Jumlah maksimal kursus yang diambil
   * @returns {Promise<Array>} Array of popular courses
   */
  static async fetchPopularCourses(limit = 10) {
    const allCourses = await this.fetchCourses();
    return allCourses.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
}

export default ElearningService;
