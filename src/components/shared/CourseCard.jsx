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

export const CourseCard = ({
  title,
  level,
  rating,
  reviews,
  description,
  price='0',
  image,
}) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0">
      <div className="h-40 bg-muted w-full relative">
        {/* Placeholder for Image */}
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600" />
        )}
      </div>
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
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
        <CardDescription className="line-clamp-3 text-xs mt-1">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="font-bold text-lg">
          Rp {price.toLocaleString("id-ID")}
        </div>
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          {price > 0 ? "Beli Kursus" : "Lihat Kursus"}
        </Button>
      </CardFooter>
    </Card>
  );
};
