import api from "../Api"; // Sesuaikan base axios instance-mu

const CourseService = {
  getCourses: async () => {
    const res = await api.get("/courses");
    return res.data;
  },

  createCourse: async (formData) => {
    // Biarkan axios mengatur header Content-Type secara otomatis untuk FormData
    const res = await api.post("/courses", formData);
    return res.data;
  },

  updateCourse: async (id, formData) => {
    if (formData instanceof FormData) {
      // Laravel membutuhkan spoofing POST menjadi PUT jika mengirim file
      if (!formData.has("_method")) {
        formData.append("_method", "PUT");
      }
    }

    const res = await api.post(`/courses/${id}`, formData);
    return res.data;
  },

  deleteCourse: async (id) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  },
};

export default CourseService;
