import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SessionDetailSkeleton = () => {
  return (
    <div className="space-y-6 pb-10 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="w-full flex items-center justify-between border-b-2 border-neutral-200 py-4 mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md bg-neutral-200" /> {/* Tombol Back */}
          <Skeleton className="h-8 w-64 rounded-md bg-neutral-200" /> {/* Judul Detail Sesi... */}
        </div>
        <Skeleton className="h-6 w-24 rounded-full bg-neutral-200" /> {/* Badge Status */}
      </div>

      {/* 2. Tabs Skeleton */}
      <div className="grid w-full grid-cols-3 gap-2 mb-6">
        <Skeleton className="h-10 w-full rounded-md bg-neutral-200" />
        <Skeleton className="h-10 w-full rounded-md bg-neutral-200" />
        <Skeleton className="h-10 w-full rounded-md bg-neutral-200" />
      </div>

      {/* 3. Content Skeleton (Simulasi Tab Overview) */}
      <div className="space-y-6">
        
        {/* Card Informasi Jadwal */}
        <div className="rounded-xl border border-neutral-200 p-6 space-y-4 bg-white">
          <Skeleton className="h-5 w-40 rounded-md bg-neutral-200 mb-4" /> {/* Judul Card */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16 bg-neutral-100" /> {/* Label */}
                <Skeleton className="h-5 w-32 bg-neutral-200" /> {/* Value */}
              </div>
            ))}
          </div>
        </div>

        {/* Card Profil (Mentor & Student) */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-neutral-200 p-6 space-y-4 bg-white">
              {/* Header Profil */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full bg-neutral-200" /> {/* Avatar */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 bg-neutral-200" /> {/* Nama */}
                  <Skeleton className="h-4 w-32 bg-neutral-100" /> {/* Email */}
                </div>
              </div>
              
              <Skeleton className="h-px w-full bg-neutral-100" /> {/* Separator */}
              
              {/* Detail Info */}
              <div className="space-y-2">
                 <Skeleton className="h-4 w-3/4 bg-neutral-100" />
                 <Skeleton className="h-4 w-1/2 bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};