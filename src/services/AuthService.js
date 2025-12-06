import api from "./Api";

const authService = {
  // --- Login ---
  login: async (credentials) => {
    const response = await api.post("/login", credentials, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // Wajib buat Laravel biar return JSON error
      },
    });
    return response.data;
  },

  // --- Register ---
  register: async (payload) => {
    const response = await api.post("/register", payload, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response.data;
  },

  // --- Logout (Butuh Token) ---
  logout: async () => {
    // Ambil token manual karena kita tidak set global
    const token = localStorage.getItem("token");

    const response = await api.post("/logout", {}, { // Body kosong {}
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}` // Masukkan token manual di sini
      },
    });
    return response.data;
  },

  // ... (sisa fungsi saveSession dll tetap sama)
  saveSession: (token, user = null) => {
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  },
};

export default authService;