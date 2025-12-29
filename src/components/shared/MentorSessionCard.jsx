import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, GraduationCap, User, ChevronRight, MapPin } from "lucide-react";

export const MentorSessionCard = ({ session }) => {
  const navigate = useNavigate();
  const { id, mentor, schedule, type} = session;

  const dateObj = new Date(schedule);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const goToDetail = () => {
    navigate(`/mentoring-sessions/${id}`);
  };

  return (
    <Card
      onClick={goToDetail}
      className="group cursor-pointer relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
    >
      {/* Garis aksen di atas untuk membedakan tipe secara visual */}
      <div className={`h-1.5 w-full ${type === 'academic' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
      
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* Sisi Kiri: Avatar dengan Badge Tipe */}
          <div className="relative shrink-0">
            <div className="relative">
              <img
                src={mentor?.avatar || `https://ui-avatars.com/api/?name=${mentor?.name}&background=f0f7ff&color=0284c7`}
                alt={mentor?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-gray-100">
                {type === "academic" ? (
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-emerald-600" />
                )}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Informasi */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <Badge 
                variant="secondary" 
                className={`text-[9px] uppercase tracking-widest font-black mb-2 ${
                  type === 'academic' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {type}
              </Badge>
            
            </div>

            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate group-hover:text-blue-600 transition-colors">
              {mentor?.name}
            </h3>
            
            <div className="flex items-center gap-1 text-gray-500 mb-3">
              <MapPin className="w-3 h-3" />
              <p className="text-xs font-medium truncate italic">
                {mentor?.institution || "Independent Mentor"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
              <div className="flex items-center text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <CalendarDays className="w-3.5 h-3.5 mr-2 text-blue-500" />
                {formattedDate}
                <span className="mx-2 text-gray-300">|</span>
                {formattedTime} WIB
              </div>
            </div>
          </div>

          {/* Arrow Indicator yang muncul saat hover */}
          <div className="self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};