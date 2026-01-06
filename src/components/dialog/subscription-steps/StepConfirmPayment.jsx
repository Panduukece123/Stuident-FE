import React from "react";
import {
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
import { Loader2, CreditCard, AlertCircle } from "lucide-react";

export const StepConfirmPayment = ({
  planConfig,
  paymentMethod,
  setPaymentMethod,
  isLoading,
  error,
  onSubmit,
  onClose,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Konfirmasi Langganan
        </DialogTitle>
        <DialogDescription>
          Anda akan berlangganan paket{" "}
          <span className={`font-bold capitalize text-${planConfig.color}-600`}>
            {planConfig.name}
          </span>
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 space-y-4">
        {/* Plan Summary */}
        <div className={`p-4 rounded-lg bg-${planConfig.color}-50 border border-${planConfig.color}-200`}>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Paket</span>
            <span className="font-semibold capitalize">{planConfig.name}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Harga</span>
            <span className="font-bold text-lg">{planConfig.displayPrice}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Durasi</span>
            <span className="font-semibold">{planConfig.duration} bulan</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
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
              <SelectItem value="manual">Transfer Manual (Bank Transfer)</SelectItem>
              <SelectItem value="qris">QRIS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Batal
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Memproses..." : "Lanjutkan Pembayaran"}
        </Button>
      </DialogFooter>
    </>
  );
};
