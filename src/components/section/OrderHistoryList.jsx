import React from "react";
import { OrderHistoryCard } from "../shared/OrderHistoryCard";

export const OrderHistoryList = ({ orders }) => {
  return (
    <section className="space-y-4">
      {orders.map((order) => (
        <OrderHistoryCard
          key={order.id}
          // Pakai field standar hasil normalisasi Service
          title={order.item_name}
          image={order.item_image}
          instructor={order.item_instructor}
          
          // Field bawaan transaksi
          type={order.type_label}
          status={order.status_label}
          amount={Number(order.amount)}
          payment_method={order.payment_method}
          paid_at={order.paid_at}
          code={order.transaction_code}
        />
      ))}
    </section>
  );
};