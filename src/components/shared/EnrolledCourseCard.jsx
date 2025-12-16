import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
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
}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0">
      <div className="h-40 bg-muted w-full relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600" />
        )}
      </div>
      
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        
        {/* Rating & Level */}
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
            {level}
          </span>
          <div className="flex items-center text-yellow-500 gap-0.5">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviews} Review)</span>
        </div>

        {/* --- BAGIAN PROGRESS DIPERBAIKI --- */}
        <div className="flex flex-col gap-1 mt-2">
            {/* Header kecil di atas bar: Kiri status, Kanan persen */}
            <div className="flex justify-between text-xs font-medium">
                <span className={completed ? "text-green-600" : "text-gray-500"}>
                    {completed ? "Selesai" : "Sedang Berjalan"}
                </span>
                <span className="text-primary">{progress}%</span>
            </div>
            
            {/* Komponen Progress Bar Shadcn */}
            <Progress value={progress} className="h-2" />
        </div>

        <CardDescription className="line-clamp-2 text-xs mt-1">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-end mt-auto">
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white w-full">
          {completed ? "Lihat Sertifikat" : "Lanjut Belajar"}
        </Button>
      </CardFooter>
    </Card>
  );
};