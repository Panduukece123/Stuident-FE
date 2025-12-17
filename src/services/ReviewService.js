import api from "./Api";

const reviewService = {
  // Create Review
  createReview: async (payload) => {
    const token = localStorage.getItem("token");

    const response = await api.post(`/reviews`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    return response.data;
  },
};

export default reviewService;
