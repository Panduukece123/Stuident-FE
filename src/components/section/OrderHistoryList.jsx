import React from "react";
import { OrderHistoryCard } from "../shared/OrderHistoryCard";

export const OrderHistoryList = ({ orders }) => {
  return (
    <section className="space-y-4">
      {orders.map((order) => (
        <OrderHistoryCard
          key={order.id}
          title={order.item_name || order.type_label}
          type={order.type_label}
          status={order.status_label}
          amount={Number(order.amount)}
          payment_method={order.payment_method}
          paid_at={order.paid_at}
          code={order.transaction_code}
          instructor={order.item_details?.instructor || "-"}
          duration={order.item_details?.duration || "-"}
          image={order.image} // sudah ada di TransactionService
        />
      ))}
    </section>
  );
};
