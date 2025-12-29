import React from "react";

export const OrderHistoryDetail = ({ order}) => {
  if (!order) return null;

  const isMentoring = order.type === "mentoring_session";
  const isSubscription = order.type === "subscription";


  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "expired":
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Invoice Transaction
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Transaction Code:{" "}
            <span className="font-medium">{order.transaction_code}</span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div className="space-y-4">
            <DetailRow label="Email" value={order.user?.email || "-"} />
            <DetailRow label="Nama Produk" value={order.title || "-"} />

            {!isSubscription && (
              <DetailRow
                label="Instructor"
                value={
                  isMentoring
                    ? order.item_details?.mentor?.name || "-"
                    : order.item_details?.instructor || "-"
                }
              />
            )}

            {!isMentoring && (
              <DetailRow
                label={isSubscription ? "Package Type" : "Level"}
                value={
                  isSubscription
                    ? order.item_details?.package_type || "-"
                    : order.item_details?.level || "-"
                }
              />
            )}

            {!isMentoring && (
              <DetailRow
                label="Duration"
                value={order.item_details?.duration || "-"}
              />
            )}

            <DetailRow
              label="Metode Pembayaran"
              value={order.payment_method || "-"}
            />

            <DetailRow
              label="Nominal Pembayaran"
              value={`Rp ${Number(order.amount).toLocaleString("id-ID")}`}
              valueClass="text-lg font-bold"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-900">Tanggal Expired</p>
              <p className="text-sm text-gray-600">
                {formatDate(order.expired_at)}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status_label}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION */}
       
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, valueClass = "text-sm text-gray-600" }) => (
  <div>
    <p className="text-sm font-bold text-gray-900">{label}</p>
    <p className={`${valueClass} mt-0.5`}>{value}</p>
  </div>
);
