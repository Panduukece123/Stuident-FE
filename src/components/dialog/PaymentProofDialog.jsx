import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, ScanLine, Check } from "lucide-react";

export const PaymentProofDialog = ({
  open,
  onOpenChange,
  transaction, // Object transaction dari backend
  onUpload,
  isProcessing,
}) => {
  const fileInputRef = useRef(null);

  // Cek apakah metodenya QRIS
  // Pastikan string 'qris' ini sama persis dengan yang ada di database/backend
  const isQris = transaction?.payment_method === "qris";

  const handleUploadClick = () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Mohon pilih file bukti pembayaran terlebih dahulu.");
      return;
    }
    onUpload(file);
  };
  
  const getQrUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isQris ? "Scan QRIS" : "Unggah Bukti Pembayaran"}
          </DialogTitle>
          <DialogDescription>
            {isQris
              ? "Silakan scan QR Code di bawah ini untuk menyelesaikan pembayaran."
              : "Silakan transfer dan unggah buktinya di sini."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* --- BAGIAN QR CODE / INFO --- */}
          {transaction?.qr_code_url ? (
            <div className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed rounded-xl">
               <p className="text-sm font-semibold mb-2 text-primary">Scan untuk Membayar</p>
               
               <img 
                 src={getQrUrl(transaction.qr_code_url)} 
                 alt="QRIS Code" 
                 className="w-48 h-48 object-contain rounded-md shadow-sm"
               />

               <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <ScanLine size={12} />
                  <span>ID: #{transaction.transaction_code || transaction.id}</span>
               </div>
            </div>
          ) : (
             <div className="bg-blue-50 text-blue-700 p-3 rounded text-sm text-center">
                Silakan lakukan transfer ke rekening tujuan.<br/>
                ID Transaksi: <strong>#{transaction?.transaction_code || transaction?.id}</strong>
             </div>
          )}

          {/* --- BAGIAN UPLOAD (HANYA MUNCUL KALO BUKAN QRIS) --- */}
          {!isQris && (
            <div className="space-y-2 mt-2">
              <Label htmlFor="proof">Unggah Bukti Transfer</Label>
              <Input
                id="proof"
                type="file"
                ref={fileInputRef}
                accept="image/*,application/pdf"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {/* Jika QRIS, tombolnya cuma "Tutup" atau "Selesai" */}
          {isQris ? (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Saya Sudah Membayar
            </Button>
          ) : (
            // Jika Manual, tombolnya "Kirim Bukti"
            <>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Nanti Saja
              </Button>
              <Button onClick={handleUploadClick} disabled={isProcessing}>
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Kirim Bukti
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};