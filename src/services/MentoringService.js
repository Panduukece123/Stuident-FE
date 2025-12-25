import api from "./Api";

const MentoringService = {
    getPortfolio: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/portfolio", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getRecommendations: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/auth/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getMySessions: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/mentoring-sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getSessionDetails: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  submitFeedback: async (id, payload) => {
    const token = localStorage.getItem("token");
    const response = await api.post(`/mentoring-sessions/${id}/feedback`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getNeedAssessment: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}/need-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  createNeedAssessment: async (id, rawData) => {
    const token = localStorage.getItem("token");
    const body = {
        form_data: rawData
    };

    const response = await api.post(`/mentoring-sessions/${id}/need-assessments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  updateNeedAssessment: async (id, rawData) => {
    const token = localStorage.getItem("token");
    const body = {
        form_data: rawData
    };

    const response = await api.put(`/mentoring-sessions/${id}/need-assessments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  deleteNeedAssessment: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/mentoring-sessions/${id}/need-assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getCoachingFiles: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/mentoring-sessions/${id}/coaching-files`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },
};

export default MentoringService;