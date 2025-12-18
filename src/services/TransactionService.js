import api from "./Api";

class TransactionService {
  static async getAll() {
    const BACKEND_URL = "http://localhost:8000/storage"; 
    const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

    const response = await api.get("/transactions");
    const rawData = response.data?.data || [];

    return rawData.map((trx) => {
      // Default Values
      let title = trx.type_label; 
      let image = DEFAULT_IMAGE;
      let instructor = "-";
      let duration = "-"; // Default duration sudah "-"

      if (trx.transactionable) {
        // A. COURSE
        if (trx.transactionable.course) {
          const course = trx.transactionable.course;
          title = course.title;
          image = course.thumbnail;
          instructor = course.instructor;
        } 
        // B. SUBSCRIPTION
        else if (trx.transactionable.subscription) {
          const sub = trx.transactionable.subscription;
          title = `Langganan ${sub.plan}`;
          image = "https://placehold.co/600x400?text=Subscription"; 
        }
        // C. MENTORING (UBAH DISINI)
        else if (trx.transactionable.mentoring_session) {
          const ment = trx.transactionable.mentoring_session;
          title = `Mentoring ${ment.type}`;
          image = "https://placehold.co/600x400?text=Mentoring";
        }
      }

      // Fix URL Image
      if (image && !image.startsWith("http")) {
        image = `${BACKEND_URL}/${image}`;
      }
      
      if (image.includes("http://localhost:8000/storage/https://")) {
         image = image.replace("http://localhost:8000/storage/", "");
      }

      return {
        ...trx,
        item_name: title,
        item_image: image,
        item_instructor: instructor,
        item_duration: duration,
      };
    });
  }

  static getById(id) {
    return api.get(`/transactions/${id}`);
  }

  static delete(id) {
    return api.delete(`/transactions/${id}`);
  }
}

export default TransactionService;