import React, { useState } from "react";
import {
  Calendar, Clock, Video, User, Building2, MapPin, 
  GraduationCap, ArrowLeft, Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import MentoringService from "@/services/MentoringService";

// Import Komponen Tabs
import { NeedAssessmentTab } from "./NeedAssesmentTab";
import { CoachingFilesTab } from "./CoachingFilesTabs";
import { FeedbackDialog } from "../dialog/FeedbackDialog";
// Import Komponen Baru
import { MentorNotesSection } from "./MentorNotesSection";
import { StudentFeedbackSection } from "./StudentFeedbackSection";

export const SessionDetail = ({ session, onBack, userRole }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMentor = userRole === "mentor";

  if (!session) return null;

  // Logic Status Change
  const handleStatusChange = async (newStatus) => {
    if (newStatus === session.status) return;
    setLoading(true);
    try {
      await MentoringService.updateStatus(session.id, newStatus);
      window.location.reload(); 
    } catch (error) {
      console.error("Gagal update status", error);
    } finally {
      setLoading(false);
    }
  };

  // Formatting helpers
  const dateObj = new Date(session.schedule);
  const fullDate = !isNaN(dateObj) ? dateObj.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }) : "-";
  const time = !isNaN(dateObj) ? dateObj.toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  }) : "-";

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-transparent border-b-2 border-b-primary py-2 gap-4">
        <div 
          onClick={onBack} 
          className="flex gap-3 items-center cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
          <h1 className="text-xl text-neutral-800">Detail Sesi {session.session_id}</h1>
        </div>
        
        <div className="flex items-center gap-3">
             {isMentor ? (
                <Select 
                    defaultValue={session.status} 
                    onValueChange={handleStatusChange} 
                    disabled={loading}
                >
                  <SelectTrigger className="w-[140px] h-9 border-primary/50 bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Terjadwal</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                  </SelectContent>
                </Select>
             ) : (
                <Badge
                  variant={session.status === "completed" ? "secondary" : "default"}
                  className={session.status === "completed" ? "bg-green-100 text-green-700" : "bg-primary"}
                >
                  {session.status === "completed" ? "Selesai" : "Terjadwal"}
                </Badge>
             )}

            {!isMentor && session.status === "completed" && (
                <Button size="sm" variant="outline" className={" border border-yellow-500"} onClick={() => setShowFeedback(true)}>
                    <Star className="w-4 h-4 mr-2 text-yellow-500" /> Beri Feedback
                </Button>
            )}
        </div>
      </div>

      {/* --- TABS SYSTEM --- */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessment">Need Assessment</TabsTrigger>
          <TabsTrigger value="files">Coaching Files</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
           {/* Card Jadwal (Tetap sama) */}
           <Card>
            <CardHeader><CardTitle className="text-base font-semibold">Informasi Jadwal</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
               <div className="flex flex-col gap-1">
                   <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Tanggal</span>
                   <div className="flex items-center gap-2 text-neutral-800">
                       <Calendar className="h-4 w-4 text-blue-600" /><span className="font-semibold">{fullDate}</span>
                   </div>
               </div>
               <div className="flex flex-col gap-1">
                   <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Waktu</span>
                   <div className="flex items-center gap-2 text-neutral-800">
                       <Clock className="h-4 w-4 text-blue-600" /><span className="font-semibold">{time} WIB</span>
                   </div>
               </div>
               <div className="flex flex-col gap-1">
                   <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Tipe</span>
                   <Badge variant="outline" className={"font-medium w-fit"}>{session.type ? session.type.replace("_", " ") : "-"}</Badge>
               </div>
               <div className="flex flex-col gap-1">
                   <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">Link</span>
                   {session.meeting_link ? (
                        <a href={session.meeting_link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                             <Video className="h-4 w-4"/> Buka Meeting
                        </a>
                   ) : <span className="text-sm italic text-neutral-400">Belum tersedia</span>}
               </div>
            </CardContent>
          </Card>

          <MentorNotesSection session={session} isMentor={isMentor} />

          <StudentFeedbackSection session={session} />

          {/* Grid Profil (Tetap sama) */}
          <div className="grid gap-6 md:grid-cols-2">
             <div className="space-y-3">
               <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><User className="h-4 w-4" /> Mentor Profile</h3>
               <Card><CardContent className="p-6 space-y-4">
                   <div className="flex items-center gap-4">
                       <Avatar className="h-16 w-16"><AvatarImage src={session.mentor?.avatar} /><AvatarFallback>{session.mentor?.name?.substring(0,2)}</AvatarFallback></Avatar>
                       <div><p className="text-lg font-bold">{session.mentor?.name}</p><p className="text-sm text-neutral-500">{session.mentor?.email}</p></div>
                   </div>
                   <div className="flex flex-nowrap gap-2 overflow-x-auto w-full pb-1 scrollbar-hide">
                   {session.mentor?.specialization && session.mentor.specialization.length > 0 ? (
                     session.mentor.specialization.map((tech, index) => (
                       <Badge key={index} variant="outline" className="whitespace-nowrap px-2.5 py-0.5 text-xs font-normal bg-white">{tech}</Badge>
                     ))
                   ) : <Badge variant="outline">-</Badge>}
                 </div>
                   <Separator />
                   <div className="space-y-2 text-sm text-neutral-600">
                        <div className="flex gap-2"><Building2 className="w-4 h-4"/> {session.mentor?.institution}</div>
                        <div className="flex gap-2"><MapPin className="w-4 h-4"/> {session.mentor?.address}</div>
                   </div>
               </CardContent></Card>
             </div>

             <div className="space-y-3">
               <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><GraduationCap className="h-4 w-4" /> Student Profile</h3>
                <Card><CardContent className="p-6 space-y-4">
                   <div className="flex items-center gap-4">
                       <Avatar className="h-16 w-16"><AvatarImage src={session.member?.avatar} /><AvatarFallback>{session.member?.name?.substring(0,2)}</AvatarFallback></Avatar>
                       <div><p className="text-lg font-bold">{session.member?.name}</p><p className="text-sm text-neutral-500">{session.member?.email}</p></div>
                   </div>
                   <div className="flex flex-nowrap gap-2 overflow-x-auto w-full pb-1 scrollbar-hide">
                   {session.member?.specialization && session.member.specialization.length > 0 ? (
                     session.member.specialization.map((tech, index) => (
                       <Badge key={index} variant="outline" className="whitespace-nowrap px-2.5 py-0.5 text-xs font-normal bg-white">{tech}</Badge>
                     ))
                   ) : <Badge variant="outline">-</Badge>}
                 </div>
                   <Separator />
                   <div className="space-y-2 text-sm text-neutral-600">
                        <div className="flex gap-2"><Building2 className="w-4 h-4"/> {session.member?.institution}</div>
                        <div className="flex gap-2"><MapPin className="w-4 h-4"/> {session.member?.address}</div>
                   </div>
               </CardContent></Card>
             </div>
         </div>
       </TabsContent>

       {/* TAB 2: NEED ASSESSMENT */}
       <TabsContent value="assessment">
           <NeedAssessmentTab sessionId={session.id} isMentor={isMentor} />
       </TabsContent>

       {/* TAB 3: FILES */}
       <TabsContent value="files">
           <CoachingFilesTab sessionId={session.id} isMentor={isMentor} />
       </TabsContent>
     </Tabs>

     <FeedbackDialog 
       open={showFeedback} 
       onOpenChange={setShowFeedback} 
       sessionId={session.id} 
     />
   </div>
 );
};