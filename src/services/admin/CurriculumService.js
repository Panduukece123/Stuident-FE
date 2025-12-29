import api from "../Api";

const CurriculumService = {
    getCurriculumsByCourse: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/curriculums`);
        return response.data;
    },

    postCurriculum: async (courseId, curriculum) => {
        const response = await api.post(`/courses/${courseId}/curriculums`, curriculum);
        return response.data;
    },

    putCurriculum: async (curriculumId, courseId, curriculum) => {
        const response = await api.put(`/courses/${courseId}/curriculums/${curriculumId}`, curriculum);
        return response.data;
    },

    deleteCurriculum: async (curriculumId, courseId) => {
        const response = await api.delete(`/courses/${courseId}/curriculums/${curriculumId}`);
        return response.data;
    },
}

export default CurriculumService