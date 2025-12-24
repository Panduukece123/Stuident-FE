import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Loader2 } from "lucide-react";
import ProfileService from "@/services/ProfileService";

export const EditSpecializationDialog = ({ open, onOpenChange, initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  // State untuk menampung list skill (Array of Strings)
  const [skills, setSkills] = useState([]);
  
  // State untuk input text saat ini
  const [currentInput, setCurrentInput] = useState("");

  // Load data awal saat dialog dibuka
  useEffect(() => {
    if (open) {
      setSkills(Array.isArray(initialData) ? initialData : []);
      setCurrentInput(""); 
    }
  }, [open, initialData]);

  // Handler: Tambah skill
  const handleAddSkill = () => {
    const trimmedInput = currentInput.trim();
    if (!trimmedInput) return; 

    // Cek duplikat
    if (skills.includes(trimmedInput)) {
      setCurrentInput(""); 
      return;
    }
    
    setSkills([...skills, trimmedInput]);
    setCurrentInput(""); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleAddSkill();
    }
  };

  // Handler: Hapus skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handler: Simpan ke Backend
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Kirim array string ke service
      await ProfileService.updateSpecializations(skills);
      
      onSuccess(); // Refresh data profile
      onOpenChange(false); // Tutup dialog
    } catch (error) {
      console.error("Gagal update specialization:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Specialization</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ketik keahlian (contoh: React JS) lalu tekan Enter"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <Button size="icon" onClick={handleAddSkill} disabled={!currentInput.trim() || loading}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 p-4 border rounded-md min-h-[100px] bg-neutral-50 content-start">
            {skills.length === 0 && (
              <span className="text-sm text-neutral-400 w-full text-center mt-2">
                Belum ada spesialisasi yang ditambahkan.
              </span>
            )}
            
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="pl-3 pr-1 py-1 text-sm flex items-center gap-1 bg-white border border-neutral-200 hover:bg-neutral-100"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  disabled={loading}
                  className="p-1 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};