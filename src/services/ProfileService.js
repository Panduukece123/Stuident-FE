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

  // 3. UPDATE PROFILE (Fix Syntax Axios)
  updateProfile: async (payload) => {
    const token = localStorage.getItem("token");

    // Axios: api.put(url, data, config)
    // Tidak perlu JSON.stringify, Axios otomatis handle
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

    // Wajib pakai FormData buat upload file
    const formData = new FormData();
    formData.append("photo", file); // Key 'photo' sesuai validasi backend

    const response = await api.post("/auth/profile/photo", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data", // Header wajib upload
      },
    });
    return response.data;
  },

  getAvatarUrl: (user) => {
    if (!user) return "";

    // 1. Cek prioritas field gambar
    let url = user.profile_photo_url || user.profile_photo || user.avatar_url;

    // 2. Jika path relatif (bukan http), tambahkan domain backend + folder storage
    if (url && !url.startsWith("http")) {
      // Pastikan formatnya rapi (handle slash)
      const cleanPath = url.startsWith("/") ? url.substring(1) : url;
      url = `${BACKEND_URL}/storage/${cleanPath}`;
    }

    return url;
  },

  // === EXPERIENCE SECTION (FIXED) ===

  // 5. ADD EXPERIENCE
  addExperience: async (payload) => {
    const token = localStorage.getItem("token");

    // PENTING: Endpoint diganti ke /experiences (bukan achievements lagi)
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
    // Method DELETE ke endpoint specific ID
    const response = await api.delete(`/experiences/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // === ACHIEVEMENT SECTION (FIXED) ===

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

  getEnrolledCourses: async (params = {}) => {
    try {
      // 1. Request ke Backend
      const response = await api.get("/my-courses", { params });
      const responseData = response.data;
      
      // Ambil array data & meta
      const rawList = responseData.data || [];
      const meta = responseData.meta || {};

      // Config URL Gambar
      const BACKEND_URL = "http://127.0.0.1:8000"; 
      const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

      // 2. MAPPING DATA (PENTING!)
      // Kita harus membongkar object 'course' dari dalam wrapper enrollment
      const formattedList = rawList.map((item) => {
        // 'item' adalah data enrollment
        // 'item.course' adalah detail kursusnya
        const courseData = item.course || {}; 

        // Fix Image URL dari dalam object course
        let imageUrl = courseData.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
             imageUrl = `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        return {
          // Kita pakai ID Course, bukan ID Enrollment, untuk navigasi
          id: courseData.id, 
          
          // Data Utama Kursus
          title: courseData.title || "Untitled Course",
          image: imageUrl || DEFAULT_IMAGE,
          category: courseData.category || "General",
          instructor: courseData.instructor || "Unknown",
          level: courseData.level || "All Level",
          rating: courseData.reviews_avg_rating ? parseFloat(courseData.reviews_avg_rating) : 0,
          total_reviews: courseData.total_reviews || 0,
          description: courseData.description || "",
          reviews: courseData.reviews_count || courseData.total_reviews || 0,

          // Data Spesifik Enrollment (Progress user)
          // Progress diambil dari 'item' (wrapper), bukan 'courseData'
          progress: item.progress || 0, 
          completed: item.completed || false,
          
          // Certificate URL dari enrollment
          certificate: item.certificate_url || null,
          
          // Data lain jika perlu
          enrollment_id: item.id, // Simpan ID enrollment jika butuh nanti
        };
      });

      // 3. Return format standard { data, meta }
      return {
        data: formattedList,
        meta: meta
      };

    } catch (error) {
      console.error("Gagal mengambil enrolled courses:", error);
      throw error;
    }
  },

  uploadCv: async (file) => {
    // 1. AMBIL TOKEN DULU DARI LOCALSTORAGE
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("cv", file);

    const response = await api.post("/auth/profile/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // 2. Pastikan token dipakai di sini
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

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

  uploadAchievementCertificate: async (id, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("certificate", file); // Pastikan key-nya sesuai request Laravel ('certificate' atau 'file')

    // Endpoint: /achievements/{id}/certificate
    const response = await api.post(
      `/achievements/${id}/certificate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

  // --- EXPERIENCE CERTIFICATE ---
  uploadExperienceCertificate: async (id, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("certificate", file); // Sesuaikan key backend ('certificate' atau 'file')

    const response = await api.post(
      `/experiences/${id}/certificate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

  getRecommendations: async (params = {}) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/recommendations", {params},
      {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getMySessions: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/mentoring-sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getSessionDetails: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  submitFeedback: async (id, payload) => {
    const token = localStorage.getItem("token");
    const response = await api.post(`/mentoring-sessions/${id}/feedback`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getNeedAssessment: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}/need-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  createNeedAssessment: async (id, rawData) => {
    const token = localStorage.getItem("token");
    const body = {
        form_data: rawData
    };

    const response = await api.post(`/mentoring-sessions/${id}/need-assessments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  updateNeedAssessment: async (id, rawData) => {
    const token = localStorage.getItem("token");
    const body = {
        form_data: rawData
    };

    const response = await api.put(`/mentoring-sessions/${id}/need-assessments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  deleteNeedAssessment: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/mentoring-sessions/${id}/need-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getCoachingFiles: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}/coaching-files`, {
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
      Accept: "application/json", // Kita minta JSON
    },
  });
  return response.data; 
},

  


  getMyApplications: async (params = {}) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/my-applications", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: params,
    });
    return response.data; 
  },
};

export default ProfileService;
