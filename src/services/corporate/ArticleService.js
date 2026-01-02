import api from "@/services/Api";

const ArticleService = {
  // GET ALL ARTICLES
  getArticles: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/articles", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // GET DETAIL ARTICLE
  getArticleDetail: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // CREATE ARTICLE (POST) - Multipart + Token
  createArticle: async (data) => {
    const token = localStorage.getItem("token");
    
    // Ubah data object ke FormData untuk upload gambar
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("author", data.author);
    
    // Pastikan image ada dan berupa File sebelum di-append
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.post("/articles", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Wajib untuk upload file
      },
    });
    return response.data;
  },

  // UPDATE ARTICLE (PUT) - Multipart + Token
  updateArticle: async ({ id, data }) => {
    const token = localStorage.getItem("token");
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("author", data.author);

    // Kirim image hanya jika user mengganti gambarnya (tipe File)
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    // CATATAN PENTING:
    // Banyak backend (Laravel) susah baca FormData via method PUT langsung.
    // Jika upload gagal, ganti method jadi POST dan tambah: formData.append("_method", "PUT");
    // Tapi karena endpointmu PUT, kita coba PUT dulu.
    
    const response = await api.post(`/articles/${id}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // DELETE ARTICLE
  deleteArticle: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },
};

export default ArticleService;