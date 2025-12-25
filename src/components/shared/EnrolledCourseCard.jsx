import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Star, FileText, PlayCircle } from "lucide-react"; // Saya tambah icon biar cakep
import { Progress } from "../ui/progress";


export const EnrolledCourseCard = ({
  title,
  level,
  rating,
  reviews,
  description,
  progress,
  completed,
  image,
  certificate,
}) => {
  // Fungsi utilitas untuk membangun URL sertifikat
  const getCertificateUrl = (path) => {
    if (!path) return "#";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `http://localhost:8000/storage/${cleanPath}`;
  };

  const handleOpenCertificate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (certificate) {
      window.open(getCertificateUrl(certificate), "_blank");
    } else {
      alert("Sertifikat belum tersedia atau link rusak.");
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      {/* --- IMAGE HEADER --- */}
      <div className="h-40 bg-muted w-full relative group">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600" />
        )}
      </div>

      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <CardTitle className="text-lg line-clamp-1 leading-tight">
          {title}
        </CardTitle>

        {/* Rating & Level */}
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium border border-green-200">
            {level}
          </span>
          <div className="flex items-center text-yellow-500 gap-0.5">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviews} Review)</span>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between text-xs font-medium">
            <span className={completed ? "text-green-600" : "text-gray-500"}>
              {completed ? "Selesai" : "Sedang Berjalan"}
            </span>
            <span className="text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-neutral-100" />
        </div>

        <CardDescription className="line-clamp-2 text-xs mt-1 text-neutral-500">
          {description}
        </CardDescription>
      </CardContent>

      {/* --- BAGIAN TOMBOL (LOGIC DI SINI) --- */}
      <CardFooter className="p-4 pt-0 mt-auto">
        {completed ? (
          // KONDISI 1: SUDAH SELESAI (TAMPILKAN 2 TOMBOL)
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700"
            >
              Lanjut Belajar
            </Button>

            <Button
              size="sm"
              onClick={handleOpenCertificate}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white gap-2"
            >
              <FileText className="w-4 h-4" /> {/* Icon Sertifikat */}
              Sertifikat
            </Button>
          </div>
        ) : (
          // KONDISI 2: BELUM SELESAI (1 TOMBOL FULL)
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white w-full shadow-sm"
          >
            Lanjut Belajar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
