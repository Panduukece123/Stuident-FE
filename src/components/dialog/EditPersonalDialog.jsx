import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import ProfileService from "@/services/ProfileService";

// 1. IMPORT SELECT DARI SHADCN
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditPersonalDialog = ({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    birth_date: "",
  });

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        gender: initialData.gender || "", // Pastikan value-nya 'male' atau 'female' (lowercase)
        birth_date: initialData.birth_date || "",
      });
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await ProfileService.updateProfile(formData);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Personal Info</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* NAMA */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* PHONE */}
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* GENDER (DIGANTI JADI SELECT) */}
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="grid gap-2">
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {/* BIRTH DATE */}
          <div className="grid gap-2">
            <Label>Birth Date</Label>
            <Input
              type="date"
              value={formData.birth_date}
              onChange={(e) =>
                setFormData({ ...formData, birth_date: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
