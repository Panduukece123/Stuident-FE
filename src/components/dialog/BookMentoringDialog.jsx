import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  BookOpen, 
  Compass, 
  CreditCard, 
  Link2, 
  FileText,
  Upload,
  ScanLine,
  Check,
  Loader2,
  CheckCircle2
} from "lucide-react";
import MentoringService from "@/services/MentoringService";
import CourseService from "@/services/CourseService";

const bookingSchema = z.object({
  type: z.enum(["academic", "life_plan"], {
    required_error: "Tipe mentoring wajib dipilih",
    invalid_type_error: "Tipe mentoring tidak valid",
  }),
  schedule: z.string().min(1, "Jadwal wajib diisi"),
  meeting_link: z
    .string()
    .url("Format URL tidak valid (harus diawali https://)")
    .optional()
    .or(z.literal("")),
  payment_method: z.enum(["bank_transfer", "qris", "manual"], {
    required_error: "Metode pembayaran wajib dipilih",
    invalid_type_error: "Metode pembayaran tidak valid",
  }),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

const BookMentoringDialog = ({ open, onOpenChange, mentor, onSuccess }) => {
  // Step: "booking" | "payment"
  const [step, setStep] = useState("booking");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // React Hook Form with Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      type: "",
      schedule: "",
      meeting_link: "",
      payment_method: "",
      notes: "",
    },
  });

  // Watch form values
  const formValues = watch();

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      reset();
      setStep("booking");
      setTransaction(null);
      setApiError("");
      setUploadSuccess(false);
    }
  }, [open, reset]);

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
  };

  const onFormSubmit = async (data) => {
    try {
      setSaving(true);
      setApiError("");

      const payload = {
        mentor_id: mentor.id,
        type: data.type,
        schedule: data.schedule.replace("T", " ") + ":00",
        meeting_link: data.meeting_link || null,
        payment_method: data.payment_method,
        notes: data.notes || null,
      };

      const response = await MentoringService.submitMentoringSession(payload);
      
      // Get transaction from response
      const txData = response.data?.transaction || response.transaction || response.data || response;
      setTransaction(txData);
      
      // Move to payment step
      setStep("payment");
      
    } catch (err) {
      console.error("Failed to book mentoring session", err);
      setApiError(
        err.response?.data?.message || 
        "Gagal membooking sesi mentoring. Silakan coba lagi."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUploadProof = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      setApiError("Mohon pilih file bukti pembayaran terlebih dahulu.");
      return;
    }

    try {
      setUploading(true);
      setApiError("");
      
      const transactionId = transaction?.id;
      if (!transactionId) {
        setApiError("ID Transaksi tidak ditemukan.");
        return;
      }

      await CourseService.uploadPaymentProof(transactionId, file);
      setUploadSuccess(true);
      
      // Notify parent
      if (onSuccess) {
        onSuccess(transaction);
      }

    } catch (err) {
      console.error("Failed to upload payment proof", err);
      setApiError(
        err.response?.data?.message || 
        "Gagal mengunggah bukti pembayaran. Silakan coba lagi."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDone = () => {
    if (onSuccess && !uploadSuccess) {
      onSuccess(transaction);
    }
    handleClose(false);
  };

  const formatRupiah = (price) => {
    if (!price) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSelectedPrice = () => {
    if (!formValues.type || !mentor?.mentoring_prices) return null;
    return mentor.mentoring_prices[formValues.type];
  };

  const getQrUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  const isQris = formValues.payment_method === "qris";

  // ==================== RENDER BOOKING STEP ====================
  const renderBookingStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Book Mentoring Session
        </DialogTitle>
        <p className="text-sm text-gray-500">
          dengan <span className="font-semibold text-blue-600">{mentor?.name}</span>
        </p>
      </DialogHeader>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
        {/* API Error Alert */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        {/* Type Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <BookOpen size={16} className="text-blue-500" />
            Tipe Mentoring <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formValues.type}
            onValueChange={(v) => setValue("type", v, { shouldValidate: true })}
          >
            <SelectTrigger className={errors.type ? "border-red-500" : ""}>
              <SelectValue placeholder="Pilih tipe mentoring" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-blue-500" />
                  Academic - {formatRupiah(mentor?.mentoring_prices?.academic)}
                </div>
              </SelectItem>
              <SelectItem value="life_plan">
                <div className="flex items-center gap-2">
                  <Compass size={14} className="text-purple-500" />
                  Life Plan - {formatRupiah(mentor?.mentoring_prices?.life_plan)}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <span className="text-xs text-red-500">{errors.type.message}</span>
          )}
          {formValues.type && (
            <p className="text-xs text-gray-500">
              Harga: <span className="font-semibold text-green-600">{formatRupiah(getSelectedPrice())}</span> per sesi
            </p>
          )}
        </div>

        {/* Schedule */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Calendar size={16} className="text-orange-500" />
            Jadwal <span className="text-red-500">*</span>
          </Label>
          <Input
            type="datetime-local"
            {...register("schedule")}
            min={new Date().toISOString().slice(0, 16)}
            className={errors.schedule ? "border-red-500" : ""}
          />
          {errors.schedule && (
            <span className="text-xs text-red-500">{errors.schedule.message}</span>
          )}
          <p className="text-xs text-gray-500">
            Pilih tanggal dan waktu untuk sesi mentoring
          </p>
        </div>

        {/* Meeting Link */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Link2 size={16} className="text-indigo-500" />
            Meeting Link <span className="text-gray-400">(opsional)</span>
          </Label>
          <Input
            placeholder="https://zoom.us/j/123456789"
            {...register("meeting_link")}
            className={errors.meeting_link ? "border-red-500" : ""}
          />
          {errors.meeting_link && (
            <span className="text-xs text-red-500">{errors.meeting_link.message}</span>
          )}
          <p className="text-xs text-gray-500">
            Link Zoom/Google Meet jika sudah tersedia
          </p>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <CreditCard size={16} className="text-emerald-500" />
            Metode Pembayaran <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formValues.payment_method}
            onValueChange={(v) => setValue("payment_method", v, { shouldValidate: true })}
          >
            <SelectTrigger className={errors.payment_method ? "border-red-500" : ""}>
              <SelectValue placeholder="Pilih metode pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank_transfer">
                <div className="flex items-center gap-2">
                  🏦 Bank Transfer
                </div>
              </SelectItem>
              <SelectItem value="qris">
                <div className="flex items-center gap-2">
                  📱 QRIS
                </div>
              </SelectItem>
              <SelectItem value="manual">
                <div className="flex items-center gap-2">
                  💵 Manual / Cash
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.payment_method && (
            <span className="text-xs text-red-500">{errors.payment_method.message}</span>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <FileText size={16} className="text-gray-500" />
            Catatan <span className="text-gray-400">(opsional)</span>
          </Label>
          <Textarea
            placeholder="Contoh: Saya butuh bimbingan untuk skripsi tentang machine learning"
            {...register("notes")}
            rows={3}
            className={errors.notes ? "border-red-500" : ""}
          />
          {errors.notes && (
            <span className="text-xs text-red-500">{errors.notes.message}</span>
          )}
          <p className="text-xs text-gray-500">
            Jelaskan kebutuhan atau topik yang ingin dibahas (maks. 500 karakter)
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={saving}
          >
            Batal
          </Button>
          <Button 
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Booking Sekarang"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );

  // ==================== RENDER PAYMENT STEP ====================
  const renderPaymentStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          {uploadSuccess ? "Pembayaran Terkirim!" : isQris ? "Scan QRIS" : "Unggah Bukti Pembayaran"}
        </DialogTitle>
        <DialogDescription>
          {uploadSuccess 
            ? "Bukti pembayaran Anda telah berhasil dikirim. Admin akan memverifikasi pembayaran Anda."
            : isQris
              ? "Silakan scan QR Code di bawah ini untuk menyelesaikan pembayaran."
              : "Silakan transfer dan unggah buktinya di sini."
          }
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-2">
        {/* Success State */}
        {uploadSuccess ? (
          <div className="flex flex-col items-center justify-center p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center">
            <div className="bg-green-100 p-4 rounded-full mb-3">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-green-700">Berhasil!</p>
            <p className="text-sm text-green-600 mt-1">
              Bukti pembayaran telah dikirim untuk diverifikasi.
            </p>
          </div>
        ) : (
          <>
            {/* Error Alert */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            {/* QR Code Section */}
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
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm text-center">
                <p className="font-medium mb-1">Silakan lakukan transfer ke rekening tujuan</p>
                <p className="text-xs">
                  ID Transaksi: <strong>#{transaction?.transaction_code || transaction?.id}</strong>
                </p>
              </div>
            )}

            {/* Upload Section - Only for non-QRIS */}
            {!isQris && (
              <div className="space-y-2 mt-2">
                <Label htmlFor="proof">Unggah Bukti Transfer</Label>
                <Input
                  id="proof"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,application/pdf"
                />
                <p className="text-xs text-gray-500">
                  Format: JPG, PNG, atau PDF (maks. 5MB)
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <DialogFooter>
        {uploadSuccess ? (
          <Button onClick={handleDone} className="w-full bg-green-600 hover:bg-green-700">
            <Check className="mr-2 h-4 w-4" />
            Selesai
          </Button>
        ) : isQris ? (
          <Button onClick={handleDone} className="w-full">
            <Check className="mr-2 h-4 w-4" />
            Saya Sudah Membayar
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Button variant="ghost" onClick={handleDone} className="flex-1">
              Nanti Saja
            </Button>
            <Button onClick={handleUploadProof} disabled={uploading} className="flex-1">
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Kirim Bukti
            </Button>
          </div>
        )}
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {step === "booking" ? renderBookingStep() : renderPaymentStep()}
      </DialogContent>
    </Dialog>
  );
};

export default BookMentoringDialog;
