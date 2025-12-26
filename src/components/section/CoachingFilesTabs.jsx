import React, { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Image as ImageIcon, File, Trash2, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoachingFilesSkeleton } from "../skeleton/CoachingFilesSkeleton";

// Tambah prop isMentor
export const CoachingFilesTab = ({ sessionId, isMentor = false }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null); // Ref untuk trigger input file tersembunyi

  // 1. Fetch Files
  const { data: result, isLoading } = useQuery({
    queryKey: ["coaching-files", sessionId],
    queryFn: () => MentoringService.getCoachingFiles(sessionId),
  });

  const files = result?.data?.files || [];
  const total = result?.data?.total || 0;

  // 2. Mutation Upload
  const uploadMutation = useMutation({
    mutationFn: (file) => MentoringService.uploadCoachingFile(sessionId, file),
    onSuccess: () => {
      queryClient.invalidateQueries(["coaching-files", sessionId]);
      alert("File berhasil diunggah!");
      // Reset input value biar bisa upload file yg sama kalau mau
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    },
    onError: (error) => {
      console.error(error);
      alert("Gagal mengunggah file.");
    }
  });

  // 3. Mutation Delete
  const deleteMutation = useMutation({
    mutationFn: (fileId) => MentoringService.deleteCoachingFile(sessionId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries(["coaching-files", sessionId]);
      alert("File berhasil dihapus.");
    },
    onError: (error) => {
        console.error(error);
        alert("Gagal menghapus file.");
    }
  });

  // Handlers
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger klik pada input file yg hidden
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran atau tipe file bisa disini jika perlu
      uploadMutation.mutate(file);
    }
  };

  const handleDelete = (fileId) => {
    if (window.confirm("Yakin ingin menghapus file ini?")) {
        deleteMutation.mutate(fileId);
    }
  };

  // Helper Icon
  const getFileIcon = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("pdf")) return <FileText className="h-6 w-6 text-red-500" />;
    if (t.includes("jpg") || t.includes("jpeg") || t.includes("png") || t.includes("image")) return <ImageIcon className="h-6 w-6 text-purple-500" />;
    if (t.includes("doc") || t.includes("word")) return <FileText className="h-6 w-6 text-blue-500" />;
    return <File className="h-6 w-6 text-neutral-500" />;
  };

  if (isLoading) return <CoachingFilesSkeleton  />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Coaching Files ({total})</CardTitle>
            <CardDescription>Dokumen dan materi pendukung dari sesi ini.</CardDescription>
        </div>
        
        {/* BUTTON UPLOAD KHUSUS MENTOR */}
        {isMentor && (
            <div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange} 
                />
                <Button 
                    size="sm" 
                    onClick={handleUploadClick} 
                    disabled={uploadMutation.isPending}
                    className="bg-primary hover:bg-primary/80"
                >
                    {uploadMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Upload className="h-4 w-4 mr-2" />
                    )}
                    Upload File
                </Button>
            </div>
        )}
      </CardHeader>

      <CardContent>
        {files.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-10 text-neutral-500 border-2 border-dashed rounded-xl bg-neutral-50">
             <File className="h-10 w-10 mb-2 opacity-20" />
             <p className="text-sm">Belum ada file yang diunggah.</p>
           </div>
        ) : (
          <div className="grid gap-3">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="flex items-center justify-between p-4 border rounded-xl bg-white hover:bg-neutral-50 hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  {/* Icon Container */}
                  <div className="bg-neutral-100 p-2.5 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                    {getFileIcon(file.file_type)}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate" title={file.file_name}>
                         {file.file_name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="uppercase bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider">
                            {file.file_type || "FILE"}
                        </span>
                        {/* Kalau mau nampilin tanggal upload bisa disini */}
                      </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-neutral-400 hover:text-primary hover:bg-blue-50"
                      onClick={() => window.open(file.file_url, '_blank')}
                      title="Download"
                    >
                       <Download className="h-5 w-5" />
                    </Button>

                    {/* DELETE BUTTON KHUSUS MENTOR */}
                    {isMentor && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-neutral-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(file.id)}
                            disabled={deleteMutation.isPending}
                            title="Hapus File"
                        >
                           {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-5 w-5" />}
                        </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};