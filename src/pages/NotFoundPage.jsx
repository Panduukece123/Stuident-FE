import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button"; 
import { FileQuestion, Home, MoveLeft } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    // PERUBAHAN: Pakai 'h-screen' supaya pas satu layar penuh tanpa scroll
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center overflow-hidden">
      
      {/* --- ILUSTRASI / ICON --- */}
      <div className="relative mb-6 md:mb-8 group">
        <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75 group-hover:scale-110 transition-transform duration-500" />
        <FileQuestion className="relative z-10 w-24 h-24 md:w-32 md:h-32 text-primary mx-auto animate-bounce duration-[3000ms]" />
      </div>

      {/* --- TEKS UTAMA --- */}
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-2 tracking-tighter">
        404
      </h1>
      <h2 className="text-xl md:text-3xl font-semibold text-foreground mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 md:mb-10 text-sm md:text-base">
        Waduh, sepertinya Anda tersesat. Halaman yang Anda cari mungkin telah dihapus atau link-nya salah.
      </p>

      {/* --- TOMBOL AKSI --- */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center w-full max-w-xs sm:max-w-none">
        
        <Button 
          variant="outline" 
          size="default"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto min-w-[140px] gap-2 border-primary/20 hover:bg-primary/5 cursor-pointer"
        >
          <MoveLeft className="w-4 h-4" />
          Kembali
        </Button>

        <Link to="/" className="w-full sm:w-auto">
          <Button 
            size="default" 
            className="w-full sm:w-auto min-w-[140px] gap-2 shadow-lg shadow-primary/20 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Button>
        </Link>
      </div>

    </div>
  );
};