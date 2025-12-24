import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export const EditUserDialog = ({ 
  open, 
  onOpenChange, 
  userToEdit, 
  onSave, 
  isLoading 
}) => {
  
  // Initial State Kosong
  const initialFormData = {
    // Account
    name: "",
    email: "",
    phone: "",
    role: "student",
    status: "active",
    // Personal
    gender: "",
    birth_date: "",
    address: "",
    bio: "",
    // Academic
    institution: "",
    major: "",
    education_level: "",
    specialization: "", // Kita handle sebagai string comma-separated di form
  };

  const [formData, setFormData] = useState(initialFormData);

  // Effect: Isi form saat dialog dibuka
  useEffect(() => {
    if (open && userToEdit) {
        
      // Helper: Format tanggal "YYYY-MM-DD" untuk input type="date"
      const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        return dateString.split('T')[0];
      };

      // Helper: Handle array specialization menjadi string
      const formatSpecialization = (spec) => {
        if (Array.isArray(spec)) return spec.join(", ");
        return spec || "";
      };

      setFormData({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
        phone: userToEdit.phone || "",
        role: userToEdit.role || "student",
        status: userToEdit.status || "active",
        
        gender: userToEdit.gender || "",
        birth_date: formatDateForInput(userToEdit.birth_date),
        address: userToEdit.address || "",
        bio: userToEdit.bio || "",
        
        institution: userToEdit.institution || "",
        major: userToEdit.major || "",
        education_level: userToEdit.education_level || "",
        specialization: formatSpecialization(userToEdit.specialization),
      });
    } else {
        setFormData(initialFormData);
    }
  }, [open, userToEdit]);

  // Handle Input Text Biasa
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Select (Shadcn)
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Opsional: Ubah specialization kembali jadi array jika backend butuh array
    // const payload = {
    //    ...formData,
    //    specialization: formData.specialization.split(',').map(s => s.trim())
    // }
    
    // Kirim data update
    onSave(formData); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
          <DialogDescription>
            Update detailed information for {userToEdit?.name}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="account" className="w-full">
            
            {/* --- TAB NAVIGATION --- */}
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
            </TabsList>

            {/* --- TAB 1: ACCOUNT INFO --- */}
            <TabsContent value="account" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="08..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select value={formData.role} onValueChange={(val) => handleSelectChange("role", val)}>
                            <SelectTrigger className={"w-full"}><SelectValue placeholder="Select role" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="mentor">Mentor</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="corporate">Corporate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
                            <SelectTrigger className={"w-full"}><SelectValue placeholder="Select status" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </TabsContent>

            {/* --- TAB 2: PERSONAL INFO --- */}
            <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={formData.gender} onValueChange={(val) => handleSelectChange("gender", val)}>
                            <SelectTrigger className={"w-full"}><SelectValue placeholder="Select gender" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="birth_date">Birth Date</Label>
                        <Input id="birth_date" type="date" value={formData.birth_date} onChange={handleChange} />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" value={formData.address} onChange={handleChange} placeholder="Full address..." />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea id="bio" value={formData.bio} onChange={handleChange} className="h-24" placeholder="Short bio..." />
                    </div>
                </div>
            </TabsContent>

            {/* --- TAB 3: ACADEMIC INFO --- */}
            <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="institution">Institution / Company</Label>
                        <Input id="institution" value={formData.institution} onChange={handleChange} placeholder="University or Company name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="major">Major / Department</Label>
                        <Input id="major" value={formData.major} onChange={handleChange} placeholder="Computer Science..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Education Level</Label>
                        <Select value={formData.education_level} onValueChange={(val) => handleSelectChange("education_level", val)}>
                            <SelectTrigger className={"w-full"}><SelectValue placeholder="Select level" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                                <SelectItem value="D3">D3</SelectItem>
                                <SelectItem value="S1">S1</SelectItem>
                                <SelectItem value="S2">S2</SelectItem>
                                <SelectItem value="S3">S3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="specialization">Specialization (Comma separated)</Label>
                        <Input 
                            id="specialization" 
                            value={formData.specialization} 
                            onChange={handleChange} 
                            placeholder="React, Laravel, UI/UX" 
                        />
                        <p className="text-[10px] text-muted-foreground">Example: React, Data Science, Python</p>
                    </div>
                </div>
            </TabsContent>

          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
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