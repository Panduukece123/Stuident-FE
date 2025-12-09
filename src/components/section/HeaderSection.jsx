import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpenCheck, Users, Award, MonitorPlay } from "lucide-react"; // Icon pendukung

export function Header() {
  const features = [
    {
      icon: <BookOpenCheck className="h-8 w-8 text-blue-600 mb-2" />,
      title: "Kurikulum Terstruktur",
      desc: "Materi disusun bertahap dari dasar hingga mahir, sesuai standar industri terkini.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600 mb-2" />,
      title: "Mentoring Eksklusif",
      desc: "Bimbingan langsung dari praktisi ahli yang siap membantu kesulitan belajarmu.",
    },
    {
      icon: <MonitorPlay className="h-8 w-8 text-purple-600 mb-2" />,
      title: "Akses Seumur Hidup",
      desc: "Bebas akses materi video dan modul pembelajaran kapan saja dan di mana saja.",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600 mb-2" />,
      title: "Sertifikat Kompetensi",
      desc: "Dapatkan sertifikat resmi sebagai bukti keahlian untuk menunjang karirmu.",
    },
  ];

  return (
    <div className="w-full px-6">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        

        {/* --- KARTU KEUNGGULAN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((item, index) => (
            <Card 
              key={index} 
              className="border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                {item.icon}
                <CardTitle className="text-xl font-bold text-slate-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}