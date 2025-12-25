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
import { Loader2, ScanLine } from "lucide-react"; // Tambah Icon ScanLine
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembelian</DialogTitle>
          <DialogDescription>
            Pilih metode pembayaran untuk menyelesaikan pesanan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Total Harga */}
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border">
            <span className="text-sm font-medium">Total Tagihan</span>
            <span className="text-lg font-bold text-primary">
              {course?.price ? formatPrice(course.price) : "Rp 0"}
            </span>
          </div>

          {/* Select Payment Method */}
          <div className="space-y-2">
            <Label>Metode Pembayaran</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Pilih metode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info QRIS (GANTI GAMBAR JADI INFO) */}
          {paymentMethod === "qris" && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-xl bg-slate-50 text-center">
              <div className="bg-white p-3 rounded-full mb-2 shadow-sm">
                 <ScanLine className="text-primary w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-neutral-700">
                QR Code Pembayaran
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Kode QR akan ditampilkan <b>setelah</b> Anda menekan tombol Konfirmasi di bawah.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Batal
          </Button>
          <Button onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Konfirmasi & Bayar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};