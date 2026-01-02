// src/services/OrganizationService.js
import api from "../Api"; // Pastikan path ini sesuai dengan file api axios kamu

const OrganizationService = {
  getOrganizations: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/organizations/list/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getMyOrganizations: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/organizations", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
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