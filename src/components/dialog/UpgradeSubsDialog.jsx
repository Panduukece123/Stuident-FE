import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const UpgradeSubscriptionDialog = ({
  open,
  onOpenChange,
  planName,
  isLoading,
  onConfirm,
}) => {
  // State payment method kita taruh di sini saja, 
  // karena parent gak perlu tau user milih apa sampai tombol confirm dipencet.
  const [paymentMethod, setPaymentMethod] = useState("manual");

  const handleConfirmClick = () => {
    // Kirim data payment method yang dipilih ke parent
    onConfirm(paymentMethod);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Upgrade</DialogTitle>
          <DialogDescription>
            Kamu akan berlangganan paket{" "}
            <span className="font-bold capitalize text-primary">{planName}</span>.
            Silakan pilih metode pembayaran.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="payment">Metode Pembayaran</Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              disabled={isLoading}
            >
              <SelectTrigger id="payment">
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="manual">Transfer Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleConfirmClick}
            disabled={isLoading}
            className="bg-primary text-white"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};