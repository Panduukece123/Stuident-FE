import api from "./Api";

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

const ArticleService = {
  fetchArticles: async ({ category } = {}) => {
    try {
      const params = {};
      if (category && category !== "all") {
        params.category = category;
      }

      const response = await api.get("/articles", { params });
      const data = response.data.data || [];

      if (Array.isArray(data)) {
        return data.map((article) => ({
          id: article.id,
          title: article.title || "Untitled Article",
          description:
            article.content ||
            article.description ||
            "No description available.",
          image: article.image_url || DEFAULT_IMAGE,
          category: article.category || "General",
          author: article.author || "Admin",
          created_at: article.created_at,
        }));
      }
      return [];
    } catch (err) {
      console.error("Error fetching articles:", err);
      throw err;
    }
  },

  fetchArticleById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      const article = response.data.data;

      if (article) {
        return {
          ...article,
          image: article.image_url || DEFAULT_IMAGE,
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