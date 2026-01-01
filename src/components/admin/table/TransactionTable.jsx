import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Eye, Check, FileText, ExternalLink } from "lucide-react";

const TransactionTable = ({ transactions, onViewDetail, onConfirmPayment, confirmingId }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Status badge colors
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "expired":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "refunded":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Type badge colors
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "course_enrollment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "subscription":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "mentoring":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Payment method badge colors
  const getPaymentMethodBadgeColor = (method) => {
    switch (method) {
      case "bank_transfer":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "qris":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "e_wallet":
        return "bg-pink-100 text-pink-700 border-pink-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format payment method label
  const formatPaymentMethod = (method) => {
    switch (method) {
      case "bank_transfer":
        return "Bank Transfer";
      case "qris":
        return "QRIS";
      case "e_wallet":
        return "E-Wallet";
      default:
        return method || "-";
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Tidak ada transaksi ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border shadow-sm">
        {/* Head row */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left font-medium text-sm">Kode</th>
            <th className="border p-2 text-left font-medium text-sm">User</th>
            <th className="border p-2 text-left font-medium text-sm">Item</th>
            <th className="border p-2 text-center font-medium text-sm">Tipe</th>
            <th className="border p-2 text-right font-medium text-sm">Jumlah</th>
            <th className="border p-2 text-center font-medium text-sm">Metode</th>
            <th className="border p-2 text-center font-medium text-sm">Status</th>
            <th className="border p-2 text-center font-medium text-sm">Aksi</th>
          </tr>
        </thead>

        {/* Transaction rows */}
        <tbody>
          {transactions.map((trx) => (
            <React.Fragment key={trx.id}>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="border p-2 text-sm font-mono text-xs">
                  {trx.transaction_code}
                </td>
                <td className="border p-2">
                  <div className="text-sm font-medium">{trx.user?.name || "-"}</div>
                  <div className="text-xs text-muted-foreground">{trx.user?.email || "-"}</div>
                </td>
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={trx.image}
                      alt={trx.item_name}
                      className="w-12 h-8 object-cover rounded shadow-sm"
                    />
                    <span className="text-sm font-medium line-clamp-1">{trx.item_name || "-"}</span>
                  </div>
                </td>
                <td className="border p-2 text-center">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium border-0 ${getTypeBadgeColor(trx.type)}`}
                  >
                    {trx.type_label || trx.type}
                  </Badge>
                </td>
                <td className="border p-2 text-right text-sm font-medium">
                  {trx.formatted_amount}
                </td>
                <td className="border p-2 text-center">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium border-0 ${getPaymentMethodBadgeColor(trx.payment_method)}`}
                  >
                    {formatPaymentMethod(trx.payment_method)}
                  </Badge>
                </td>
                <td className="border p-2 text-center">
                  <Badge
                    variant="outline"
                    className={`capitalize text-xs font-medium border-0 ${getStatusBadgeColor(trx.status)}`}
                  >
                    {trx.status_label || trx.status}
                  </Badge>
                </td>
                <td className="border p-2">
                  <div className="flex gap-1 justify-center flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleExpand(trx.id)}
                      title={expandedId === trx.id ? "Tutup detail" : "Lihat detail"}
                    >
                      {expandedId === trx.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetail(trx)}
                      title="Lihat detail lengkap"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {trx.status === "pending" && (
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onConfirmPayment(trx.id)}
                        disabled={confirmingId === trx.id}
                        title="Konfirmasi pembayaran"
                      >
                        {confirmingId === trx.id ? (
                          <span className="animate-spin">⏳</span>
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>

              {/* Expanded details row */}
              {expandedId === trx.id && (
                <tr>
                  <td colSpan={8} className="border p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {/* Transaction Info */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Info Transaksi</h4>
                        <p><strong>ID:</strong> {trx.id}</p>
                        <p><strong>Kode:</strong> {trx.transaction_code}</p>
                        <p><strong>Dibuat:</strong> {formatDate(trx.created_at)}</p>
                        <p><strong>Kadaluarsa:</strong> {formatDate(trx.expired_at)}</p>
                        {trx.paid_at && <p><strong>Dibayar:</strong> {formatDate(trx.paid_at)}</p>}
                      </div>

                      {/* Item Details */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Detail Item</h4>
                        <p><strong>Nama:</strong> {trx.item_name || "-"}</p>
                        {trx.item_details?.instructor && (
                          <p><strong>Instruktur:</strong> {trx.item_details.instructor}</p>
                        )}
                        {trx.item_details?.level && (
                          <p><strong>Level:</strong> {trx.item_details.level}</p>
                        )}
                        {trx.item_details?.duration && (
                          <p><strong>Durasi:</strong> {trx.item_details.duration}</p>
                        )}
                      </div>

                      {/* Payment Proof */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">Bukti Pembayaran</h4>
                        {trx.payment_proof ? (
                          <a
                            href={trx.payment_proof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                          >
                            <FileText className="h-4 w-4" />
                            Lihat Bukti
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">Belum ada bukti</span>
                        )}
                        {trx.qr_code_url && (
                          <div className="mt-2">
                            <p className="font-medium mb-1">QR Code:</p>
                            <img src={trx.qr_code_url} alt="QR Code" className="w-24 h-24" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
