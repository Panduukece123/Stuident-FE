import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Edit2, X, CheckCircle } from "lucide-react";
import { NeedAssessmentSkeleton } from "../skeleton/NeedAssessmentSkeleton";

export const NeedAssessmentTab = ({ sessionId, isMentor = false }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    goals: "",
    current_situation: "",
    expectations: "",
    challenges: "",
  });

  const { data: result, isLoading } = useQuery({
    queryKey: ["need-assessment", sessionId],
    queryFn: () => MentoringService.getNeedAssessment(sessionId),
  });
  
  const assessmentData = result?.data;

  useEffect(() => {
    if (assessmentData?.form_data) {
      setFormData({
        ...assessmentData.form_data,
        challenges: Array.isArray(assessmentData.form_data.challenges) 
          ? assessmentData.form_data.challenges.join(", ") 
          : assessmentData.form_data.challenges
      });
    }
  }, [assessmentData]);

  // --- MUTATIONS ---
  const saveMutation = useMutation({
    mutationFn: (data) => {
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

  const completeMutation = useMutation({
    mutationFn: () => MentoringService.markAssessmentCompleted(sessionId),
    onSuccess: () => {
        queryClient.invalidateQueries(["need-assessment", sessionId]);
        alert("Assessment ditandai selesai.");
    }
  });

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (isLoading) return <NeedAssessmentSkeleton />;

  const isFormMode = !isMentor && (isEditing || !assessmentData);
  const isCompleted = assessmentData?.status === "completed";
  const readOnlyClass = "disabled:opacity-100 disabled:cursor-default disabled:bg-white text-neutral-900 border-neutral-300";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle>Need Assessment</CardTitle>
            {isCompleted && <Badge className="bg-green-600">Completed</Badge>}
          </div>
          <CardDescription>Evaluasi kebutuhan mentoring Anda.</CardDescription>
        </div>
        
        {!isMentor && !isFormMode && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled={isCompleted}>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => {
                if(window.confirm("Yakin hapus data ini?")) deleteMutation.mutate();
            }} disabled={isCompleted}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!isMentor && isEditing && assessmentData && (
             <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" /> Batal
             </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmitStudent} className="space-y-4">
          <div className="space-y-1">
            <Label>Situasi Saat Ini</Label>
            <Textarea 
              disabled={isMentor || !isFormMode}
              value={formData.current_situation}
              onChange={(e) => setFormData({...formData, current_situation: e.target.value})}
              placeholder="Contoh: Mahasiswa semester 5 bingung arah karir..."
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Tujuan (Goals)</Label>
            <Input 
              disabled={isMentor || !isFormMode}
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="Contoh: Ingin menjadi Backend Developer..."
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Tantangan</Label>
            <Input 
              disabled={isMentor || !isFormMode}
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              placeholder="Contoh: Kurang pengalaman, Tidak bisa manajemen waktu"
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Ekspektasi Mentoring</Label>
            <Textarea 
              disabled={isMentor || !isFormMode}
              value={formData.expectations}
              onChange={(e) => setFormData({...formData, expectations: e.target.value})}
              placeholder="Contoh: Mendapat panduan roadmap belajar..."
              className={readOnlyClass}
            />
          </div>

          {!isMentor && isFormMode && (
            <div className="pt-4">
               <Button type="submit" disabled={saveMutation.isPending} className="bg-[#074799]">
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Assessment
               </Button>
            </div>
          )}
        </form>

        {/* --- AREA MENTOR: HANYA TOMBOL COMPLETE --- */}
        {isMentor && (
            <>
                <Separator className="my-4" />
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                     <div className="text-sm text-slate-500">
                        {isCompleted 
                            ? "Assessment ini telah ditandai selesai." 
                            : "Jika assessment student sudah sesuai, tandai sebagai selesai."}
                    </div>
                    <Button 
                        onClick={() => completeMutation.mutate()}
                        disabled={completeMutation.isPending || isCompleted}
                        className={isCompleted ? "bg-green-600" : ""}
                        size="sm"
                    >
                        {completeMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {isCompleted ? "Assessment Selesai" : "Tandai Selesai"}
                    </Button>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
};