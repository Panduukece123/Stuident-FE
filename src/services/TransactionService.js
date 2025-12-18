import api from "./Api";

class TransactionService {
  static async getAll() {
    const BACKEND_URL = "http://localhost:8000";
    const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

    const response = await api.get("/transactions");
    const data = response.data?.data || [];

    return data.map((trx) => ({
      ...trx,
      image: trx.item_details?.image
        ? trx.item_details.image.startsWith("http")
          ? trx.item_details.image
          : `${BACKEND_URL}${trx.item_details.image}`
        : DEFAULT_IMAGE,
    }));
  }

  static getById(id) {
    return api.get(`/transactions/${id}`);
  }

  static delete(id) {
    return api.delete(`/transactions/${id}`);
  }
}

export default TransactionService;
