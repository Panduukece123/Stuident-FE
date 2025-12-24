import api from "../Api"; // Sesuaikan base axios instance-mu

const CourseService = {
  getCourses: async () => {
    const res = await api.get("/courses");
    return res.data;
  },
  createCourse: async (course) => {
    const res = await api.post("/courses", course);
    return res.data;
  },
  updateCourse: async (id, course) => {
    const res = await api.put(`/courses/${id}`, course);
    return res.data;
  },
  deleteCourse: async (id) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  },
};

export default CourseService;
