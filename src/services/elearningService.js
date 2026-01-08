import api from "./Api";

const ElearningService = {
  // 1. Fungsi Utama
  getCourses: async (params) => {
    try {
      // params: { page, search, type, level, access_type, ... }
      const response = await api.get("/courses", { params });
      // Mapping response sesuai struktur backend kamu
      // Asumsi response: { data: [...], meta: { halaman_sekarang: 1, ... } }
      const responseData = response.data;
      
      const rawList = responseData.data || [];
      const meta = responseData.meta || {}; 

      const BACKEND_URL = "http://127.0.0.1:8000"; 
      const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

      const formattedList = rawList.map((course) => {
        let imageUrl = course.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
             imageUrl = `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }
        
        return {
          id: course.id,
          title: course.title || "Untitled Course",
          level: course.level || "Beginner",
          type: course.type || "course",
          rating: course.reviews_avg_rating ? parseFloat(course.reviews_avg_rating) : 0,
          reviews: course.total_reviews || 0,
          description: course.description || "-",
          price: course.price ? Number(course.price) : 0,
          image: imageUrl || DEFAULT_IMAGE,
          instructor: course.instructor, 
          category: course.category || "Umum",
        };
      });

      return { data: formattedList, meta };

    } catch (err) {
      console.error("Error fetching courses:", err);
      throw err;
    }
  },

  // 2. Fungsi Lainnya
  // Perhatikan: Kita tidak pakai 'this.fetchCourses()', tapi 'ElearningService.fetchCourses()'
  fetchCoursesByCategory: async (category) => {
    const allCourses = await ElearningService.fetchCourses();
    return allCourses.filter((course) => course.category === category);
  },

  fetchCoursesByLevel: async (level) => {
    const allCourses = await ElearningService.fetchCourses();
    return allCourses.filter((course) => course.level === level);
  },

  fetchPopularCourses: async (limit = 10) => {
    const allCourses = await ElearningService.fetchCourses();
    return allCourses.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
};

export default ElearningService;