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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const CreateUserDialog = ({ 
  open, 
  onOpenChange, 
  userToEdit, 
  onSave, 
  isLoading 
}) => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student", // Default pakai huruf kecil
    password: "",
  });

  useEffect(() => {
    if (open) {
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          role: userToEdit.role, // Pastikan dari backend juga lowercase
          password: "",
        });
      } else {
        setFormData({
          name: "",
          email: "",
          role: "student", // Default saat create baru
          password: "",
        });
      }
    }
  }, [open, userToEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Copy data agar state asli tidak terganggu
    const payload = { ...formData };

    // --- 1. Handling Password Confirmation ---
    // Laravel biasanya butuh 'password_confirmation' saat create user
    if (!userToEdit) {
        // Mode Create: Copy password ke confirmation
        payload.password_confirmation = formData.password;
    } else {
        // Mode Edit:
        if (!payload.password) {
            // Jika kosong, hapus field agar backend tidak mengupdate password
            delete payload.password;
        } else {
            // Jika diisi, sertakan konfirmasi
            payload.password_confirmation = formData.password;
        }
    }

    // --- 2. Final Check Role ---
    // Pastikan role dikirim sebagai lowercase (jaga-jaga)
    if (payload.role) {
        payload.role = payload.role.toLowerCase();
    }

    console.log("Payload Final:", payload); // Cek console untuk memastikan
    onSave(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{userToEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {userToEdit
              ? "Make changes to the user profile here."
              : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Input Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
                placeholder="John Doe"
              />
            </div>

            {/* Input Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
                placeholder="john@example.com"
              />
            </div>

            {/* Input Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Password</Label>
              <div className="col-span-3 space-y-1">
                <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={userToEdit ? "Leave blank to keep current" : "Min. 8 characters"}
                    required={!userToEdit} 
                />
              </div>
            </div>

            {/* Select Role - VALUES SUDAH DIPERBAIKI KE LOWERCASE */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <div className="col-span-3">
                <Select 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="w-full" id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Value harus lowercase sesuai request backend */}
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
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
              {userToEdit ? "Save Changes" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};