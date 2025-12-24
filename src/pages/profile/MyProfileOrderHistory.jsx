import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import TransactionService from "@/services/TransactionService";
import { OrderHistoryList } from "@/components/section/OrderHistoryList";
import { OrderHistoryDetail } from "@/components/section/OrderHistoryDetail";
import { Input } from "@/components/ui/input";
import { MyProfileEnrolledSkeleton } from "@/components/skeleton/ProfileSkeleton";

export const MyProfileOrderHistory = () => {
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // --- 2. FETCH DATA (TanStack Query) ---
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-order-history"],
    queryFn: TransactionService.getAll, // Service sudah mengembalikan data yang bersih (item_name, item_image, dll)
    staleTime: 1000 * 60 * 5, // Cache 5 menit
  });

  // --- 3. FILTERING (Client Side) ---
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    // Kita filter berdasarkan 'item_name' (judul) atau 'transaction_code'
    // 'item_name' berasal dari normalisasi di Service
    const title = order.item_name || order.type_label || "";
    const code = order.transaction_code || "";

    return (
      title.toLowerCase().includes(query) || code.toLowerCase().includes(query)
    );
  });

  // --- 4. UI LOADING ---
  if (isLoading) {
    return <MyProfileEnrolledSkeleton />;
  }

  return (
    <div className="space-y-6">
     
      <div className="w-full flex flex-col items-center border-b-2 border-b-primary p-2">
        <h1 className="text-xl font-semibold mb-3">Order History</h1>
      </div>

      
      {!selectedTransaction && (
        <Input
          type="text"
          placeholder="Cari Order History mu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      )}

      {selectedTransaction ? (
        <OrderHistoryDetail
          order={selectedTransaction}
          onBack={handleBackToList}
        />
      ) : (
        <OrderHistoryList
          orders={filteredOrders}
          onSelect={handleSelectTransaction}
          selectedOrder={selectedTransaction}
        />
      )}
    </div>
  );
};
