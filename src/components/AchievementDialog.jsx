import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash } from "lucide-react"; // Import Trash Icon
import ProfileService from "@/services/ProfileService";

export const AchievementDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    year: "",
    description: "",
    certificate_url: ""
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Mode EDIT
        setFormData({
          title: initialData.title || "",
          organization: initialData.organization || "",
          year: initialData.year || "",
          description: initialData.description || "",
          certificate_url: initialData.certificate_url || ""
        });
      } else {
        // Mode CREATE
        setFormData({
          title: "", organization: "", year: "", description: "", certificate_url: ""
        });
      }
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLE SAVE ---
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await ProfileService.updateAchievement(initialData.id, formData);
      } else {
        await ProfileService.addAchievement(formData);
      }
      onSuccess(); 
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      // Tampilkan error dari backend kalau ada
      let errorMessage = "Gagal menyimpan data achievement.";
      if (error.response && error.response.data) {
          const serverErrors = error.response.data.errors;
          if(serverErrors) {
             errorMessage = Object.values(serverErrors).flat().join('\n');
          } else if (error.response.data.message) {
             errorMessage = error.response.data.message;
          }
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE DELETE (BARU) ---
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus prestasi ini? Data tidak bisa dikembalikan.")) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await ProfileService.deleteAchievement(initialData.id);
        onSuccess(); // Refresh data di parent
        onOpenChange(false); // Tutup dialog
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
          <DialogTitle>{initialData ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Baris 1: Judul Achievement & Penyelenggara */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Achievement Title</Label>
                <Input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. 1st Winner Hackathon" 
                />
            </div>
            <div className="grid gap-2">
                <Label>Organization / Event</Label>
                <Input 
                  name="organization" 
                  value={formData.organization} 
                  onChange={handleChange} 
                  placeholder="e.g. Google DSC" 
                />
            </div>
          </div>

          {/* Baris 2: Tahun & URL Sertifikat */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Year</Label>
                <Input 
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  placeholder="e.g. 2024" 
                />
            </div>
            <div className="grid gap-2">
                <Label>Certificate URL (Optional)</Label>
                <Input 
                  name="certificate_url" 
                  value={formData.certificate_url} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                />
            </div>
          </div>

          {/* Baris 3: Deskripsi */}
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="h-24" 
              placeholder="Explain briefly what you achieved..."
            />
          </div>
        </div>

        {/* FOOTER: Layout Flexbox (Delete Kiri, Save Kanan) */}
        <DialogFooter className="sm:justify-between flex-row items-center gap-2">
          
          {/* KIRI: Tombol Delete (Hanya muncul kalau Mode Edit) */}
          {initialData ? (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={loading}
              type="button"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />}
              Delete
            </Button>
          ) : (
            <div /> // Placeholder biar tombol kanan tetap di kanan
          )}

          {/* KANAN: Tombol Cancel & Save */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
              {initialData ? "Save Changes" : "Add Achievement"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};