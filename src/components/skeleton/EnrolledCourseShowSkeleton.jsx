import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EnrolledCourseShowSkeleton = () => {
  const skeletonColor = "bg-gray-200";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-pulse">
      
      {/* 1. HEADER & BREADCRUMB */}
      <div className="flex items-center gap-4">
        {/* Back Button Circle */}
        <Skeleton className={`h-10 w-24 rounded-full ${skeletonColor}`} />
        
        {/* Breadcrumb Lines */}
        <div className="flex items-center gap-2">
           <Skeleton className={`h-4 w-24 ${skeletonColor}`} />
           <span className="text-gray-300">/</span>
           <Skeleton className={`h-4 w-32 ${skeletonColor}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* --- LEFT COLUMN: PLAYER (2/3) --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="bg-white border shadow-sm rounded-2xl p-6 flex flex-col gap-6">
              {/* Title Header */}
              <div className="space-y-2">
                 <Skeleton className={`h-8 w-3/4 ${skeletonColor}`} /> {/* Judul Materi */}
                 <Skeleton className={`h-4 w-1/3 ${skeletonColor}`} /> {/* Section • Duration */}
              </div>
              
              <hr className="border-gray-100" />

              {/* VIDEO PLAYER PLACEHOLDER (Aspect Video 16:9) */}
              <div className="aspect-video w-full rounded-xl overflow-hidden relative">
                 <Skeleton className={`w-full h-full ${skeletonColor}`} />
                 {/* Play Icon di tengah biar estetik */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="h-12 w-12 bg-white/40 rounded-full"></div>
                    </div>
                 </div>
              </div>

              {/* Description Lines */}
              <div className="space-y-2">
                 <Skeleton className={`h-4 w-full ${skeletonColor}`} />
                 <Skeleton className={`h-4 w-[95%] ${skeletonColor}`} />
                 <Skeleton className={`h-4 w-[90%] ${skeletonColor}`} />
                 <Skeleton className={`h-4 w-[60%] ${skeletonColor}`} />
              </div>

              {/* Navigation Buttons (Footer) */}
              <div className="flex flex-row justify-between w-full mt-4 pt-4 border-t">
                 <Skeleton className={`h-10 w-32 rounded-md ${skeletonColor}`} /> {/* Prev */}
                 <Skeleton className={`h-10 w-36 rounded-md ${skeletonColor}`} /> {/* Next */}
              </div>
           </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR (1/3) --- */}
        <div className="lg:col-span-1 space-y-4">
           
           {/* A. PROGRESS CARD */}
           <div className="bg-white border shadow-sm rounded-2xl p-5 flex flex-col gap-4">
              <Skeleton className={`h-6 w-1/2 ${skeletonColor}`} /> {/* Title Progres */}
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <Skeleton className={`h-3 w-24 ${skeletonColor}`} />
                    <Skeleton className={`h-3 w-10 ${skeletonColor}`} />
                 </div>
                 <Skeleton className={`h-2 w-full rounded-full ${skeletonColor}`} />
              </div>
           </div>

           {/* B. MODULE LIST (ACCORDION) */}
           <div className="bg-white border shadow-sm rounded-2xl overflow-hidden">
              {/* List Header */}
              <div className="p-4 border-b bg-gray-50/50">
                 <Skeleton className={`h-5 w-32 ${skeletonColor}`} />
              </div>

              {/* List Items (Simulasi Chapter) */}
              <div className="flex flex-col">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b last:border-0">
                       {/* Chapter Header */}
                       <div className="p-4 flex items-center justify-between">
                          <Skeleton className={`h-4 w-48 ${skeletonColor}`} />
                          <Skeleton className={`h-4 w-4 ${skeletonColor}`} />
                       </div>
                       
                       {/* Simulasi Chapter 1 Terbuka (biar kelihatan list modulnya) */}
                       {i === 0 && (
                          <div className="bg-gray-50/30 p-2 border-t space-y-2">
                             {[...Array(3)].map((_, j) => (
                                <div key={j} className="flex items-center gap-3 p-2 rounded-lg">
                                   <Skeleton className={`h-4 w-4 rounded-full shrink-0 ${skeletonColor}`} /> {/* Icon */}
                                   <div className="space-y-1 flex-1">
                                      <Skeleton className={`h-4 w-3/4 ${skeletonColor}`} /> {/* Title */}
                                      <Skeleton className={`h-3 w-16 ${skeletonColor}`} /> {/* Duration */}
                                   </div>
                                </div>
                             ))}
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};