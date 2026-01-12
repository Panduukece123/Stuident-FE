import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ScanLine, CheckCircle2 } from "lucide-react"; // Tambah Icon ScanLine
import { formatPrice } from "@/services/Format";

export const CheckoutDialog = ({
  open,
  onOpenChange,
  course,
  paymentMethod,
  setPaymentMethod,
  onConfirm,
  isProcessing,
}) => {
// Mengonversi string "0.00" menjadi angka 0 untuk pengecekan logis
  // Berdasarkan JSON: course.price adalah "0.00"
  const priceValue = parseFloat(course?.price || "0");
  const isFree = priceValue === 0;

  const handleAction = () => {
    if (isFree) {
      // Sesuai permintaan: Console log jika harga 0
      console.log("Selamat, anda sudah terdaftar disini!");

      // Jalankan onConfirm untuk proses pendaftaran ke database (enrollment)
      onConfirm(); 
    } else {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isFree ? "Konfirmasi Akses Gratis" : "Konfirmasi Pembelian"}
          </DialogTitle>
          <DialogDescription>
            {isFree 
              ? "Kursus ini tidak dipungut biaya. Klik tombol di bawah untuk langsung mendaftar."
              : "Silakan pilih metode pembayaran untuk menyelesaikan pesanan Anda."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Status Harga */}
          <div className={`flex justify-between items-center p-4 rounded-xl border ${
            isFree ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
          }`}>
            <span className="text-sm font-medium text-slate-600">Total yang harus dibayar</span>
            <span className={`text-xl font-bold ${isFree ? "text-emerald-600" : "text-primary"}`}>
              {isFree ? "GRATIS" : formatPrice(course?.price)}
            </span>
          </div>

          {!isFree ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Metode Pembayaran</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih metode pembayaran..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qris">QRIS (Otomatis)</SelectItem>
                    <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                    <SelectItem value="manual">Konfirmasi Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          {paymentMethod === "qris" && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-xl bg-slate-50/50 text-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                    <ScanLine className="text-primary w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Scan QR Code</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                    Kode QR pembayaran akan muncul setelah Anda klik konfirmasi.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <CheckCircle2 className="text-emerald-600 w-10 h-10" />
              </div>
              <p className="text-base font-semibold text-slate-800">Akses Terbuka!</p>
              <p className="text-sm text-slate-500 mt-1">
                Anda dapat langsung mengakses semua materi di kursus <b>{course?.title}</b>.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="flex-1 sm:flex-none"
          >
            Batal
          </Button>
          <Button 
            onClick={handleAction} 
            disabled={isProcessing || (!isFree && !paymentMethod)}
            className={`flex-1 sm:flex-none px-8 ${
              isFree 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isFree ? "Daftar Sekarang" : "Konfirmasi Pembayaran"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};