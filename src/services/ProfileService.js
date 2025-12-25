import api from "./Api";
const BACKEND_URL = "http://localhost:8000";

const ProfileService = {
  // 1. GET PROFILE
  getProfile: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // 2. GET ME
  getMe: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // 3. UPDATE PROFILE
  updateProfile: async (payload) => {
    const token = localStorage.getItem("token");
    const response = await api.put("/auth/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  updateSpecializations: async (specializationsArray) => {
    try {
      const payload = {
        specialization: specializationsArray,
      };
      const token = localStorage.getItem("token");
      const response = await api.put("/auth/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 4. UPLOAD AVATAR
  uploadAvatar: async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", file);
    const response = await api.post("/auth/profile/photo", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getAvatarUrl: (user) => {
    if (!user) return "";
    let url = user.profile_photo_url || user.profile_photo || user.avatar_url;
    if (url && !url.startsWith("http")) {
      const cleanPath = url.startsWith("/") ? url.substring(1) : url;
      url = `${BACKEND_URL}/storage/${cleanPath}`;
    }
    return url;
  },

  // === EXPERIENCE SECTION ===

  // 5. ADD EXPERIENCE
  addExperience: async (payload) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/experiences", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // 6. UPDATE EXPERIENCE
  updateExperience: async (id, payload) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/experiences/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  deleteExperience: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/experiences/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // === ACHIEVEMENT SECTION ===

  // 7. ADD ACHIEVEMENT
  addAchievement: async (payload) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/achievements", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // 8. UPDATE ACHIEVEMENT
  updateAchievement: async (id, payload) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/achievements/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  deleteAchievement: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/achievements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getEnrolledCourses: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/my-courses", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const responseData = response.data;
    const data = responseData.data || [];
    const BACKEND_URL = "http://localhost:8000";
    const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

    if (Array.isArray(data)) {
      return data.map((item) => {
        const courseData = item.course || {};

        // 1. LOGIKA GAMBAR
        let imageUrl = courseData.image;
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `${BACKEND_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
        }

        // 2. LOGIKA SERTIFIKAT - DIPERBAIKI: Ambil dari enrollment (item), bukan course
        let certificatePath = item.certificate_url || null; // Dari enrollment
        if (certificatePath && certificatePath.includes("example.com")) {
          certificatePath = null;
        }
        if (certificatePath && !certificatePath.startsWith("http")) {
          certificatePath = `${BACKEND_URL}/storage/${certificatePath}`;
        }

        return {
          id: courseData.id,
          title: courseData.title || "Untitled Course",
          level: courseData.level || "Beginner",
          rating: Number(courseData.average_rating) || 0,
          reviews: Number(courseData.total_reviews) || 0,
          description: courseData.description || "No description available.",
          price: courseData.price ? Number(courseData.price) : 0,
          image: imageUrl || DEFAULT_IMAGE,
          instructor: courseData.instructor || "Unknown",
          category: courseData.category || "Umum",
          
          // Data dari enrollment
          progress: item.progress || 0,
          completed: item.completed || false,
          certificate: certificatePath,
          enrollment_id: item.id,
        };
      });
    }
    return [];
  },

  uploadCv: async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("cv", file);
    const response = await api.post("/auth/profile/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // === PORTFOLIO & RECOMMENDATIONS ===

  getPortfolio: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/portfolio", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getRecommendations: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getCV: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/profile/cv", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // === CERTIFICATE UPLOADS ===

  uploadAchievementCertificate: async (id, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("certificate", file);
    const response = await api.put(`/achievements/${id}/certificate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteAchievementCertificate: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/achievements/${id}/certificate`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  uploadExperienceCertificate: async (id, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("certificate", file);
    const response = await api.put(`/experiences/${id}/certificate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteExperienceCertificate: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/experiences/${id}/certificate`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // === GENERATE CERTIFICATE ===
  generateCertificate: async (enrollmentId) => {
    const token = localStorage.getItem("token");
    const response = await api.post(`/enrollments/${enrollmentId}/generate-certificate`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },
};

export default ProfileService;