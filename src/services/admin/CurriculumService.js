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

    putCurriculum: async (curriculumId, curriculum) => {
        const response = await api.put(`/curriculums/${curriculumId}`, curriculum);
        return response.data;
    },

    deleteCurriculum: async (curriculumId) => {
        const response = await api.delete(`/curriculums/${curriculumId}`);
        return response.data;
    },
}

export default CurriculumService