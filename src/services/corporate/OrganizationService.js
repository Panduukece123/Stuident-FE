// src/services/OrganizationService.js
import api from "../Api"; // Pastikan path ini sesuai dengan file api axios kamu

const OrganizationService = {
  // GET ALL ORGANIZATIONS
  getOrganizations: async () => {
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
  }
};

export default OrganizationService;