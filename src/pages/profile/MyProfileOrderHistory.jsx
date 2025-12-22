import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import TransactionService from "@/services/TransactionService";
import { OrderHistoryList } from "@/components/section/OrderHistoryList";
import { OrderHistoryDetail } from "@/components/section/OrderHistoryDetail";
import { Input } from "@/components/ui/input";

const BACKEND_URL = "http://localhost:8000";
const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

export const MyProfileOrderHistory = () => {
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await TransactionService.getAll();

        const mapped = data.map((trx) => ({
          ...trx,
          title: trx.item_name || trx.type_label || "-",
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

  useEffect(() => {
    setSelectedTransaction(null);
  }, [location.pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedTransaction(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectTransaction = (order) => {
    window.history.pushState(
      { transactionId: order.id },
      "",
      window.location.pathname
    );
    setSelectedTransaction(order);
  };

  
  const handleBackToList = () => {
    setSelectedTransaction(null);
  };

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    const q = searchQuery.toLowerCase();
    return orders.filter((o) =>
      o.title?.toLowerCase().includes(q)
    );
  }, [orders, searchQuery]);


  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full" />
      </div>
    );
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