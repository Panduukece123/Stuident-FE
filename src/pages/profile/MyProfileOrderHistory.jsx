import React, { useState } from "react";
import TransactionService from "@/services/TransactionService";
import { useQuery } from "@tanstack/react-query"; // 1. Import Hook
import { OrderHistoryList } from "@/components/section/OrderHistoryList";
import { Input } from "@/components/ui/input";
import { MyProfileEnrolledSkeleton } from "@/components/ProfileSkeleton";

export const MyProfileOrderHistory = () => {
  // --- STATE ---
  // Hanya simpan state untuk Search
  const [searchQuery, setSearchQuery] = useState("");

  // --- 2. FETCH DATA (TanStack Query) ---
  const { 
    data: orders = [], 
    isLoading 
  } = useQuery({
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

    return title.toLowerCase().includes(query) || code.toLowerCase().includes(query);
  });

  // --- 4. UI LOADING ---
  if (isLoading) {
    return <MyProfileEnrolledSkeleton />
  }

  // Logic Text Kosong
  const noResultText =
    orders.length > 0 && searchQuery
      ? "Tidak ada transaksi yang cocok."
      : "Belum ada transaksi.";

  // --- 5. RENDER UI ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Order History</h1>
      </div>

      {/* Search Input */}
      <div>
        <Input
          type="text"
          placeholder="Cari Order History mu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Order List */}
      {filteredOrders.length > 0 ? (
        <OrderHistoryList orders={filteredOrders} />
      ) : (
        <p className="text-muted-foreground text-center py-8">{noResultText}</p>
      )}
    </div>
  );
};