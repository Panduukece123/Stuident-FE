import React, { useRef, useState } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, FileImage, AlertCircle, X } from "lucide-react";

export const StepUploadProof = ({
  planConfig,
  isLoading,
  error,
  onSubmit,
  onBack,
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [localError, setLocalError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setLocalError("Format file harus JPG, PNG, atau PDF");
        return;
      }
      if (file.size > maxSize) {
        setLocalError("Ukuran file maksimal 2MB");
        return;
      }

      setLocalError("");
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setLocalError("Silakan pilih file bukti pembayaran");
      return;
    }
    onSubmit(selectedFile);
  };

  const displayError = localError || error;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Bukti Pembayaran
        </DialogTitle>
        <DialogDescription>
          Silakan transfer ke rekening berikut, lalu upload bukti pembayaran.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 space-y-4">
        {/* Bank Info */}
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 space-y-2">
          <p className="text-sm font-semibold text-blue-800">Informasi Transfer</p>
          <div className="text-sm space-y-1">
            <p><span className="text-gray-600">Bank:</span> <span className="font-medium">BCA</span></p>
            <p><span className="text-gray-600">No. Rekening:</span> <span className="font-medium">1234567890</span></p>
            <p><span className="text-gray-600">Atas Nama:</span> <span className="font-medium">PT Stuident Indonesia</span></p>
            <p><span className="text-gray-600">Jumlah:</span> <span className="font-bold text-blue-700">{planConfig.displayPrice}</span></p>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label>Bukti Pembayaran</Label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              selectedFile ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-primary"
            }`}
          >
            {!selectedFile ? (
              <div
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileImage className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Klik untuk upload atau drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, atau PDF (maks. 2MB)</p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded" />
                  ) : (
                    <FileImage className="h-10 w-10 text-green-600" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {displayError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {displayError}
          </div>
        )}
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Kembali
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || !selectedFile}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Mengupload..." : "Upload Bukti"}
        </Button>
      </DialogFooter>
    </>
  );
};
