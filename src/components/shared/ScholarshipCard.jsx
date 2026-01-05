import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export const ScholarshipCard = ({
  id,
  name,
  organization,
  description,
  location,
  status,
  studyField,
  deadline,
  image,
}) => {
  // Format deadline
  const formatDeadline = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-40 bg-muted w-full relative">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <GraduationCap className="w-16 h-16 text-white/50" />
          </div>
        )}
        {/* Status Badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
            status === "open"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status?.toUpperCase()}
        </span>
      </div>

      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
          {name}
        </CardTitle>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{organization || "Unknown"}</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs mt-1">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {location}
          </span>
          {studyField && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {studyField}
            </span>
          )}
        </div>

        <CardDescription className="line-clamp-2 text-xs mt-1">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Deadline: {formatDeadline(deadline)}</span>
        </div>
        <Link to={`/scholarship/show/${id}`}>
          <Button
            size="sm"
            className="bg-[#3DBDC2] hover:bg-[#2da8ad] text-white"
          >
            Lihat Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
