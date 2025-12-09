import api from "./Api"; 

const ProfileService = {
  // 1. GET PROFILE
  getProfile: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/profile", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  // 2. GET ME
  getMe: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
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
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    return response.data;
  },

  // 4. UPLOAD AVATAR
  uploadAvatar: async (file) => {
    const token = localStorage.getItem("token");
    
    // Wajib pakai FormData buat upload file
    const formData = new FormData();
    formData.append("photo", file); // Key 'photo' sesuai validasi backend

    const response = await api.post("/auth/profile/photo", formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data", // Header wajib upload
      },
    });
    return response.data;
  },

  // === EXPERIENCE SECTION (FIXED) ===

  // 5. ADD EXPERIENCE
  addExperience: async (payload) => {
    const token = localStorage.getItem("token");
    
    // PENTING: Endpoint diganti ke /experiences (bukan achievements lagi)
    const response = await api.post("/experiences", payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  // 6. UPDATE EXPERIENCE
  updateExperience: async (id, payload) => {
    const token = localStorage.getItem("token");
    
    const response = await api.put(`/experiences/${id}`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  deleteExperience: async (id) => {
    const token = localStorage.getItem("token");
    // Method DELETE ke endpoint specific ID
    const response = await api.delete(`/experiences/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
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
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  // 8. UPDATE ACHIEVEMENT
  updateAchievement: async (id, payload) => {
    const token = localStorage.getItem("token");

    const response = await api.put(`/achievements/${id}`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  deleteAchievement: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/achievements/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    return response.data;
  },
};

export default ProfileService;