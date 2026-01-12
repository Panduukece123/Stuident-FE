import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; 
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";
import BgInfo from "../../assets/images/bg-trainer.svg";
import MentoringService from "../../services/MentoringService";

export const Trainer = () => {
  const { data: result, isLoading, isError } = useQuery({
    queryKey: ["mentors"], 
    queryFn: MentoringService.getAllmentor,
  });

  // Ambil array dari property 'data' sesuai struktur JSON kamu
  const mentors = result?.data || [];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <Card
        className={"p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 relative overflow-hidden"}
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* BAGIAN TEKS */}
          <div className="w-full lg:w-1/5 flex flex-col gap-3 lg:gap-5 text-center shrink-0">
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              Belajar Langsung dari Mentor Berpengalaman
            </h1>
            <p className="text-sm md:text-base text-justify text-white">
              Materi kami disusun dan dibawakan oleh para senior-level di
              bidangnya yang aktif bekerja di perusahaan teknologi terdepan.
            </p>
          </div>

          {/* BAGIAN LIST TRAINER */}
          <div className="w-full lg:flex-1 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 min-w-max">
              
              {/* LOADING STATE */}
              {isLoading && (
                <div className="w-full text-white text-center py-10">Loading Data...</div>
              )}

              {/* MAPPING DATA */}
              {!isLoading && !isError && mentors.slice(0, 10).map((mentor, index) => (
                <Card
                  key={mentor.id || index}
                  className="w-52 shrink-0 bg-white overflow-hidden"
                >
                  <CardContent className="text-center px-3">
                    <img
                      // PERBAIKAN: Menggunakan field 'profile_photo'
                      src={mentor.profile_photo || "https://placehold.co/300x400"} 
                      alt={mentor.name}
                      className="object-cover mb-2 rounded h-40 w-full"
                    />
                    <h3 className="font-semibold text-lg truncate">{mentor.name}</h3>
                    
                    {/* PERBAIKAN: Mapping data Pendidikan & Jurusan */}
                    <p className="text-xs text-muted-foreground truncate">
                      {mentor.education_level ? `${mentor.education_level} ` : ""} 
                      {mentor.major || "Mentor"} 
                    </p>

                    {/* PERBAIKAN: Mapping Institusi/Tempat Kerja */}
                    <p className="text-sm font-medium text-slate-700 truncate mt-1">
                      {mentor.institution || "Expert"}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* KARTU LIHAT SELENGKAPNYA */}
              <Link to="/my-mentor" className="w-52 shrink-0 flex items-stretch text-decoration-none">
                  <div className="w-full h-full bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 gap-3 transition-colors cursor-pointer group text-white">
                    <div className="p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-8 h-8" />
                    </div>
                    <span className="font-semibold text-center">Lihat Selengkapnya</span>
                  </div>
              </Link>

            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};