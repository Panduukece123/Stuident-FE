import api from "../Api";

const UserService = {
  // ... method getUsers, createUser, updateUser, deleteUser (YANG LAMA TETAP DISINI) ...

  getUsers: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data.data || response.data;
  },

  createUser: async (userData) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/admin/users", userData, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  updateUser: async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/admin/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data;
  },

  // --- ENDPOINT BARU ---

  // GET /api/admin/users/statistics
  getStatistics: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/admin/users/statistics", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data.data || response.data;
  },

  // POST /api/admin/users/{id}/suspend
  suspendUser: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/admin/users/${id}/suspend`,
      {}, // Body kosong
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  },

  // POST /api/admin/users/{id}/activate
  activateUser: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/admin/users/${id}/activate`,
      {}, // Body kosong
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  },

  getUserDetail: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data.data || response.data;
  },
};

export default UserService;
