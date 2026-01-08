import api from "./Api";


const buildParams = (filters = {}) => {
  const params = {
    search: filters.search,
    study_field: filters.field,
    status: filters.status,
    location: filters.location,
    is_recommended: filters.is_recommended,
  };

  return Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  );
};

export const getScholarships = async (filters = {}) => {
  const params = buildParams(filters);
  const response = await api.get("/scholarships", { params });
  return response.data; // { sukses, pesan, data }
};

export const getRecommendedScholarships = async () => {
  const response = await api.get("/scholarships", {
    params: { is_recommended: 1 },
  });
  return response.data;
};

export const getScholarshipRecommendations = async (limit = 4) => {
  const response = await api.get("/scholarships/recommendations", {
    params: { limit },
  });
  return response.data;
};

export const getPopularityScholarships = async()=>{
  const response = await api.get("/scholarships",{
    params: {sort:'popular'}
  });
  return response.data;
}

export const getScholarshipById = async (id) => {
  const response = await api.get(`/scholarships/${id}`);
  return response.data;
};

export const applyScholarship = async (id, formData) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`/scholarships/${id}/apply`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Step 1: Save draft with documents
export const saveDraft = async (scholarshipId, formData) => {
  const response = await api.post(`/scholarships/${scholarshipId}/draft`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Step 2: Update pre-assessment data
export const updateAssessment = async (applicationId, data) => {
  const response = await api.put(`/scholarship-applications/${applicationId}/assessment`, data);
  return response.data;
};

// Step 3: Get application detail for review
export const getApplicationDetail = async (applicationId) => {
  const response = await api.get(`/scholarship-applications/${applicationId}`);
  return response.data;
};

// Step 3b: Update draft documents
export const updateDraft = async (applicationId, formData) => {
  const response = await api.put(`/scholarship-applications/${applicationId}/draft`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Step 4: Submit the application
export const submitApplication = async (applicationId) => {
  const response = await api.post(`/scholarship-applications/${applicationId}/submit`);
  return response.data;
};

// Check existing application for a scholarship
export const checkExistingApplication = async (scholarshipId) => {
  const response = await api.get(`/scholarships/${scholarshipId}/my-application`);
  return response.data;
};

const scholarshipService = {
  getScholarships,
  getRecommendedScholarships,
  getScholarshipRecommendations,
  getScholarshipById,
  getPopularityScholarships,
  applyScholarship,
  saveDraft,
  updateAssessment,
  getApplicationDetail,
  updateDraft,
  submitApplication,
  checkExistingApplication,
};

export default scholarshipService;
