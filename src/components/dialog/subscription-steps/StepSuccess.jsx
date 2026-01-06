import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";

export const StepSuccess = ({ onFinish }) => {
  return (
    <>
      <DialogHeader className="text-center pt-4">
        <div className="mx-auto mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <DialogTitle className="text-xl">Pembayaran Terkirim!</DialogTitle>
        <DialogDescription className="text-center mt-2">
          Bukti pembayaran Anda telah berhasil dikirim.
        </DialogDescription>
      </DialogHeader>

      <div className="py-6">
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">Menunggu Konfirmasi Admin</p>
            <p className="text-amber-700 mt-1">
              Pembayaran Anda sedang diverifikasi. Kami akan mengaktifkan langganan Anda
              setelah pembayaran dikonfirmasi (maks. 1x24 jam).
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={onFinish} className="w-full">
          Selesai
        </Button>
      </DialogFooter>
    </>
  );
};
