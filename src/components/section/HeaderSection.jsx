import * as React from "react";
import { BookOpenCheck, Users, Award, MonitorPlay } from "lucide-react"; 

export function Header() {
  const features = [
    {
      icon: <BookOpenCheck className="h-6 w-6 text-blue-600" />,
      // Warna Border & Background Icon (Biru)
      borderColor: "border-blue-200", 
      iconBg: "bg-blue-50",
      title: "Kurikulum Terstruktur",
      desc: "Materi disusun bertahap dari dasar hingga mahir, sesuai standar industri terkini.",
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      // Warna Border & Background Icon (Hijau)
      borderColor: "border-green-200",
      iconBg: "bg-green-50",
      title: "Mentoring Eksklusif",
      desc: "Bimbingan langsung dari praktisi ahli yang siap membantu kesulitan belajarmu.",
    },
    {
      icon: <MonitorPlay className="h-6 w-6 text-purple-600" />,
      // Warna Border & Background Icon (Ungu)
      borderColor: "border-purple-200",
      iconBg: "bg-purple-50",
      title: "Akses Seumur Hidup",
      desc: "Bebas akses materi video dan modul pembelajaran kapan saja dan di mana saja.",
    },
    {
      icon: <Award className="h-6 w-6 text-orange-600" />,
      // Warna Border & Background Icon (Orange)
      borderColor: "border-orange-200",
      iconBg: "bg-orange-50",
      title: "Sertifikat Kompetensi",
      desc: "Dapatkan sertifikat resmi sebagai bukti keahlian untuk menunjang karirmu.",
    },
  ];

  return (
    <div className="w-full px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* --- GRID KEUNGGULAN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              // Style Utama:
              // 1. bg-white: Background putih bersih
              // 2. border-2: Garis pinggir agak tebal (2px) biar warnanya kelihatan
              // 3. ${item.borderColor}: Warna garis dinamis sesuai data di atas
              // 4. rounded-2xl: Sudut melengkung
              // 5. h-full: Tinggi rata
              className={`flex flex-col items-start p-6 bg-white border-2 ${item.borderColor} rounded-2xl h-full`}
            >
              
              {/* Icon Container: Warnanya matching sama border */}
              <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${item.iconBg} mb-4`}>
                {item.icon}
              </div>

              {/* Judul */}
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              {/* Deskripsi */}
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}