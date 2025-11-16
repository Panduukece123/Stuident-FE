import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BgInfo from "../../assets/images/bg-infografis.svg";
import { Briefcase, GraduationCap, Presentation, Users2 } from "lucide-react";

export const Infografis = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card
        className={"p-10 flex flex-row gap-10 relative overflow-hidden"}
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >
        <img
          src={BgInfo}
          alt="Dekorasi background"
          className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 w-full flex flex-row gap-10">
          <div className="w-1/3 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-white">
              STUIDENT (Synergy Development Unit of International Student)
            </h1>
            <p className="text-justify text-white">
              Stuident adalah platform terintegrasi untuk manajemen beasiswa,
              mentorship, dan pengembangan mahasiswa, dirancang untuk
              menjembatani mahasiswa, institusi, dan peluang global. Kami
              beroperasi sebagai hub untuk kolaborasi beasiswa internasional,
              memberdayakan organisasi untuk menjalankan program yang berdampak
              dan terukur di seluruh dunia
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 w-full text-center">
            <Card className={"bg-blue-100"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <Users2 className="text-blue-600" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-medium">7.000+</h1>
                  <p className="text-lg">Penerima Manfaat</p>
                </div>
              </CardContent>
            </Card>
            <Card className={"bg-blue-100"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <GraduationCap className="text-blue-600" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-medium">85</h1>
                  <p className="text-lg">Program Beasiswa yang Disampaikan</p>
                </div>
              </CardContent>
            </Card>
            <Card className={"bg-blue-100 col-span-2"}>
              <CardContent className={"flex flex-col gap-3 items-center"}>
                <div className="bg-blue-200 p-2 rounded-lg w-fit">
                  <Briefcase className="text-blue-600" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-medium">84,93%</h1>
                  <p className="text-lg">Rata-rata Output Proyek</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
