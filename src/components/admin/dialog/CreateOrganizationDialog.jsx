import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X, Building2 } from "lucide-react";
import OrganizationService from "@/services/corporate/OrganizationService";
import { useQueryClient } from "@tanstack/react-query";

export const CreateOrganizationDialog = ({ open, onOpenChange }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "company", // Default value
    description: "",
  });
  
  // File State
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Reset Form Function
  const resetForm = () => {
    setFormData({ name: "", type: "company", description: "" });
    setLogoFile(null);
    setPreviewUrl(null);
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview lokal sebelum upload
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create Data Text (POST /organizations)
      const newOrg = await OrganizationService.createOrganization(formData);

      // Pastikan backend mengembalikan object yang ada ID-nya
      // Biasanya response.data berisi object yg baru dibuat
      const newOrgId = newOrg?.data?.id || newOrg?.id; 

      // 2. Kalau ada file logo, Upload ke ID yang baru dibuat
      if (logoFile && newOrgId) {
        await OrganizationService.uploadLogo({
            id: newOrgId,
            file: logoFile
        });
      }

      // 3. Sukses! Refresh data, tutup dialog, reset form
      await queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      alert("Organization created successfully!");
      resetForm();
      onOpenChange(false);

    } catch (error) {
      console.error("Failed to create:", error);
      alert("Failed to create organization. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form saat dialog ditutup manual (opsional, biar pas buka lagi bersih)
  const handleClose = (val) => {
      if (!val) resetForm();
      onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Logo Upload Section */}
            <div className="flex flex-col items-center gap-4 mb-4">
                <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative group hover:border-blue-500 transition-colors">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full w-full object-contain" />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <Upload className="h-8 w-8 mb-1" />
                            <span className="text-[10px]">Upload Logo</span>
                        </div>
                    )}
                    
                    {/* Overlay Click */}
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-medium">Choose File</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>

                {logoFile && (
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => { setLogoFile(null); setPreviewUrl(null); }} 
                        className="text-red-500 h-6 text-xs"
                    >
                        <X className="h-3 w-3 mr-1" /> Remove Logo
                    </Button>
                )}
            </div>

            {/* Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Organization Name <span className="text-red-500">*</span></Label>
                <Input 
                    id="name" 
                    placeholder="e.g. Google Indonesia"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                />
            </div>

            {/* Type */}
            <div className="grid gap-2">
                <Label>Type <span className="text-red-500">*</span></Label>
                <Select 
                    value={formData.type} 
                    onValueChange={(val) => setFormData({...formData, type: val})}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea 
                    id="desc" 
                    placeholder="Short description about the organization..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Organization
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};