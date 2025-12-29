import api from "./Api";

const MentoringService = {
  getAllSessions: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/mentoring-sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getMySessions: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/my-mentoring-sessions", {
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

  submitMentoringSession: async (payload) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/mentoring-sessions",
    payload, // ✅ BODY
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

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

  updateStatus: async (sessionId, status) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/mentoring-sessions/${sessionId}/status`, {
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  markAssessmentCompleted: async (sessionId) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/mentoring-sessions/${sessionId}/need-assessments/mark-completed`, {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  updateMentorNotes: async (sessionId, notes) => {
    const token = localStorage.getItem("token");
    // Method PUT ke /mentoring-sessions/{id}
    const response = await api.put(`/mentoring-sessions/${sessionId}`, {
      notes: notes, 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  uploadCoachingFile: async (sessionId, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/mentoring-sessions/${sessionId}/coaching-files`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  deleteCoachingFile: async (sessionId, fileId) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/mentoring-sessions/${sessionId}/coaching-files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },
};

export default MentoringService;