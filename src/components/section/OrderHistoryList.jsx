import React from "react";
import { OrderHistoryCard } from "../shared/OrderHistoryCard";

export const OrderHistoryList = ({
  orders,
  onSelect,
  selectedOrder,
}) => {
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
          image={order.image}
          onClick={() => onSelect(order)}
          isActive={selectedOrder?.id === order.id}
          instructor={
            order.type === "mentoring_session"
              ? order.item_details?.mentor?.name
              : order.type === "subscription"
              ? "-"
              : order.item_details?.instructor || "-"
          }
          duration={
            order.type === "mentoring_session"
              ? null
              : order.item_details?.duration || "-"
          }
        />
      ))}
    </section>
  );
};