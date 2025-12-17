import api from "./Api";

const courseService = {
    // Course Detail
    showCourse: async (id) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    },
};

export default courseService;