import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Eye, Loader2 } from "lucide-react";
import TransactionService from "@/services/TransactionService";

export const MyProfileOrderHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching
  const fetchTransactions = async () => {
    try {
      const response = await TransactionService.getAll();
      setTransactions(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Gagal mengambil transaksi:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatIDR = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex items-center justify-center border-b-2 border-primary pb-2">
        <h1 className="text-xl font-semibold">Order History</h1>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center text-neutral-500 italic">
          Belum ada transaksi.
        </div>
      ) : (
        transactions.map((trx) => (
          <div
            key={trx.id}
            className="bg-white border p-4 rounded-xl flex flex-col gap-2 shadow-sm"
          >
            {/* Top Row (Status) */}
            <div className="flex justify-between items-center">
              <Badge
                className={`${
                  trx.status === "completed"
                    ? "bg-green-500"
                    : trx.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {trx.status}
              </Badge>

              <div className="flex gap-2">
              </div>
            </div>

            {/* Middle Info */}
            <div className="text-sm text-neutral-600">
              <p>Order ID: {trx.code}</p>
              <p>Date: {new Date(trx.created_at).toLocaleString("id-ID")}</p>
            </div>

            {/* Price */}
            <div className="text-lg font-semibold">{formatIDR(trx.amount)}</div>
          </div>
        ))
      )}
    </div>
  );
};
