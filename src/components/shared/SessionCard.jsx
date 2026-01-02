import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SessionCard = ({ session, onClick }) => {
  const isCompleted = session.status === "completed";
  
  // Format Tanggal Native (id-ID)
  const dateObj = new Date(session.schedule);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }); // Contoh: 28 Desember 2025

  return (
    <Card
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden border-neutral-200 transition-all hover:scale-[1.02] hover:shadow-md"
    >
      {/* Status Strip */}
      <div
        className={`absolute bottom-0 left-0 top-0 w-1.5 ${
          isCompleted ? "bg-green-500" : "bg-primary"
        }`}
      />

      <CardHeader className="pl-6 pb-2">
        <div className="flex items-start justify-between">
          <Badge
            variant={isCompleted ? "secondary" : "default"}
            className={
              isCompleted
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-primary hover:bg-primary/80"
            }
          >
            {session.status === "completed" ? "Selesai" : "Terjadwal"}
          </Badge>
          <span className="text-xs text-neutral-400">
            {session.type === "academic" ? "Akademik" : "Life Plan"}
          </span>
        </div>
        <CardTitle className=" line-clamp-1 text-lg font-medium">
          {session.session_id}
        </CardTitle>
        <CardDescription className=" flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-6">
        <div className=" flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-neutral-100">
            <AvatarImage src={session.mentor.avatar} />
            <AvatarFallback className="bg-neutral-100 ">
              {session.mentor.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500">Mentor</span>
            <span className="line-clamp-1 text-sm font-medium text-neutral-700">
              {session.mentor.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};