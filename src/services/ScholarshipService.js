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

const scholarshipService = {
  getScholarships,
  getRecommendedScholarships,
  getScholarshipById,
  getPopularityScholarships
};

export default scholarshipService;
