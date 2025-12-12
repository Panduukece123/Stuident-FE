import React from "react";
import { Card, CardContent } from "../ui/card";
import BgInfo from "../../assets/images/bg-infografis.svg";
import { Briefcase, GraduationCap, Users2 } from "lucide-react";

export const InfoBootcamp = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Card
        className={
          "p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10 relative overflow-hidden"
        }
        style={{
          background: `linear-gradient(to right, #074799, #3DBDC2)`,
        }}
      >

        {/* Wrapper Konten Utama */}
        {/* Sama seperti Card, kita ubah arah flex-nya di sini juga */}
        <div className="relative z-10 w-full flex flex-col gap-8 lg:gap-10 items-start">
          {/* BAGIAN KIRI: TEKS */}
          {/* Mobile: w-full (100%), Laptop: w-1/3 (33%) */}
          <div className="w-full flex flex-col gap-4 lg:gap-5 text-center">
            <h1 className="text-xl md:text-2xl font-semibold text-white text-center">
              Tertarik dengan Bootcamp?
            </h1>
            <div className="mx-auto h-1 w-132 rounded-full bg-white" />
            <p className="text-base text-white/90 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
              aspernatur maxime explicabo, a necessitatibus delectus voluptatum
              placeat eveniet nam, ducimus provident. Consectetur quas
              provident, omnis aliquam odit quam minima in?
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
