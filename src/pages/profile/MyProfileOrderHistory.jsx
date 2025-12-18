import React, { useEffect, useState, useMemo } from "react";
import TransactionService from "@/services/TransactionService";
import { OrderHistoryList } from "@/components/section/OrderHistoryList";
import { Input } from "@/components/ui/input"; 

export const MyProfileOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Data yang keluar dari sini sudah bersih (ada item_name, item_image, dll)
        const data = await TransactionService.getAll();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil transaksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    const query = searchQuery.toLowerCase();
    // Filter berdasarkan item_name atau transaction_code
    return orders.filter((order) =>
      (order.item_name || "").toLowerCase().includes(query) ||
      (order.transaction_code || "").toLowerCase().includes(query)
    );
  }, [orders, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  const noResultText = orders.length > 0 && searchQuery
      ? "Tidak ada transaksi yang cocok."
      : "Belum ada transaksi.";

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col items-center border-b-2 border-b-primary p-2">
        <h1 className="text-xl font-semibold mb-3">Order History</h1>
      </div>
      <Input
          type="text"
          placeholder="Cari Riwayat (Nama Kursus / Kode Transaksi)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />

      {filteredOrders.length > 0 ? (
        <OrderHistoryList orders={filteredOrders} />
      ) : (
        <p className="text-muted-foreground text-center py-8">{noResultText}</p>
      )}
    </div>
  );
};