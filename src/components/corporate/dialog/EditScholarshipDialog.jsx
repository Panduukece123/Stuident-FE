import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ImageIcon, MapPin, BookOpen, Calendar, AlignLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// --- SCHEMA VALIDASI ---
const scholarshipSchema = z.object({
  name: z.string().min(1, "Nama program wajib diisi"),
  // Image diubah jadi any() agar support File object atau URL string
  image: z.any().optional(), 
  study_field: z.string().min(1, "Bidang studi wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  deadline: z.string().min(1, "Deadline wajib diisi"),
  status: z.enum(["open", "closed"]),
  benefit: z.string().min(10, "Benefit wajib diisi (min 10 karakter)"),
  description: z.string().min(20, "Deskripsi wajib diisi (min 20 karakter)"),
});

export const EditScholarshipDialog = ({ open, onOpenChange, itemToEdit, onSave, isLoading }) => {
  // State Preview
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      name: "", image: null, study_field: "", location: "", deadline: "", status: "open", benefit: "", description: ""
    },
  });

  // --- POPULATE FORM SAAT DIBUKA ---
  useEffect(() => {
    if (itemToEdit && open) {
      form.reset({
        name: itemToEdit.name || "",
        // Image kita set null dulu, user upload baru jika ingin ganti
        image: null, 
        study_field: itemToEdit.study_field || "",
        location: itemToEdit.location || "",
        deadline: itemToEdit.deadline ? itemToEdit.deadline.split("T")[0] : "",
        status: itemToEdit.status || "open",
        benefit: itemToEdit.benefit || "",
        description: itemToEdit.description || "",
      });

      // Set preview gambar lama
      if (itemToEdit.image) {
        setPreviewImage(itemToEdit.image); // Gunakan URL dari backend
      } else {
        setPreviewImage(null);
      }
    }
  }, [itemToEdit, open, form]);

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("image", file); // Simpan File object ke form
      setPreviewImage(URL.createObjectURL(file)); // Update preview ke gambar baru
    }
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Program Beasiswa</DialogTitle>
          <DialogDescription>Perbarui informasi detail program beasiswa ini.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          
          {/* 1. NAMA PROGRAM */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">Nama Program Beasiswa</Label>
            <Input id="name" placeholder="Contoh: Beasiswa Pendidikan Indonesia" {...form.register("name")} />
            {form.formState.errors.name && <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>}
          </div>

          {/* 2. IMAGE UPLOAD (Ganti Input Text jadi File) */}
          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center gap-2 font-medium">
                <ImageIcon className="w-4 h-4 text-neutral-500" /> Banner Gambar
            </Label>
            
            {/* Preview Area */}
            {previewImage && (
                <div className="mb-2">
                     <p className="text-xs text-muted-foreground mb-1">Preview Gambar:</p>
                    <img src={previewImage} alt="Preview" className="h-32 w-auto object-cover rounded-md border" />
                </div>
            )}

            {/* Input File */}
            <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
            />
            <p className="text-[10px] text-neutral-500">Biarkan kosong jika tidak ingin mengubah gambar.</p>
          </div>

          {/* 3. GRID: LOKASI & BIDANG STUDI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" /> Lokasi
                </Label>
                <Input id="location" placeholder="Jakarta / Online" {...form.register("location")} />
                {form.formState.errors.location && <span className="text-xs text-red-500">{form.formState.errors.location.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="study_field" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-neutral-500" /> Bidang Studi
                </Label>
                <Input id="study_field" placeholder="Teknologi / Umum / Ekonomi" {...form.register("study_field")} />
                {form.formState.errors.study_field && <span className="text-xs text-red-500">{form.formState.errors.study_field.message}</span>}
            </div>
          </div>

          {/* 4. GRID: DEADLINE & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="deadline" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500" /> Deadline Pendaftaran
                </Label>
                <Input id="deadline" type="date" {...form.register("deadline")} />
                {form.formState.errors.deadline && <span className="text-xs text-red-500">{form.formState.errors.deadline.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Status Pendaftaran</Label>
                <Select 
                    onValueChange={(val) => form.setValue("status", val)} 
                    value={form.watch("status")}
                >
                    <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open (Dibuka)</SelectItem>
                        <SelectItem value="closed">Closed (Ditutup)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          {/* 5. BENEFIT */}
          <div className="space-y-2">
            <Label htmlFor="benefit" className="font-semibold">Fasilitas & Benefit</Label>
            <Textarea 
                id="benefit" 
                placeholder="Sebutkan cakupan beasiswa..." 
                className="h-24 resize-none"
                {...form.register("benefit")} 
            />
            {form.formState.errors.benefit && <span className="text-xs text-red-500">{form.formState.errors.benefit.message}</span>}
          </div>

          {/* 6. DESKRIPSI */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 font-semibold">
                <AlignLeft className="w-4 h-4 text-neutral-500" /> Deskripsi Lengkap
            </Label>
            <Textarea 
                id="description" 
                placeholder="Jelaskan detail persyaratan..." 
                className="h-40"
                {...form.register("description")} 
            />
            {form.formState.errors.description && <span className="text-xs text-red-500">{form.formState.errors.description.message}</span>}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/80">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};