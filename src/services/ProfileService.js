import api from "./Api"; 

const ProfileService = {
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

  updateProfile: async (dataInput) => {
    const token = localStorage.getItem("token");

    const response = await api.put("/auth/profile", dataInput, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  },

  uploadAvatar: async (fileInput) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("photo", fileInput); 

    const response = await api.post("/auth/profile/photo", formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};

export default ProfileService;