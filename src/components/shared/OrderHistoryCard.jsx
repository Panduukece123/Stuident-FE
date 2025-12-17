// src/components/shared/OrderHistoryCard.jsx
import React from "react";

export const OrderHistoryCard = ({
  title,
  type,
  status,
  amount,
  payment_method,
  paid_at,
  code,
  instructor,
  duration,
  image,
}) => {
  const statusStyle = {
    Lunas: "bg-green-500 text-white",
    "Menunggu Pembayaran": "bg-yellow-400 text-black",
    Gagal: "bg-red-500 text-white",
    Kadaluarsa: "bg-gray-400 text-white",
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
      
      {/* STATUS */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            statusStyle[status] || "bg-gray-300 text-black"
          }`}
        >
          {status}
        </span>
        <span className="text-xs text-muted-foreground">{type}</span>
      </div>

      {/* IMAGE + DATA */}
      <div className="flex gap-4">
        {/* IMAGE + DURATION */}
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt={title}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <p className="text-sm mt-2 text-center">{duration}</p>
        </div>

        {/* DATA */}
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-xs text-gray-500">Kode: {code}</p>

          <p className="text-sm">
            <strong>Instructor:</strong> {instructor}
          </p>

          <p className="text-sm">
            <strong>Metode Bayar:</strong> {payment_method}
          </p>

          {paid_at && (
            <p className="text-sm">
              <strong>Dibayar:</strong>{" "}
              {new Date(paid_at).toLocaleDateString("id-ID")}
            </p>
          )}
        </div>
      </div>

      {/* AMOUNT */}
      <div className="text-right font-bold text-primary text-lg">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount)}
      </div>
    </div>
  );
};
