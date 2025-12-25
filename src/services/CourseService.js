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
        completed: true,
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

  enrollCourse: async (courseId, paymentMethod) => {
    const token = localStorage.getItem("token");

    // GANTI JADI INI (Sesuai Postman kamu):
    return await api.post(`/courses/${courseId}/enroll`, 
      {
        payment_method: paymentMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        }
      }
    );
  },
  // =======================================

  uploadPaymentProof: async (transactionId, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("payment_proof", file);

    return await api.post(
      `/transactions/${transactionId}/payment-proof`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default courseService;
