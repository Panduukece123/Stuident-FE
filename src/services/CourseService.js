import api from "./Api";
const token = localStorage.getItem("token");

const courseService = {
  // Course Detail
  showCourse: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  getCurriculum: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/curriculums`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  },
  getProgress: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  markComplete: async (curriculumId) => {
    const token = localStorage.getItem("token"); // <--- Harus ambil dulu!

    const response = await api.post(
      `/curriculums/${curriculumId}/complete`, 
      {
        completed: true
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

export default courseService;