// src/components/section/MyProfileOrderHistory.jsx
import React, { useEffect, useState } from "react";
import TransactionService from "@/services/TransactionService";
import { OrderHistoryList } from "@/components/section/OrderHistoryList";

export const MyProfileOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-center border-b-2 border-b-primary p-2">
        <h1 className="text-xl font-semibold">Order History</h1>
      </div>

      {orders.length > 0 ? (
        <OrderHistoryList orders={orders} />
      ) : (
        <p className="text-muted-foreground text-center">
          Belum ada transaksi.
        </p>
      )}
    </div>
  );
};
