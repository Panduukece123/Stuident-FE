import api from "./Api";

const ArticleService = {
  fetchArticles: async ({ category } = {}) => {
    try {
      const params = {};
      if (category && category !== "all") {
        params.category = category;
      }

      const response = await api.get("/articles", { params });
      const responseData = response.data;
      const data = responseData.data || [];

      const BACKEND_URL = "http://localhost:8000";
      const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

      if (Array.isArray(data)) {
        return data.map((article) => {
          let imageUrl = article.image;
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = `${BACKEND_URL}${
              imageUrl.startsWith("/") ? "" : "/"
            }${imageUrl}`;
          }

          return {
            id: article.id,
            title: article.title || "Untitled Article",
            description:
              article.content ||
              article.description ||
              "No description available.",
            image: imageUrl || DEFAULT_IMAGE,
            category: article.category || "General",
            author: article.author || "Admin",
            created_at: article.created_at,
          };
        });
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      throw err;
    }
  },

  fetchArticleById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      const article = response.data.data;

      const BACKEND_URL = "http://localhost:8000";
      const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

      if (article) {
        let imageUrl = article.image;
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `${BACKEND_URL}${
            imageUrl.startsWith("/") ? "" : "/"
          }${imageUrl}`;
        }

        return {
          ...article,
          image: imageUrl || DEFAULT_IMAGE,
        };
      }
      return article;
    } catch (err) {
      console.error(`Error fetching article ${id}:`, err);
      throw err;
    }
  },
};

export default ArticleService;
