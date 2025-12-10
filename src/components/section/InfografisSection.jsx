import React from "react";
import { Card, CardContent } from "../ui/card";
import BgInfo from "../../assets/images/bg-infografis.svg";
import { Briefcase, GraduationCap, Users2 } from "lucide-react";

export const Infografis = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Card
        className={"p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10 relative overflow-hidden"}
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        {/* Background Image (Tetap sama) */}
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />

        {/* Wrapper Konten Utama */}
        {/* Sama seperti Card, kita ubah arah flex-nya di sini juga */}
        <div className="relative z-10 w-full flex flex-col gap-8 lg:gap-10 items-start">
          
          {/* BAGIAN KIRI: TEKS */}
          {/* Mobile: w-full (100%), Laptop: w-1/3 (33%) */}
          <div className="w-full flex flex-col gap-4 lg:gap-5 text-center">
            <h1 className="text-xl md:text-2xl font-semibold text-white text-center">
              STUIDENT (Synergy Development Unit of International Student)
            </h1>
            <div className="mx-auto h-1 w-132 rounded-full bg-white" />
            <p className="text-base text-white/90 leading-relaxed">
              Stuident adalah platform terintegrasi untuk manajemen beasiswa,
              mentorship, dan pengembangan mahasiswa, dirancang untuk
              menjembatani mahasiswa, institusi, dan peluang global. Kami
              beroperasi sebagai hub untuk kolaborasi beasiswa internasional,
              memberdayakan organisasi untuk menjalankan program yang berdampak
              dan terukur di seluruh dunia.
            </p>
          </div>

          <div className="flex flex-row gap-6 w-full text-center justify-between">
            
            {/* Kartu 1 */}
            <Card className={"bg-blue-100 border-none shadow-none w-full"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <Users2 className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-blue-900">7.000+</h1>
                  <p className="text-sm md:text-lg text-blue-800">Penerima Manfaat</p>
                </div>
              </CardContent>
            </Card>

            {/* Kartu 2 */}
            <Card className={"bg-blue-100 border-none shadow-none w-full"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <GraduationCap className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-blue-900">85</h1>
                  <p className="text-sm md:text-lg text-blue-800">Program Beasiswa</p>
                </div>
              </CardContent>
            </Card>

            {/* Kartu 3 (Lebar Penuh) */}
            {/* col-span-1 di HP, col-span-2 di Tablet/Laptop */}
            <Card className={"bg-blue-100 border-none shadow-none w-full"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <Briefcase className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-blue-900">84,93%</h1>
                  <p className="text-sm md:text-lg text-blue-800">Rata-rata Output Proyek</p>
                </div>
              </CardContent>
            </Card>

            <Card className={"bg-blue-100 border-none shadow-none w-full"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <Briefcase className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-blue-900">84,93%</h1>
                  <p className="text-sm md:text-lg text-blue-800">Rata-rata Output Proyek</p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </Card>
    </div>
  );
};