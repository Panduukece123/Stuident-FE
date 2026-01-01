import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  User,
  Mail,
  CreditCard,
  Calendar,
  Clock,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import AdminTransactionService from "@/services/admin/TransactionService";

export const TransactionDetailDialog = ({
  transactionId,
  open,
  onOpenChange,
  onConfirmPayment,
  confirmingId,
}) => {
  // Fetch transaction detail
  const {
    data: transaction,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-transaction-detail", transactionId],
    queryFn: () => AdminTransactionService.getById(transactionId),
    enabled: open && !!transactionId,
    staleTime: 0,
  });

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "expired":
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
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

  const handleConfirm = async () => {
    if (onConfirmPayment && transaction) {
      await onConfirmPayment(transaction.id);
      refetch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Detail Transaksi
          </DialogTitle>
          <DialogDescription>
            {transaction?.transaction_code || `ID: ${transactionId}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Memuat detail transaksi...</p>
          </div>
        ) : isError || !transaction ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2 text-red-500">
            <AlertCircle className="h-10 w-10" />
            <p>Gagal memuat detail transaksi.</p>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Status Header */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border">
              <div className="flex items-center gap-3">
                {getStatusIcon(transaction.status)}
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="outline"
                    className={`capitalize text-sm font-medium border-0 ${getStatusBadgeColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status_label || transaction.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {transaction.formatted_amount}
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <User className="h-4 w-4" /> Informasi User
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <InfoItem
                  icon={User}
                  label="Nama"
                  value={transaction.user?.name}
                />
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={transaction.user?.email}
                />
              </div>
            </div>

            {/* Item Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Detail Item
              </h4>
              <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={transaction.image}
                  alt={transaction.item_name}
                  className="w-24 h-16 object-cover rounded-lg shadow"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{transaction.item_name || "-"}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.type_label || transaction.type}
                  </p>
                  {transaction.item_details?.instructor && (
                    <p className="text-sm">
                      <strong>Instruktur:</strong> {transaction.item_details.instructor}
                    </p>
                  )}
                  {transaction.item_details?.level && (
                    <p className="text-sm">
                      <strong>Level:</strong> {transaction.item_details.level}
                    </p>
                  )}
                  {transaction.item_details?.duration && (
                    <p className="text-sm">
                      <strong>Durasi:</strong> {transaction.item_details.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Informasi Pembayaran
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <InfoItem
                  icon={CreditCard}
                  label="Metode Pembayaran"
                  value={formatPaymentMethod(transaction.payment_method)}
                />
                <InfoItem
                  icon={DollarSign}
                  label="Jumlah"
                  value={transaction.formatted_amount}
                />
                <InfoItem
                  icon={Calendar}
                  label="Dibuat"
                  value={formatDate(transaction.created_at)}
                />
                <InfoItem
                  icon={Clock}
                  label="Kadaluarsa"
                  value={formatDate(transaction.expired_at)}
                />
                {transaction.paid_at && (
                  <InfoItem
                    icon={CheckCircle}
                    label="Dibayar"
                    value={formatDate(transaction.paid_at)}
                    className="md:col-span-2"
                  />
                )}
              </div>
            </div>

            {/* Payment Proof */}
            {transaction.payment_proof && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Bukti Pembayaran
                </h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <a
                    href={transaction.payment_proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Lihat Bukti Pembayaran
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* QR Code */}
            {transaction.qr_code_url && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  QR Code
                </h4>
                <div className="p-3 bg-gray-50 rounded-lg flex justify-center">
                  <img
                    src={transaction.qr_code_url}
                    alt="QR Code"
                    className="w-32 h-32 rounded-lg shadow"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer with actions */}
        {transaction && transaction.status === "pending" && (
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConfirm}
              disabled={confirmingId === transaction.id}
            >
              {confirmingId === transaction.id ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Mengkonfirmasi...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Konfirmasi Pembayaran
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Helper Component for Info Item
const InfoItem = ({ icon: Icon, label, value, className }) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="mt-0.5 p-1.5 bg-white border rounded-md shadow-sm text-muted-foreground">
      <Icon size={14} />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value || "-"}</span>
    </div>
  </div>
);

export default TransactionDetailDialog;
