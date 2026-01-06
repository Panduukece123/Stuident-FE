import api from "../Api";

const BACKEND_URL = "http://localhost:8000";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0";


const AdminTransactionService = {
  /**
   * GET /api/transactions/admin/all
   * Get all transactions with optional filters
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status (pending, paid, cancelled, expired, refunded)
   * @param {string} params.type - Filter by type (course_enrollment, subscription, mentoring)
   * @param {string} params.payment_method - Filter by payment method (bank_transfer, qris, e_wallet)
   * @param {number} params.page - Page number for pagination
   */
  getAll: async (params = {}) => {
    const token = localStorage.getItem("token");
    const response = await api.get("/transactions/admin/all", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      params: {
        ...params,
      },
    });

    const data = response.data?.data || [];
    const pagination = response.data?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: data.length,
    };

    // Format image URLs
    const formattedData = data.map((trx) => ({
      ...trx,
      image: trx.item_details?.image
        ? trx.item_details.image.startsWith("http")
          ? trx.item_details.image
          : `${BACKEND_URL}${trx.item_details.image}`
        : DEFAULT_IMAGE,
      formatted_amount: Number(trx.amount).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
    }));

    return {
      data: formattedData,
      pagination,
    };
  },

  /**
   * GET /api/transactions/{id}
   * Get transaction detail by ID
   */
  getById: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });

    const trx = response.data?.data || response.data;
    
    return {
      ...trx,
      image: trx.item_details?.image
        ? trx.item_details.image.startsWith("http")
          ? trx.item_details.image
          : `${BACKEND_URL}${trx.item_details.image}`
        : DEFAULT_IMAGE,
      formatted_amount: Number(trx.amount).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
    };
  },

  /**
   * POST /api/transactions/{id}/confirm
   * Confirm payment for a transaction (Admin only)
   * @param {number} id - Transaction ID
   * @param {string} status - New status (usually "paid")
   */
  confirmPayment: async (id, status = "paid") => {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/transactions/${id}/confirm`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  
  getStatistics: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/transactions/statistics", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    return response.data?.data || response.data;
  },
};

export default AdminTransactionService;
