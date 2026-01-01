import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, BookOpen, ChevronRight } from "lucide-react";

export const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/my-mentor/${mentor.id}`);
  };

  return (
    <Card
      onClick={goToDetail}
      className="group cursor-pointer border-none shadow-sm hover:shadow-xl transition-all bg-white hover:-translate-y-1"
    >
      {/* Accent */}
      <div className="h-1 w-full bg-blue-500" />

      <CardContent className="p-6 flex gap-5">
        {/* Avatar */}
        <img
          src={
            mentor.avatar ||
            mentor.profile_photo ||
            `https://ui-avatars.com/api/?name=${mentor.name}&background=f0f7ff&color=0284c7`
          }
          alt={mentor.name}
          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50"
        />
        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Top badges */}
          <div className="flex gap-2 mb-1">
            <Badge className="text-[9px] uppercase font-bold bg-blue-50 text-blue-700">
              Mentor
            </Badge>

            {mentor.status === "active" && (
              <Badge className="text-[9px] bg-emerald-50 text-emerald-700">
                Active
              </Badge>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-lg truncate group-hover:text-blue-600 transition">
            {mentor.name}
          </h3>

          {/* Institution */}
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin className="w-3 h-3" />
            <span className="italic truncate">
              {mentor.institution || "Independent Mentor"}
            </span>
          </div>

          {/* Academic info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700 mb-2">
            {mentor.major && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-blue-500" />
                {mentor.major}
              </div>
            )}

            {mentor.education_level && (
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-emerald-500" />
                {mentor.education_level}
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="text-xs text-gray-600 line-clamp-2">
            {mentor.bio || "Mentor profesional dengan pengalaman luas."}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight className="self-center w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition" />
      </CardContent>
    </Card>
  );
};
