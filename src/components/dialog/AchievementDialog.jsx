import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash, Upload, FileText, X, Eye } from "lucide-react"; 
import ProfileService from "@/services/ProfileService";

export const AchievementDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // State untuk data teks
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    year: "",
    description: "",
  });

  // State khusus untuk File
  const [selectedFile, setSelectedFile] = useState(null); // File baru yang akan diupload
  const [existingCertUrl, setExistingCertUrl] = useState(null); // URL file yang sudah ada di server

  useEffect(() => {
    if (open) {
      // Reset File State setiap kali dialog dibuka
      setSelectedFile(null);
      
      if (initialData) {
        // Mode EDIT
        setFormData({
          title: initialData.title || "",
          organization: initialData.organization || "",
          year: initialData.year || "",
          description: initialData.description || "",
        });
        // Simpan URL yang ada (jika ada)
        setExistingCertUrl(initialData.certificate_url || initialData.certificate || null);
      } else {
        // Mode CREATE
        setFormData({ title: "", organization: "", year: "", description: "" });
        setExistingCertUrl(null);
      }
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLER FILE ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Validasi 2MB
        alert("File terlalu besar (Maks 2MB)");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- LOGIC DELETE CERTIFICATE (Server Side) ---
  const handleDeleteExistingCert = async () => {
    if (!confirm("Hapus sertifikat yang sudah tersimpan?")) return;
    
    try {
        setLoading(true);
        await ProfileService.deleteAchievementCertificate(initialData.id);
        setExistingCertUrl(null); // Hilangkan tampilan di UI
        alert("Sertifikat berhasil dihapus.");
    } catch (error) {
        console.error(error);
        alert("Gagal menghapus sertifikat.");
    } finally {
        setLoading(false);
    }
  };

  // --- HANDLE SAVE (UTAMA) ---
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let achievementId = initialData?.id;
      let response;

      // 1. SIMPAN DATA TEKS DULU (Create / Update)
      if (achievementId) {
        // Update
        response = await ProfileService.updateAchievement(achievementId, formData);
      } else {
        // Create
        response = await ProfileService.addAchievement(formData);
        // Tangkap ID baru dari response backend
        // Sesuaikan dengan struktur JSON backend kamu. Misal: response.data.data.id atau response.data.id
        achievementId = response.data?.data?.id || response.data?.id; 
      }

      // 2. JIKA ADA FILE BARU DIPILIH -> UPLOAD KE ENDPOINT KHUSUS
      if (selectedFile && achievementId) {
         await ProfileService.uploadAchievementCertificate(achievementId, selectedFile);
      }

      onSuccess(); // Refresh parent
      onOpenChange(false); // Tutup dialog
      
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE DELETE ACHIEVEMENT (DATA UTAMA) ---
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus prestasi ini?")) return;
    setLoading(true);
    try {
      if (initialData?.id) {
        await ProfileService.deleteAchievement(initialData.id);
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Baris 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Achievement Title</Label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. 1st Winner Hackathon" />
            </div>
            <div className="grid gap-2">
                <Label>Organization / Event</Label>
                <Input name="organization" value={formData.organization} onChange={handleChange} placeholder="e.g. Google DSC" />
            </div>
          </div>

          {/* Baris 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Year</Label>
                <Input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2024" />
            </div>
          </div>

          {/* Baris 3: DESCRIPTION */}
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="h-24" 
              placeholder="Briefly explain your achievement..."
            />
          </div>

          {/* Baris 4: CERTIFICATE UPLOAD (New Section) */}
          <div className="grid gap-2">
            <Label>Certificate (PDF/Image)</Label>
            
            {/* Input File Hidden */}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf, image/*" // Bisa PDF atau Gambar
                onChange={handleFileChange} 
            />

            <div className="border border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-neutral-50/50">
                
                {/* KONDISI 1: Ada file baru yang dipilih (Pending Upload) */}
                {selectedFile ? (
                    <div className="flex items-center justify-between w-full bg-blue-50 border border-blue-200 p-2 rounded-md">
                        <div className="flex items-center gap-2 overflow-hidden">
                             <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                             <span className="text-sm font-medium truncate">{selectedFile.name}</span>
                             <span className="text-xs text-muted-foreground">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleRemoveSelectedFile} className="h-8 w-8 hover:bg-red-100 hover:text-red-600">
                             <X className="w-4 h-4" />
                        </Button>
                    </div>
                ) : existingCertUrl ? (
                // KONDISI 2: Sudah ada file di server (Edit Mode)
                    <div className="flex items-center justify-between w-full bg-green-50 border border-green-200 p-2 rounded-md">
                        <div className="flex items-center gap-2 overflow-hidden">
                             <FileText className="w-5 h-5 text-green-600 shrink-0" />
                             <span className="text-sm font-medium text-green-700">Certificate Uploaded</span>
                        </div>
                        <div className="flex gap-1">
                             <Button 
                                variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-200 text-green-700"
                                onClick={() => window.open(existingCertUrl.startsWith('http') ? existingCertUrl : `http://localhost:8000/storage/${existingCertUrl}`, '_blank')}
                                type="button"
                                title="Lihat"
                             >
                                 <Eye className="w-4 h-4" />
                             </Button>
                             <Button 
                                variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-100 text-red-600"
                                onClick={handleDeleteExistingCert}
                                type="button"
                                title="Hapus Sertifikat"
                             >
                                 <Trash className="w-4 h-4" />
                             </Button>
                        </div>
                    </div>
                ) : (
                // KONDISI 3: Kosong
                   <div className="text-center">
                       <p className="text-sm text-muted-foreground mb-2">Belum ada sertifikat.</p>
                   </div>
                )}

                {/* Tombol Upload / Ganti */}
                {!selectedFile && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current.click()}
                        className="w-fit"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {existingCertUrl ? "Ganti File" : "Upload File"}
                    </Button>
                )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex-row items-center gap-2">
          {initialData ? (
            <Button variant="destructive" onClick={handleDelete} disabled={loading} type="button">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />} Delete
            </Button>
          ) : <div />}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};