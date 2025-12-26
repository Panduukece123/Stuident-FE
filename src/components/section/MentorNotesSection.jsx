import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Save, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";

export const MentorNotesSection = ({ session, isMentor }) => {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState("");

  // UPDATE: Ambil dari session.notes (sesuai JSON API)
  useEffect(() => {
    if (session?.notes) {
      setNotes(session.notes);
    }
  }, [session]);

  const mutation = useMutation({
    mutationFn: (newNotes) => MentoringService.updateMentorNotes(session.id, newNotes),
    onSuccess: () => {
      queryClient.invalidateQueries(["session-detail", session.session_id]); // Pake ID atau session_id sesuai queryKey di induk
      alert("Catatan mentor berhasil disimpan");
    },
    onError: (err) => {
        console.error(err);
        alert("Gagal menyimpan catatan.");
    }
  });

  const handleSave = () => {
    mutation.mutate(notes);
  };

  // KONDISI 1: STUDENT VIEW (Read Only)
  if (!isMentor) {
     // UPDATE: Cek session.notes
     if (!session.notes) return null; 

     return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-black">
                    <MessageSquare className="w-4 h-4" /> Catatan Mentor
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
                    {/* UPDATE: Tampilkan session.notes */}
                    {session.notes}
                </p>
            </CardContent>
        </Card>
     );
  }

  // KONDISI 2: MENTOR VIEW (Editable)
  return (
    <Card className="bg-white">
        <CardHeader >
             <CardTitle className="text-base text-black flex items-center gap-2">
                <MessageSquare className="w-4 h-4"/> Area Catatan Mentor
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
            <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis catatan, feedback, atau rencana materi untuk sesi ini..."
                rows={5}
                className="bg-white resize-none min-h-[120px]"
            />
            <div className="flex justify-end">
                <Button 
                    size="sm" 
                    onClick={handleSave} 
                    disabled={mutation.isPending}
                    className="bg-primary hover:bg-primary/90 text-white"
                >
                    {mutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    Simpan Catatan
                </Button>
            </div>
        </CardContent>
    </Card>
  );
};