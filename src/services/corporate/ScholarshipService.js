import api from "../Api"; // Sesuaikan import axios instance kamu

const ScholarshipService = {
  // GET ALL (List)
  getScholarships: async ({
    page = 1,
    search = "",
    status = "",
    location = "",
    study_field = "",
  }) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/scholarships", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      // Sesuaikan endpoint backend
      params: {
        page,
        search, // Biasanya backend mapping search ke nama beasiswa
        status: status === "all" ? "" : status, 
        location,
        study_field,
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
    const token = localStorage.getItem("token");
    
    // Gunakan FormData untuk mendukung file upload
    const formData = new FormData();
    formData.append("organization_id", data.organization_id);
    formData.append("name", data.name);
    formData.append("study_field", data.study_field);
    formData.append("location", data.location);
    formData.append("deadline", data.deadline);
    formData.append("status", data.status);
    formData.append("benefit", data.benefit);
    formData.append("description", data.description);
    
    // Append image jika ada (File object)
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.post("/scholarships", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // UPDATE
  updateScholarship: async (id, data) => {
    const token = localStorage.getItem("token");
    
    // Gunakan FormData untuk mendukung file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("study_field", data.study_field);
    formData.append("location", data.location);
    formData.append("deadline", data.deadline);
    formData.append("status", data.status);
    formData.append("benefit", data.benefit);
    formData.append("description", data.description);
    
    // Append image jika ada perubahan (File object baru)
    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }
    
    // Untuk Laravel, gunakan POST dengan _method untuk simulate PUT
    formData.append("_method", "PUT");

    const response = await api.post(`/scholarships/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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
    const token = localStorage.getItem("token");
    const response = await api.get('/scholarship-applications', {
      headers: { Authorization: `Bearer ${token}` },
      params: { scholarship_id: scholarshipId } // Kirim filter ke backend
    });
    return response.data;
  },

  // UPDATE APPLICANT STATUS
  updateApplicantStatus: async (applicationId, status) => {
    // status = "accepted" | "rejected"
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/scholarship-applications/${applicationId}/status`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  },
};

export default ScholarshipService;
