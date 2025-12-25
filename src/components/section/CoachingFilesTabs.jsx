import React from "react";
import { useQuery } from "@tanstack/react-query";
import MentoringService from "@/services/MentoringService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Image as ImageIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoachingFilesSkeleton } from "../skeleton/CoachingFilesSkeleton";

export const CoachingFilesTab = ({ sessionId }) => {
  const { data: result, isLoading } = useQuery({
    queryKey: ["coaching-files", sessionId],
    queryFn: () => MentoringService.getCoachingFiles(sessionId),
  });

  const files = result?.data?.files || [];
  const total = result?.data?.total || 0;

  // Helper untuk menentukan Icon berdasarkan tipe file
  const getFileIcon = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("pdf")) {
      return <FileText className="h-6 w-6 text-red-500" />;
    }
    if (t.includes("jpg") || t.includes("jpeg") || t.includes("png") || t.includes("image")) {
      return <ImageIcon className="h-6 w-6 text-purple-500" />;
    }
    if (t.includes("doc") || t.includes("word")) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    }
    return <File className="h-6 w-6 text-neutral-500" />;
  };

  // Helper Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <CoachingFilesSkeleton  />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coaching Files ({total})</CardTitle>
        <CardDescription>Dokumen dan materi pendukung dari sesi ini.</CardDescription>
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
                <div className="flex items-center gap-4">
                  {/* Icon Container */}
                  <div className="bg-neutral-100 p-2.5 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                    {getFileIcon(file.file_type)}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex flex-col gap-0.5">
                     <p className="text-sm font-medium text-neutral-800 line-clamp-1 break-all">
                        {file.file_name}
                     </p>
                     <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="uppercase bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider">
                            {file.file_type}
                        </span>
                     </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-neutral-400 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open(file.file_url, '_blank')}
                >
                   <Download className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};