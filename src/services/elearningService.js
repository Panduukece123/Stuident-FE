import api from "./Api";

const ElearningService = {
  // 1. Fungsi Utama
  fetchCourses: async () => {
    try {
      console.log(`Fetching all courses...`);
      const response = await api.get("/courses");
      const responseData = response.data;
      const data = responseData.data || [];
      
      // Config URL Gambar (Sesuaikan port backendmu)
      const BACKEND_URL = "http://localhost:8000"; 
      const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

      if (Array.isArray(data)) {
        return data.map((course) => {
          // Logika perbaikan gambar
          let imageUrl = course.image; // Cek kedua kemungkinan key
          if (imageUrl && !imageUrl.startsWith('http')) {
             imageUrl = `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
          }
          
          return {
            id: course.id,
            title: course.title || "Untitled Course",
            level: course.level || "Beginner",
            type : course.type || "course",
            rating: course.reviews_avg_rating || 0,
            reviews: course.total_reviews || 0,
            description: course.description || "No description available.",
            price: course.price ? Number(course.price) : 0,
            image: imageUrl || DEFAULT_IMAGE, // Pakai hasil olahan tadi
            instructor: course.instructor,
            category: course.category || "Umum",
          };
        });
      } else {
        return [];
      }
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