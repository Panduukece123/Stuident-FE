import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MentoringService from "@/services/MentoringService";
import { SessionCard } from "@/components/shared/SessionCard";
// Import skeleton baru
import { MySessionSkeleton } from "@/components/skeleton/MySessionSkeleton";

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