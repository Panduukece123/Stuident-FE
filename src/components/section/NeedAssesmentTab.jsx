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
import { Loader2, Trash2, Edit2, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
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

  // --- LOGIC STATUS BERDASARKAN JSON API ---
  // API return: "is_completed": true/false
  const isCompleted = assessmentData?.is_completed === true;

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

  // --- MUTATION UPDATE (Ganti bagian completeMutation saja) ---
  const completeMutation = useMutation({
    mutationFn: () => MentoringService.markAssessmentCompleted(sessionId),
    onSuccess: async () => {
        // Kita pakai await agar alert muncul SETELAH request refresh terkirim
        await queryClient.invalidateQueries({ 
            queryKey: ["need-assessment", sessionId] 
        });
        
        alert("Assessment ditandai selesai.");
    }
  });

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (isLoading) return <NeedAssessmentSkeleton />;

  // Kondisi form read-only: Jika mentor, atau jika student sedang tidak edit, atau jika SUDAH COMPLETE
  const isFormMode = !isMentor && (isEditing || !assessmentData);
  const isReadOnly = isMentor || !isFormMode || isCompleted;
  
  const readOnlyClass = "disabled:opacity-100 disabled:cursor-default disabled:bg-white text-neutral-900 border-neutral-300";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle>Need Assessment</CardTitle>
            {/* BADGE STATUS DI HEADER */}
            {isCompleted ? (
                <Badge className="bg-green-600 hover:bg-green-700 gap-1">
                    <CheckCircle className="w-3 h-3" /> Selesai
                </Badge>
            ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600 gap-1">
                    <Clock className="w-3 h-3" /> Dalam Proses
                </Badge>
            )}
          </div>
          <CardDescription>Evaluasi kebutuhan mentoring.</CardDescription>
        </div>
        
        {/* TOMBOL EDIT/DELETE UTK STUDENT (Hanya jika belum complete) */}
        {!isMentor && !isFormMode && !isCompleted && (
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
        {!isMentor && isEditing && assessmentData && (
             <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" /> Batal
             </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* --- STATUS BANNER UNTUK STUDENT & MENTOR (JIKA COMPLETE) --- */}
        {isCompleted && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                    <p className="font-semibold text-sm">Assessment Terverifikasi</p>
                    <p className="text-xs opacity-90">
                        Need Assessment ini telah disetujui dan ditandai selesai oleh Mentor pada {assessmentData.completed_at ? new Date(assessmentData.completed_at).toLocaleDateString("id-ID") : "-"}.
                    </p>
                </div>
            </div>
        )}

        {/* --- STATUS BANNER UNTUK STUDENT (JIKA BELUM COMPLETE) --- */}
        {!isMentor && !isCompleted && assessmentData && (
             <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                    <p className="font-semibold text-sm">Menunggu Review Mentor</p>
                    <p className="text-xs opacity-90">
                        Silakan diskusikan poin-poin di bawah ini saat sesi mentoring berlangsung agar Mentor dapat menyetujuinya.
                    </p>
                </div>
            </div>
        )}

        <form onSubmit={handleSubmitStudent} className="space-y-4">
          <div className="space-y-1">
            <Label>Situasi Saat Ini</Label>
            <Textarea 
              disabled={isReadOnly}
              value={formData.current_situation}
              onChange={(e) => setFormData({...formData, current_situation: e.target.value})}
              placeholder="Contoh: Mahasiswa semester 5 bingung arah karir..."
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Tujuan (Goals)</Label>
            <Input 
              disabled={isReadOnly}
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="Contoh: Ingin menjadi Backend Developer..."
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Tantangan</Label>
            <Input 
              disabled={isReadOnly}
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              placeholder="Contoh: Kurang pengalaman, Tidak bisa manajemen waktu"
              className={readOnlyClass}
            />
          </div>
          <div className="space-y-1">
            <Label>Ekspektasi Mentoring</Label>
            <Textarea 
              disabled={isReadOnly}
              value={formData.expectations}
              onChange={(e) => setFormData({...formData, expectations: e.target.value})}
              placeholder="Contoh: Mendapat panduan roadmap belajar..."
              className={readOnlyClass}
            />
          </div>

          {/* Tombol Simpan hanya utk Student yg sedang Edit dan belum Complete */}
          {!isMentor && isFormMode && !isCompleted && (
            <div className="pt-4">
               <Button type="submit" disabled={saveMutation.isPending} className="bg-[#074799]">
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Assessment
               </Button>
            </div>
          )}
        </form>

        {/* --- AREA MENTOR --- */}
        {isMentor && (
            <>
                <Separator className="my-4" />
                {/* JIKA BELUM COMPLETE: TAMPILKAN TOMBOL */}
                {!isCompleted ? (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-blue-700">
                            <p className="font-semibold">Action Required:</p>
                            <p>Review isian student di atas. Jika sudah sesuai, tandai sebagai selesai.</p>
                        </div>
                        <Button 
                            onClick={() => completeMutation.mutate()}
                            disabled={completeMutation.isPending}
                            className="bg-[#074799] hover:bg-[#053575] text-white shrink-0"
                            size="sm"
                        >
                            {completeMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Tandai Selesai
                        </Button>
                    </div>
                ) : (
                    // JIKA SUDAH COMPLETE: TAMPILKAN TEXT SAJA
                    <div className="w-full text-center py-2 text-sm text-neutral-500 italic">
                        — Anda telah menyetujui assessment ini —
                    </div>
                )}
            </>
        )}
      </CardContent>
    </Card>
  );
};