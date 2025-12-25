import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Trash2, Edit2, X } from "lucide-react";
import { NeedAssessmentSkeleton } from "../skeleton/NeedAssessmentSkeleton";

export const NeedAssessmentTab = ({ sessionId }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState({
    goals: "",
    current_situation: "",
    expectations: "",
    challenges: "", // Kita handle sebagai string comma-separated dulu di UI
  });

  // 1. Fetch Data
  const { data: result, isLoading } = useQuery({
    queryKey: ["need-assessment", sessionId],
    queryFn: () => MentoringService.getNeedAssessment(sessionId),
  });
  
  const assessmentData = result?.data; // Data dari API

  // Effect untuk isi form saat data di-load
  useEffect(() => {
    if (assessmentData?.form_data) {
      setFormData({
        ...assessmentData.form_data,
        // Convert array challenges ke string biar bisa diedit di input
        challenges: Array.isArray(assessmentData.form_data.challenges) 
          ? assessmentData.form_data.challenges.join(", ") 
          : assessmentData.form_data.challenges
      });
    }
  }, [assessmentData]);

  // 2. Mutations (Create/Update/Delete)
  const saveMutation = useMutation({
    mutationFn: (data) => {
      // Convert string challenges balik ke array
      const payload = {
        ...data,
        challenges: data.challenges.split(",").map(item => item.trim()).filter(i => i)
      };

      if (assessmentData) {
        return MentoringService.updateNeedAssessment(sessionId, payload);
      } else {
        return MentoringService.createNeedAssessment(sessionId, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["need-assessment", sessionId]);
      setIsEditing(false);
      alert("Need Assessment berhasil disimpan!");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => MentoringService.deleteNeedAssessment(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries(["need-assessment", sessionId]);
      setFormData({ goals: "", current_situation: "", expectations: "", challenges: "" });
      alert("Need Assessment dihapus.");
    }
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (isLoading) return <NeedAssessmentSkeleton />;

  // --- RENDER ---
  const isFormMode = isEditing || !assessmentData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Need Assessment</CardTitle>
          <CardDescription>Evaluasi kebutuhan mentoring Anda.</CardDescription>
        </div>
        
        {/* Tombol Action (Edit/Delete/Cancel) */}
        {!isFormMode && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => {
                if(window.confirm("Yakin hapus data ini?")) deleteMutation.mutate();
            }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        {isEditing && assessmentData && (
             <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" /> Batal
             </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <Label>Situasi Saat Ini</Label>
            <Textarea 
              disabled={!isFormMode}
              value={formData.current_situation}
              onChange={(e) => setFormData({...formData, current_situation: e.target.value})}
              placeholder="Contoh: Mahasiswa semester 5 bingung arah karir..."
            />
          </div>

          <div className="space-y-1">
            <Label>Tujuan (Goals)</Label>
            <Input 
              disabled={!isFormMode}
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="Contoh: Ingin menjadi Backend Developer..."
            />
          </div>

          <div className="space-y-1">
            <Label>Tantangan (Pisahkan dengan koma)</Label>
            <Input 
              disabled={!isFormMode}
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              placeholder="Contoh: Kurang pengalaman, Tidak bisa manajemen waktu"
            />
          </div>

          <div className="space-y-1">
            <Label>Ekspektasi Mentoring</Label>
            <Textarea 
              disabled={!isFormMode}
              value={formData.expectations}
              onChange={(e) => setFormData({...formData, expectations: e.target.value})}
              placeholder="Contoh: Mendapat panduan roadmap belajar..."
            />
          </div>

          {isFormMode && (
            <div className="pt-4">
               <Button type="submit" disabled={saveMutation.isPending} className="bg-[#074799]">
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Assessment
               </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};