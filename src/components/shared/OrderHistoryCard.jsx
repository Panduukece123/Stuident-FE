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
  onClick,
}) => {
  const statusStyle = {
    Lunas: "bg-green-500 text-white",
    "Menunggu Pembayaran": "bg-yellow-400 text-black",
    Gagal: "bg-red-500 text-white",
    Kadaluarsa: "bg-gray-400 text-white",
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formattedDate = paid_at
    ? new Date(paid_at).toLocaleDateString("id-ID")
    : null;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition space-y-3"
    >
      <div className="flex justify-end items-center text-xs pb-2">
        <span className="text-muted-foreground">{type}</span>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <img
            src={image || "https://via.placeholder.com/64x64?text=No+Image"}
            alt={title}
            className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
          />
          <p className="text-xs mt-1 text-gray-500">{duration}</p>
        </div>

        <div className="flex-1 space-y-1">
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-gray-500">Kode: {code}</p>
          </div>

          <div className="space-y-0.5 mt-1">
            <p className="text-xs">
              <strong>Instructor:</strong> {instructor || "-"}
            </p>
            <p className="text-xs">
              <strong>Metode Bayar:</strong> {payment_method}
            </p>
            {formattedDate && (
              <p className="text-xs">
                <strong>Dibayar:</strong> {formattedDate}
              </p>
            )}
            <p className="text-xs">
              <strong>Total Bayar:</strong>{" "}
              <span className="font-bold text-blue-600">
                {formatRupiah(amount)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-3">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            statusStyle[status] || "bg-gray-300 text-black"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};