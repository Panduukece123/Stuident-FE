import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, RefreshCw, ChevronLeft, ChevronRight, Filter, X,
  DollarSign, Clock, CheckCircle, XCircle, TrendingUp, CreditCard
} from "lucide-react";
import AdminTransactionService from "@/services/admin/TransactionService";
import TransactionTable from "@/components/admin/table/TransactionTable";
import { TransactionDetailDialog } from "@/components/admin/dialog/TransactionDetailDialog";

const AdminTransactions = () => {
  // State for transactions data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for statistics
  const [statistics, setStatistics] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    payment_method: "",
    page: 1,
  });

  // State for pagination
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  // State for detail dialog
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // State for confirming payment
  const [confirmingId, setConfirmingId] = useState(null);

  // Fetch statistics
  const fetchStatistics = async () => {
    setLoadingStats(true);
    try {
      const result = await AdminTransactionService.getStatistics();
      setStatistics(result);
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build params, removing empty values
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.type) params.type = filters.type;
      if (filters.payment_method) params.payment_method = filters.payment_method;
      params.page = filters.page;

      const result = await AdminTransactionService.getAll(params);
      setTransactions(result.data || []);
      setPagination(result.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
      });
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Gagal memuat data transaksi. Silakan coba lagi.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics on mount
  useEffect(() => {
    fetchStatistics();
  }, []);

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to page 1 when filter changes
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      status: "",
      type: "",
      payment_method: "",
      page: 1,
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setFilters((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  // Handle view detail
  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailDialogOpen(true);
  };

  // Handle confirm payment
  const handleConfirmPayment = async (transactionId) => {
    if (!confirm("Apakah Anda yakin ingin mengkonfirmasi pembayaran ini?")) return;

    setConfirmingId(transactionId);
    try {
      await AdminTransactionService.confirmPayment(transactionId, "paid");
      // Refresh the list and statistics
      await fetchTransactions();
      await fetchStatistics();
      // Close dialog if open
      if (detailDialogOpen && selectedTransaction?.id === transactionId) {
        setDetailDialogOpen(false);
      }
      alert("Pembayaran berhasil dikonfirmasi!");
    } catch (err) {
      console.error("Failed to confirm payment:", err);
      alert("Gagal mengkonfirmasi pembayaran. Silakan coba lagi.");
    } finally {
      setConfirmingId(null);
    }
  };

  // Check if any filter is active
  const hasActiveFilters = filters.status || filters.type || filters.payment_method;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Transaksi</h1>
          <Button
            variant="outline"
            onClick={() => {
              fetchTransactions();
              fetchStatistics();
            }}
            disabled={loading || loadingStats}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading || loadingStats ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Total Revenue</p>
                  <p className="text-xl font-bold mt-1">
                    {loadingStats ? "..." : formatCurrency(statistics?.total_revenue)}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Transactions */}
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Total Transaksi</p>
                  <p className="text-xl font-bold mt-1">
                    {loadingStats ? "..." : statistics?.total_transactions || 0}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Transactions */}
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Menunggu Bayar</p>
                  <p className="text-xl font-bold mt-1">
                    {loadingStats ? "..." : statistics?.pending_transactions || 0}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paid Transactions */}
          <Card className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Lunas</p>
                  <p className="text-xl font-bold mt-1">
                    {loadingStats ? "..." : statistics?.paid_transactions || 0}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          </div>

          {/* Status Filter */}
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Menunggu Pembayaran</SelectItem>
              <SelectItem value="paid">Lunas</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
              <SelectItem value="expired">Kadaluarsa</SelectItem>
              <SelectItem value="refunded">Dikembalikan</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipe Transaksi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course_enrollment">Pendaftaran Kursus</SelectItem>
              <SelectItem value="subscription">Langganan</SelectItem>
              <SelectItem value="mentoring_session">Mentoring</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment Method Filter */}
          <Select
            value={filters.payment_method}
            onValueChange={(value) => handleFilterChange("payment_method", value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Metode Bayar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="qris">QRIS</SelectItem>
              <SelectItem value="e_wallet">E-Wallet</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Reset Filter
            </Button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Memuat transaksi...</span>
        </div>
      ) : (
        <>
          {/* Transactions Table */}
          <TransactionTable
            transactions={transactions}
            onViewDetail={handleViewDetail}
            onConfirmPayment={handleConfirmPayment}
            confirmingId={confirmingId}
          />

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan halaman {pagination.current_page} dari {pagination.last_page}
                {pagination.total > 0 && ` (${pagination.total} total transaksi)`}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>
                <div className="flex items-center gap-1">
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                    let pageNum;
                    if (pagination.last_page <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.current_page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.current_page >= pagination.last_page - 2) {
                      pageNum = pagination.last_page - 4 + i;
                    } else {
                      pageNum = pagination.current_page - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === pagination.current_page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page >= pagination.last_page}
                >
                  Selanjutnya
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Transaction Detail Dialog */}
      <TransactionDetailDialog
        transactionId={selectedTransaction?.id}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onConfirmPayment={handleConfirmPayment}
        confirmingId={confirmingId}
      />
    </div>
  );
};

export default AdminTransactions;
