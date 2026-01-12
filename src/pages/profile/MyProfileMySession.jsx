import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { SessionCard } from "@/components/shared/SessionCard";
import { MySessionSkeleton } from "@/components/skeleton/MySessionSkeleton";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle, CalendarClock, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MyProfileMySession = () => {
  const navigate = useNavigate();

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-mentoring-sessions"],
    queryFn: MentoringService.getMySessions,
  });

  const sessions = result?.data || [];

  // Filter Data
  const scheduledSessions = sessions.filter(
    (session) => session.status?.toLowerCase() === "scheduled" || session.status?.toLowerCase() === "paid"
  );

  // Masukkan 'cancelled' atau 'rejected' ke history juga agar tidak hilang
  const historySessions = sessions.filter(
    (session) => 
      session.status?.toLowerCase() === "completed" || 
      session.status?.toLowerCase() === "cancelled" ||
      session.status?.toLowerCase() === "rejected"
  );

  if (isLoading) {
    return <MySessionSkeleton />;
  }

  // Helper untuk merender list session
  const renderSessionList = (data, emptyMessage) => {
    if (data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-neutral-100 rounded-xl bg-neutral-50/50">
          <div className="bg-neutral-100 p-3 rounded-full mb-3">
            <CalendarClock className="w-8 h-8 text-neutral-400" />
          </div>
          <p className="text-neutral-500 font-medium">{emptyMessage}</p>
        </div>
      );
    }
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() =>
              navigate(`/profile/my-mentoring-sessions/${session.id}`)
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl text-neutral-800">My Mentoring Session</h1>
      </div>

      {/* Kontak Narahubung */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white p-3 text-primary shadow-sm border border-primary/10">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-neutral-800">
              Butuh Bantuan?
            </h3>
            <p className="text-sm text-neutral-600 mt-1 max-w-lg">
              Jika mengalami kendala teknis atau pertanyaan jadwal, hubungi narahubung kami.
            </p>
          </div>
        </div>
        <a
          href="http://wa.me/6285124423755"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm">
            <MessageCircle className="h-4 w-4" /> Hubungi Narahubung
          </Button>
        </a>
      </div>

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Gagal memuat data sesi mentoring.
        </div>
      )}

      {!isError && (
        <Tabs defaultValue="scheduled" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
            <TabsTrigger value="scheduled" className="gap-2">
              <CalendarClock size={16} /> Akan Datang
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History size={16} /> Riwayat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4 animate-in fade-in-50 duration-300">
             {renderSessionList(scheduledSessions, "Tidak ada sesi mentoring yang akan datang.")}
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-in fade-in-50 duration-300">
             {renderSessionList(historySessions, "Belum ada riwayat sesi mentoring.")}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};