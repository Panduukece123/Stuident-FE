import api from "./Api"; 

export const subscriptionService = {
  // Method untuk ambil data subscription user
  getMySubscriptions: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/subscriptions", 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data; 
  },

  // Create new subscription - POST /api/subscriptions
  createSubscription: async (payload) => {
    // payload: { plan, package_type, duration, duration_unit, price, auto_renew, start_date, payment_method }
    const token = localStorage.getItem("token");
    const response = await api.post("/subscriptions", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  // Upload payment proof - POST /api/transactions/{id}/payment-proof
  uploadPaymentProof: async (transactionId, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("payment_proof", file);
    
    const response = await api.post(`/transactions/${transactionId}/payment-proof`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  upgradeSubscription: async (subscriptionId, payload) => {
    // Payload: { new_plan: "premium", payment_method: "manual" }
    const token = localStorage.getItem("token");
    const response = await api.post(`/subscriptions/${subscriptionId}/upgrade`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },
};