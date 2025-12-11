import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash } from "lucide-react";
import ProfileService from "@/services/ProfileService";
// IMPORT SELECT (Wajib biar field 'type' valid)
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ExperienceDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    organization: "", // UBAH: Backend minta 'organization', bukan 'company'
    type: "",         // UBAH: Harus sesuai pilihan (work, internship, dll)
    level: "",        // Note: Field ini tidak ada di validasi backend, mungkin tidak tersimpan
    start_date: "",
    end_date: "",
    description: "",
    certificate_url: "" // Note: Field ini juga tidak ada di validasi backend
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Mode EDIT
        setFormData({
          title: initialData.title || "",
          // Mapping: Kalau di database namanya 'company', kita masukin ke state 'organization'
          organization: initialData.organization || initialData.company || "",
          type: initialData.type || "",
          level: initialData.level || "",
          start_date: initialData.start_date ? initialData.start_date.split("T")[0] : "",
          end_date: initialData.end_date ? initialData.end_date.split("T")[0] : "",
          description: initialData.description || "",
          certificate_url: initialData.certificate_url || ""
        });
      } else {
        // Mode CREATE
        setFormData({
          title: "", organization: "", type: "", level: "", 
          start_date: "", end_date: "", description: "", certificate_url: ""
        });
      }
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // NOTE: Backend validasi mewajibkan 'organization' dan 'type' yang benar.
      if (initialData?.id) {
        await ProfileService.updateExperience(initialData.id, formData);
      } else {
        await ProfileService.addExperience(formData);
      }
      onSuccess(); 
      onOpenChange(false);
    } catch (error) {
      console.error("Gagal save:", error);
      // Tampilkan error spesifik dari backend biar jelas
      if (error.response && error.response.data) {
          alert("Gagal: " + JSON.stringify(error.response.data.errors || error.response.data.message));
      } else {
          alert("Gagal menyimpan data experience.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            {/* ORGANISASI (Bukan Company) */}
            <div className="grid gap-2">
                <Label>Organization / Company</Label>
                <Input 
                  name="organization" // Penting: name harus organization
                  value={formData.organization} 
                  onChange={handleChange} 
                  placeholder="e.g. Tokopedia" 
                />
            </div>
          </div>

          {/* Baris 2: Tipe (SELECT) & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Type</Label>
                {/* SELECT DROPDOWN UNTUK TYPE */}
                <Select 
                  value={formData.type} 
                  onValueChange={(val) => setFormData({...formData, type: val})}
                >
                  <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                  <SelectContent>
                    {/* Value harus persis sama dengan aturan backend */}
                    <SelectItem value="work">Work (Kerja)</SelectItem>
                    <SelectItem value="internship">Internship (Magang)</SelectItem>
                    <SelectItem value="education">Education (Pendidikan)</SelectItem>
                    <SelectItem value="volunteer">Volunteer (Sukarelawan)</SelectItem>
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

          <div className="grid gap-2">
            <Label>Certificate URL</Label>
            <Input name="certificate_url" value={formData.certificate_url} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex-row items-center gap-2">
          {initialData ? (
            <Button variant="destructive" onClick={handleDelete} disabled={loading} type="button">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />} Delete
            </Button>
          ) : ( <div /> )}

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