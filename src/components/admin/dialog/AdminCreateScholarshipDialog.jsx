import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query"; 
import { Loader2, ImageIcon, MapPin, BookOpen, Calendar, AlignLeft, Building2 } from "lucide-react";

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
import OrganizationService from "@/services/corporate/OrganizationService";

// --- SCHEMA VALIDASI ---
const scholarshipSchema = z.object({
  organization_id: z.string().min(1, "Organisasi wajib dipilih"),
  name: z.string().min(1, "Nama beasiswa wajib diisi"),
  // Image diubah jadi any() atau optional karena nanti bentuknya File object
  image: z.any().optional(),
  study_field: z.string().min(1, "Bidang studi wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  deadline: z.string().min(1, "Deadline wajib diisi"),
  status: z.enum(["open", "closed"]),
  benefit: z.string().min(10, "Benefit wajib diisi (min 10 karakter)"),
  description: z.string().min(20, "Deskripsi wajib diisi (min 20 karakter)"),
});

export const CreateScholarshipDialog = ({ open, onOpenChange, onSave, isLoading }) => {
  // State untuk preview gambar
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      organization_id: "",
      name: "",
      image: null, // Default null untuk file
      study_field: "",
      description: "",
      benefit: "",
      location: "",
      deadline: "",
      status: "open",
    },
  });

  const { data: rawOrgs, isLoading: loadingOrgs } = useQuery({
    queryKey: ["organizations-list"],
    queryFn: OrganizationService.getOrganizations,
    enabled: open,
  });

  const organizations = Array.isArray(rawOrgs) 
    ? rawOrgs 
    : (Array.isArray(rawOrgs?.data) ? rawOrgs.data : []);

  // Reset form & preview saat dialog dibuka
  useEffect(() => {
    if (open) {
      form.reset({
        organization_id: "",
        name: "",
        image: null,
        study_field: "",
        description: "",
        benefit: "",
        location: "",
        deadline: "",
        status: "open",
      });
      setPreviewImage(null); // Reset preview
    }
  }, [open, form]);

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("image", file); // Set value ke RHF
      setPreviewImage(URL.createObjectURL(file)); // Buat preview lokal
    }
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Buat Beasiswa Baru</DialogTitle>
          <DialogDescription>Isi detail program beasiswa yang ingin Anda tawarkan.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          
          {/* 1. PILIH ORGANISASI */}
          <div className="space-y-2">
            <Label htmlFor="organization_id" className="flex items-center gap-2 font-semibold">
                <Building2 className="w-4 h-4 text-neutral-500" /> Pilih Organisasi
            </Label>
            <Select 
                onValueChange={(val) => form.setValue("organization_id", val)} 
                defaultValue={form.watch("organization_id")}
                disabled={loadingOrgs}
            >
                <SelectTrigger>
                    <SelectValue placeholder={loadingOrgs ? "Memuat data..." : "Pilih Organisasi Penyedia"} />
                </SelectTrigger>
                <SelectContent>
                    {organizations.length > 0 ? (
                        organizations.map((org) => (
                            <SelectItem key={org.id} value={String(org.id)}>{org.name}</SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-neutral-500 text-center">Tidak ada data</div>
                    )}
                </SelectContent>
            </Select>
            {form.formState.errors.organization_id && (
                <span className="text-xs text-red-500">{form.formState.errors.organization_id.message}</span>
            )}
          </div>

          {/* 2. NAMA PROGRAM */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">Nama Program Beasiswa</Label>
            <Input id="name" placeholder="Contoh: Tech Scholarship 2025" {...form.register("name")} />
            {form.formState.errors.name && <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>}
          </div>

          {/* 3. IMAGE UPLOAD (Ganti Input Text jadi File) */}
          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center gap-2 font-medium">
                <ImageIcon className="w-4 h-4 text-neutral-500" /> Banner Gambar
            </Label>
            
            {/* Preview Area */}
            {previewImage && (
                <div className="mb-2">
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
            <p className="text-[10px] text-neutral-500">Format: JPG, PNG, GIF (Max 2MB)</p>
          </div>

          {/* 4. GRID: LOKASI & BIDANG STUDI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-neutral-500" /> Lokasi
                </Label>
                <Input id="location" placeholder="Jakarta / Remote" {...form.register("location")} />
                {form.formState.errors.location && <span className="text-xs text-red-500">{form.formState.errors.location.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="study_field" className="flex items-center gap-2 font-medium">
                    <BookOpen className="w-4 h-4 text-neutral-500" /> Bidang Studi
                </Label>
                <Input id="study_field" placeholder="Teknologi / Umum / Ekonomi" {...form.register("study_field")} />
                {form.formState.errors.study_field && <span className="text-xs text-red-500">{form.formState.errors.study_field.message}</span>}
            </div>
          </div>

          {/* 5. GRID: DEADLINE & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-neutral-500" /> Deadline
              </Label>
              <Input id="deadline" type="date" {...form.register("deadline")} />
              {form.formState.errors.deadline && <span className="text-xs text-red-500">{form.formState.errors.deadline.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="font-medium">Status</Label>
              <Select onValueChange={(val) => form.setValue("status", val)} defaultValue="open">
                  <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="open">Open (Dibuka)</SelectItem>
                      <SelectItem value="closed">Closed (Ditutup)</SelectItem>
                  </SelectContent>
              </Select>
            </div>
          </div>

          {/* 6. BENEFIT */}
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

          {/* 7. DESKRIPSI */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 font-semibold">
                <AlignLeft className="w-4 h-4 text-neutral-500" /> Deskripsi Lengkap
            </Label>
            <Textarea 
                id="description" 
                rows={4} 
                placeholder="Jelaskan detail persyaratan..." 
                className="h-32"
                {...form.register("description")} 
            />
            {form.formState.errors.description && <span className="text-xs text-red-500">{form.formState.errors.description.message}</span>}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};