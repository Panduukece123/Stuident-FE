import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import ProfileService from "@/services/ProfileService";

export const EditBioDialog = ({
  open,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (open) setBio(initialData || "");
  }, [open, initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Kita cuma kirim field 'bio', backend laravel biasanya update partial
      await ProfileService.updateProfile({ bio: bio });
      onSuccess(); // Refresh data parent
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
          <DialogTitle>Edit Biography</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Biography</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan tentang dirimu..."
              className="h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
