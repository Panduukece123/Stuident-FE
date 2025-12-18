// src/components/section/MyProfileOrderHistory.jsx
import React, { useEffect, useState, useMemo } from "react";
import TransactionService from "@/services/TransactionService";
import { OrderHistoryList } from "@/components/section/OrderHistoryList";
import { Input } from "@/components/ui/input"; // ShadCN Input (optional)

const BACKEND_URL = "http://localhost:8000";
const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

export const MyProfileOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch orders dan mapping supaya selalu ada title & image
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await TransactionService.getAll();
        const mapped = data.map((trx) => ({
          ...trx,
          title: trx.item_name || trx.type_label || "-", // pastikan title selalu ada
          image: trx.item_details?.image
            ? trx.item_details.image.startsWith("http")
              ? trx.item_details.image
              : `${BACKEND_URL}${trx.item_details.image}`
            : DEFAULT_IMAGE,
        }));
        setOrders(mapped);
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
    return orders.filter((order) => order.title?.toLowerCase().includes(query));
  }, [orders, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  const noResultText =
    orders.length > 0 && searchQuery
      ? "Tidak ada transaksi yang cocok."
      : "Belum ada transaksi.";

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl">My Order History</h1>
      </div>
      <Input
        type="text"
        placeholder="Cari Order History mu..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      />

      {/* Order List */}
      {filteredOrders.length > 0 ? (
        <OrderHistoryList orders={filteredOrders} />
      ) : (
        <p className="text-muted-foreground text-center">{noResultText}</p>
      )}
    </div>
  );
};
