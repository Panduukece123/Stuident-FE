import api from "../Api"; // Sesuaikan import axios instance kamu

const ScholarshipService = {
  // GET ALL (List)
  getScholarships: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/scholarships", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  getMyScholarships: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/my-scholarships", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // GET DETAIL
  getScholarshipDetail: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/scholarships/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // CREATE
  createScholarship: async (data) => {
    // data = { organization_id, name, description, benefit, location, status, deadline }
    const token = localStorage.getItem("token");
    const response = await api.post("/scholarships", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // UPDATE
  updateScholarship: async (id, data) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/scholarships/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // DELETE
  deleteScholarship: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/scholarships/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // GET APPLICANTS (Tambahan untuk melihat siapa yang daftar di beasiswa ini)
  getScholarshipApplicants: async (scholarshipId) => {
    const response = await api.get(`/scholarships/${scholarshipId}/applications`);
    return response.data;
  },

  // UPDATE APPLICANT STATUS
  updateApplicantStatus: async (applicationId, status) => {
    // status = "accepted" | "rejected"
    const token = localStorage.getItem("token");
    const response = await api.put(`/scholarship-applications/${applicationId}/status`, {
      status: status
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  }
};

export default ScholarshipService;