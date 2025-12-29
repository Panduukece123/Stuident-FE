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