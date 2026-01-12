// src/services/OrganizationService.js
import api from "../Api"; // Pastikan path ini sesuai dengan file api axios kamu

const OrganizationService = {
  getOrganizations: async ({ page = 1, search = "", type = "" }) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/organizations/list/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        page: page,
        search: search || undefined, 
        type: (type === "all" || type === "") ? undefined : type,
      },
    });
    
    return response.data;
},

  getMyOrganizations: async ({ page = 1 }) => {
    const token = localStorage.getItem("token"); // Ambil token
    const response = await api.get("/organizations", { // Sesuaikan endpoint user
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        page,
      },
    });
    return response.data;
},

  // GET DETAIL ORGANIZATION
  getOrganizationDetail: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  createOrganization: async (data) => {
    const token = localStorage.getItem("token");

    const response = await api.post("/organizations", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // 4. UPDATE
  updateOrganization: async ({ id, data }) => {
    const token = localStorage.getItem("token");

    const response = await api.put(`/organizations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // 5. DELETE
  deleteOrganization: async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // 6. UPLOAD LOGO (Khusus ini Content-Type beda)
  uploadLogo: async ({ id, file }) => {
    const token = localStorage.getItem("token");
    
    const formData = new FormData();
    formData.append("logo", file);

    const response = await api.post(`/organizations/${id}/logo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Penting buat upload file
      },
    });
    return response.data;
  },

  // 7. DELETE LOGO
  deleteLogo: async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/organizations/${id}/logo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};

export default OrganizationService;