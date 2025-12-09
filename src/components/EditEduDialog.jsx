import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import ProfileService from "@/services/ProfileService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditEducationDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    institution: "",
    major: "",
    education_level: "", 
  });

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        institution: initialData.institution || "",
        major: initialData.major || "",
        education_level: initialData.education_level || "",
      });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // KARENA 'SOMETIMES', KITA CUKUP KIRIM DATA EDUCATION SAJA (BERSIH & RAPI)
      await ProfileService.updateProfile(formData);
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Gagal Update:", error);
      if (error.response && error.response.data) {
        alert("Gagal: " + JSON.stringify(error.response.data.errors || error.response.data.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Institution / University</Label>
            <Input 
              name="institution" 
              value={formData.institution} 
              onChange={handleChange} 
              placeholder="Contoh: Universitas Gadjah Mada"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Major</Label>
                <Input 
                  name="major" 
                  value={formData.major} 
                  onChange={handleChange} 
                  placeholder="Contoh: Ilmu Komputer"
                />
            </div>
            
            {/* INI KUNCINYA: VALUE HARUS BAHASA INGGRIS SESUAI REQUEST VALIDASI */}
            <div className="grid gap-2">
                <Label>Degree</Label>
                <Select 
                  value={formData.education_level} 
                  onValueChange={(val) => setFormData({...formData, education_level: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Value = yang dikirim ke backend (wajib english) */}
                    {/* Label (di dalam tag) = yang dilihat user (bebas) */}
                    
                    <SelectItem value="high_school">SMA / SMK</SelectItem>
                    <SelectItem value="diploma">Diploma (D1 - D4)</SelectItem>
                    <SelectItem value="bachelor">Sarjana (S1)</SelectItem>
                    <SelectItem value="master">Magister (S2)</SelectItem>
                    <SelectItem value="phd">Doktor (S3)</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};