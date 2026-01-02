import React, { useState, useEffect } from "react";
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
import { Loader2, Upload, X } from "lucide-react";
import OrganizationService from "@/services/corporate/OrganizationService";
import { useQueryClient } from "@tanstack/react-query";

export const EditOrganizationDialog = ({ open, onOpenChange, organization }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  
  // File State
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Helper URL Gambar
  const getLogoUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `http://localhost:8000/storage/${path.startsWith('/') ? path.slice(1) : path}`;
  };

  // Reset form setiap kali dialog dibuka/data berubah
  useEffect(() => {
    if (open && organization) {
      setFormData({
        name: organization.name || "",
        type: organization.type || "company",
        description: organization.description || "",
      });
      setPreviewUrl(getLogoUrl(organization.logo));
      setLogoFile(null); // Reset file baru
    }
  }, [open, organization]);

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview lokal
    }
  };

  // Handle Submit (2 Langkah: Update Text -> Upload Logo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Update Data Text dulu (PUT)
      await OrganizationService.updateOrganization({
        id: organization.id,
        data: formData
      });

      // 2. Kalau ada file baru, Upload Logo (POST)
      if (logoFile) {
        await OrganizationService.uploadLogo({
            id: organization.id,
            file: logoFile
        });
      }

      // 3. Refresh Data & Tutup
      await queryClient.invalidateQueries({ queryKey: ["admin-organizations"] });
      onOpenChange(false);
      alert("Organization updated successfully!");

    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update organization.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Logo Upload Section */}
            <div className="flex flex-col items-center gap-4 mb-4">
                <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative group">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full w-full object-contain" />
                    ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                    )}
                    
                    {/* Overlay Click */}
                    <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-medium">Change Logo</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>
                {logoFile && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setLogoFile(null); setPreviewUrl(getLogoUrl(organization.logo)); }} className="text-red-500 h-6">
                        Cancel Change
                    </Button>
                )}
            </div>

            {/* Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                />
            </div>

            {/* Type */}
            <div className="grid gap-2">
                <Label>Type</Label>
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
                    Save Changes
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};