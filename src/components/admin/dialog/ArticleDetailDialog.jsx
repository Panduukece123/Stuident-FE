import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; 

export const ArticleDetailDialog = ({ open, onOpenChange, article }) => {

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- FUNGSI BARU: Get Image URL ---
  const getImageUrl = (path) => {
    if (!path) return null;
    
    // 1. Kalau link dari Seeder/Internet (ada http/https), pakai langsung
    if (path.startsWith("http") || path.startsWith("https")) {
        return path;
    }

    // 2. Kalau hasil Upload (path lokal), tempel Base URL Backend
    // GANTI 'http://localhost:8000' dengan alamat backend Laravel kamu kalau beda
    // Pastikan path upload kamu perlu '/storage/' atau tidak, sesuaikan di sini
    const baseUrl = "http://localhost:8000/storage/"; 
    
    // Hapus slash di awal path kalau ada biar gak dobel (//)
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw]! h-[90vh] p-0 overflow-hidden border-none block focus:outline-none [&>button]:text-white [&>button]:z-50 [&>button]:bg-black/20 hover:[&>button]:bg-black/40">
        
        <DialogTitle className="sr-only">Article Detail</DialogTitle>
        <DialogDescription className="sr-only">
          Detail content for article {article?.title}
        </DialogDescription>

        {!article ? (
           <div className="h-full w-full bg-white flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                 <p className="text-gray-400">Loading details...</p>
              </div>
           </div>
        ) : (
          <div className="h-full overflow-y-auto bg-gray-50/50 pb-20 relative custom-scrollbar">
            
            {/* --- HEADER IMAGE --- */}
            <div className="w-full h-[300px] md:h-[400px] relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
              
              {/* Panggil fungsi getImageUrl di sini */}
              {article.image || article.image_url ? (
                 <img
                 src={getImageUrl(article.image || article.image_url)} 
                 alt={article.title}
                 className="w-full h-full object-cover"
                 onError={(e) => {
                    // Fallback kalau gambar broken/gagal load
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex';
                 }}
               />
              ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <ImageIcon className="text-white/20 h-20 w-20"/>
                  </div>
              )}
              
              {/* Element Fallback (disembunyikan default, muncul kalau img error) */}
              <div className="hidden w-full h-full bg-gray-800 items-center justify-center absolute top-0 left-0 -z-10">
                  <ImageIcon className="text-white/20 h-20 w-20"/>
              </div>

            </div>

            {/* --- CONTENT CARD --- */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-12 min-h-[400px]">
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {article.category || "General"}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author || "Admin"}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {article.title}
                </h1>

                {/* Body Content */}
                <div className="article-content">
                  <ReactMarkdown>
                    {article.content || article.description || "No content available."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};