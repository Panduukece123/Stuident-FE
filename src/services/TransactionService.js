import api from "./Api";

class TransactionService {
  
  static getAll() {
    return api.get("/transactions");
  }

  static getById(id) {
    return api.get(`/transactions/${id}`);
  }

  static delete(id) {
    return api.delete(`/transactions/${id}`);
  }
}

export default TransactionService;
