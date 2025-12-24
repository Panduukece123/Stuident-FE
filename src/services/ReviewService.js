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
  // Update Review
  updateReview: async (id, payload) => {
    const token = localStorage.getItem("token");

    const response = await api.put(`/reviews/${id}`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    return response.data;
  },
  // Delete Review
  deleteReview: async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/reviews/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    return response.data;
  }
};

export default reviewService;
