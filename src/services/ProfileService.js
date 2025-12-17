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
        specialization: specializationsArray 
      };

      const token = localStorage.getItem("token");

      const response = await api.put( "/auth/profile", payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        }
      );
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
      // Ubah nama parameter jadi 'item' (karena ini objek enrollment, bukan course langsung)
      return data.map((item) => {
        
        const courseData = item.course || {};

        // 1. LOGIKA GAMBAR
        // Di JSON kamu key-nya adalah "image", bukan "image_url"
        let imageUrl = courseData.image; 

        if (imageUrl && !imageUrl.startsWith("http")) {
          // Tambahkan base URL jika path relatif (bukan dari unsplash)
          imageUrl = `${BACKEND_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
        }

        // 2. RETURN OBJECT YANG SUDAH DIRAPIKAN
        return {
          // Gunakan ID dari courseData (5), bukan ID enrollment (7)
          // Biar kalau diklik arahnya benar ke /course/5
          id: courseData.id, 

          title: courseData.title || "Untitled Course",
          level: courseData.level || "Beginner",
          
          // Sesuaikan key dengan JSON backend
          rating: Number(courseData.average_rating) || 0, 
          reviews: Number(courseData.total_reviews) || 0,
          
          description: courseData.description || "No description available.",
          price: courseData.price ? Number(courseData.price) : 0,
          
          image: imageUrl || DEFAULT_IMAGE,
          
          instructor: courseData.instructor || "Unknown",
          category: courseData.category || "Umum",
          progress: courseData.progress || 0,
          completed: courseData.completed || false,
          certificate: courseData.certificate_url || null,

          // --- DATA PENTING DARI ENROLLMENT (Parent Object) ---
          progress: item.progress || 0, // Ambil dari item, bukan courseData
          completed: item.completed || false,
          enrollment_id: item.id // Simpan ID pendaftaran kalau butuh nanti
        };
      });
    }

    return [];
  },

};

export default ProfileService;