import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const OrderHistoryDetail = ({ order }) => {
  const printRef = useRef(null);

  // Fungsi Cetak
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${order?.transaction_code}`,
    pageStyle: `
      @page { 
        size: portrait; 
        margin: 20mm; 
      }
      @media print {
        body { margin: 0; -webkit-print-color-adjust: exact; }
      }
    `,
  });

  if (!order) return null;

  const isMentoring = order.type === "mentoring_session";
  const isSubscription = order.type === "subscription";
  const isPaid = order.status?.toLowerCase() === "paid";

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "expired":
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
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
    <div className="max-w-4xl mx-auto">
      {/* --- TAMPILAN LAYAR --- */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-6">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Invoice Transaction</h2>
            <p className="text-sm text-gray-600 mt-1">
              Transaction Code: <span className="font-medium">{order.transaction_code}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="space-y-4">
              <DetailRow label="Email" value={order.user?.email || "-"} />
              <DetailRow label="Nama Produk" value={order.title || order.item_name || "-"} />

              {!isSubscription && (
                <DetailRow
                  label="Instructor"
                  value={isMentoring ? order.item_details?.mentor?.name || "-" : order.item_details?.instructor || "-"}
                />
              )}

              {!isMentoring && (
                <DetailRow
                  label={isSubscription ? "Package Type" : "Level"}
                  value={isSubscription ? order.item_details?.package_type || "-" : order.item_details?.level || "-"}
                />
              )}

              {!isMentoring && (
                <DetailRow label="Duration" value={order.item_details?.duration || "-"} />
              )}

              <DetailRow label="Metode Pembayaran" value={order.payment_method || "-"} />

              <DetailRow
                label="Nominal Pembayaran"
                value={`Rp ${Number(order.amount).toLocaleString("id-ID")}`}
                valueClass="text-lg font-bold"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-gray-900">Tanggal Expired</p>
                <p className="text-sm text-gray-600">{formatDate(order.expired_at)}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-2">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                  {order.status_label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOMBOL DOWNLOAD (Hanya muncul jika sudah bayar) */}
      {isPaid && (
        <div className="flex justify-end no-print mb-10">
          <button
            onClick={handlePrint}
            className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-md"
          >
            Download Invoice (PDF)
          </button>
        </div>
      )}

      {/* --- TEMPLATE DOWNLOAD (HIDDEN) --- */}
      <div style={{ display: "none" }}>
        <div ref={printRef} className="p-10 bg-white" style={{ width: "210mm" }}>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Invoice Transaction</h2>
            <p className="text-xs text-gray-500 mt-1">Transaction Code: {order.transaction_code}</p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-5">
              <PrintRow label="Email" value={order.user?.email} />
              <PrintRow label="Nama Produk" value={order.title || order.item_name} />
              {!isSubscription && (
                <PrintRow 
                  label="Instructor" 
                  value={isMentoring ? order.item_details?.mentor?.name : order.item_details?.instructor} 
                />
              )}
              {!isMentoring && <PrintRow label={isSubscription ? "Package" : "Level"} value={isSubscription ? order.item_details?.package_type : order.item_details?.level} />}
              <PrintRow label="Metode Pembayaran" value={order.payment_method} />
              <div className="mt-6 pt-4">
                <p className="text-xs font-bold text-gray-900 uppercase">Nominal Pembayaran</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  Rp {Number(order.amount).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <PrintRow label="Tanggal Expired" value={formatDate(order.expired_at)} />
              <div>
                <p className="text-xs font-bold text-gray-900 uppercase mb-2">Status</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {order.status_label}
                </span>
              </div>
            </div>
          </div>
        </div>
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

const PrintRow = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
    <p className="text-sm text-gray-700 mt-1 font-medium">{value || "-"}</p>
  </div>
);