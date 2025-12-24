import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash, Upload, FileText, X, Eye } from "lucide-react";
import ProfileService from "@/services/ProfileService";
// Select Component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ExperienceDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // State Data Teks
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    type: "", 
    level: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  // State File Upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingCertUrl, setExistingCertUrl] = useState(null);

  useEffect(() => {
    if (open) {
      // Reset File
      setSelectedFile(null);

      if (initialData) {
        // Mode EDIT
        setFormData({
          title: initialData.title || "",
          organization: initialData.organization || initialData.company || "",
          type: initialData.type || "",
          level: initialData.level || "",
          start_date: initialData.start_date ? initialData.start_date.split("T")[0] : "",
          end_date: initialData.end_date ? initialData.end_date.split("T")[0] : "",
          description: initialData.description || "",
        });
        setExistingCertUrl(initialData.certificate_url || initialData.certificate || null);
      } else {
        // Mode CREATE
        setFormData({
          title: "", organization: "", type: "", level: "", 
          start_date: "", end_date: "", description: ""
        });
        setExistingCertUrl(null);
      }
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FILE HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        alert("File terlalu besar (Maks 2MB)"); return; 
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- DELETE EXISTING CERTIFICATE ---
  const handleDeleteExistingCert = async () => {
    if (!confirm("Hapus sertifikat yang sudah tersimpan?")) return;
    try {
        setLoading(true);
        await ProfileService.deleteExperienceCertificate(initialData.id);
        setExistingCertUrl(null); 
        alert("Sertifikat berhasil dihapus.");
    } catch (error) {
        console.error(error);
        alert("Gagal menghapus sertifikat.");
    } finally {
        setLoading(false);
    }
  };

  // --- SAVE DATA (TEXT + FILE) ---
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let experienceId = initialData?.id;
      let response;

      // 1. Simpan Data Teks
      if (experienceId) {
        await ProfileService.updateExperience(experienceId, formData);
      } else {
        response = await ProfileService.addExperience(formData);
        // Tangkap ID baru (sesuaikan struktur response backend)
        experienceId = response.data?.data?.id || response.data?.id;
      }

      // 2. Upload File (Jika ada file baru & ID valid)
      if (selectedFile && experienceId) {
         await ProfileService.uploadExperienceCertificate(experienceId, selectedFile);
      }

      onSuccess(); 
      onOpenChange(false);
    } catch (error) {
      console.error("Gagal save:", error);
      let errMsg = "Gagal menyimpan data.";
      if (error.response && error.response.data) {
          const e = error.response.data;
          errMsg = e.message || JSON.stringify(e.errors);
      }
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE DATA UTAMA ---
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setLoading(true);
    try {
      if (initialData?.id) {
        await ProfileService.deleteExperience(initialData.id);
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Gagal hapus:", error);
      alert("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Experience" : "Add New Experience"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Baris 1: Jabatan & Organisasi */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Job Title</Label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Frontend Dev" />
            </div>
            <div className="grid gap-2">
                <Label>Organization / Company</Label>
                <Input name="organization" value={formData.organization} onChange={handleChange} placeholder="e.g. Tokopedia" />
            </div>
          </div>

          {/* Baris 2: Tipe & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                  <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Level</Label>
                <Input name="level" value={formData.level} onChange={handleChange} placeholder="Junior/Senior" />
            </div>
          </div>

          {/* Baris 3: Tanggal */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Start Date</Label>
                <Input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
                <Label>End Date</Label>
                <Input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} className="h-24" />
          </div>

          {/* Baris 4: CERTIFICATE UPLOAD (New Section) */}
          <div className="grid gap-2">
            <Label>Certificate (PDF/Image)</Label>
            
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf, image/*"
                onChange={handleFileChange} 
            />

            <div className="border border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-neutral-50/50">
                {/* Condition 1: New File Selected */}
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
                // Condition 2: Existing File on Server
                    <div className="flex items-center justify-between w-full bg-green-50 border border-green-200 p-2 rounded-md">
                        <div className="flex items-center gap-2 overflow-hidden">
                             <FileText className="w-5 h-5 text-green-600 shrink-0" />
                             <span className="text-sm font-medium text-green-700">Certificate Uploaded</span>
                        </div>
                        <div className="flex gap-1">
                             <Button 
                                variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-200 text-green-700"
                                onClick={() => window.open(existingCertUrl.startsWith('http') ? existingCertUrl : `http://localhost:8000/storage/${existingCertUrl}`, '_blank')}
                                type="button" title="View"
                             >
                                 <Eye className="w-4 h-4" />
                             </Button>
                             <Button 
                                variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-100 text-red-600"
                                onClick={handleDeleteExistingCert}
                                type="button" title="Delete Certificate"
                             >
                                 <Trash className="w-4 h-4" />
                             </Button>
                        </div>
                    </div>
                ) : (
                // Condition 3: Empty
                   <div className="text-center">
                       <p className="text-sm text-muted-foreground mb-2">No certificate uploaded yet.</p>
                   </div>
                )}

                {!selectedFile && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current.click()}
                        className="w-fit"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        {existingCertUrl ? "Change File" : "Upload File"}
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
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
              {initialData ? "Save Changes" : "Add Experience"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};