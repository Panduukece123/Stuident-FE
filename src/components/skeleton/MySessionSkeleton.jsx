import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MySessionSkeleton = () => {
  return (
    <div className="space-y-6 p-1 animate-pulse">
      {/* 1. Header Skeleton */}
      {/* Kita samakan padding dan bordernya dengan header asli biar tidak jumping */}
      <div className="w-full flex items-center justify-center border-b-2 border-neutral-200 p-2">
        <Skeleton className="h-7 w-56 rounded-md bg-neutral-200" />
      </div>

      {/* 2. Grid Card Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between h-[180px]"
          >
            {/* Bagian Atas: Badge Status & Tipe Sesi */}
            <div className="flex justify-between items-start">
              <Skeleton className="h-5 w-24 rounded-full bg-neutral-200" />
              <Skeleton className="h-4 w-16 bg-neutral-100" />
            </div>

            {/* Bagian Tengah: Judul Sesi & Tanggal */}
            <div className="space-y-3 mt-2">
              <Skeleton className="h-6 w-3/4 rounded-md bg-neutral-200" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-neutral-200" />
                <Skeleton className="h-4 w-1/2 bg-neutral-100" />
              </div>
            </div>

            {/* Bagian Bawah: Profil Mentor */}
            <div className="flex items-center gap-3 mt-4 pt-3">
              <Skeleton className="h-8 w-8 rounded-full bg-neutral-200" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-10 bg-neutral-100" />
                <Skeleton className="h-4 w-32 bg-neutral-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};