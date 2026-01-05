import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { SessionCard } from "@/components/shared/SessionCard";
// Import skeleton baru
import { MySessionSkeleton } from "@/components/skeleton/MySessionSkeleton";
// Import tambahan untuk UI Kontak
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle } from "lucide-react";

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

  // Gunakan Skeleton Component yang baru
  if (isLoading) {
    return <MySessionSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
        <h1 className="text-xl text-neutral-800">My Mentoring Session</h1>
      </div>

      {/* --- SECTION KONTAK NARAHUBUNG (BARU) --- */}
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
              Jika Anda mengalami kendala teknis atau memiliki pertanyaan terkait
              jadwal mentoring, silakan hubungi tim narahubung kami.
            </p>
          </div>
        </div>
        <a
          href="http://wa.me/6285124423755" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 cursor-pointer shadow-sm">
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
        <>
          {sessions.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-neutral-50 p-10 text-center text-neutral-500">
              Belum ada sesi mentoring yang terdaftar.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onClick={() =>
                    navigate(`/profile/my-mentoring-sessions/${session.id}`)
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};