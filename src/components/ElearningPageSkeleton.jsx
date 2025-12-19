// src/components/skeletons/ElearningPageSkeleton.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ElearningPageSkeleton = () => {
  // Warna Skeleton (Biar kelihatan abu-abu jelas)
  const skeletonColor = "bg-gray-200"; 

  return (
    <div className="min-h-screen flex flex-col space-y-0 pb-10">
      
      {/* 1. BANNER SKELETON */}
      <div className="w-full h-[300px] bg-gray-50 relative mb-8"> 
        <Skeleton className={`w-full h-full ${skeletonColor}`} />
      </div>

      {/* 2. CATEGORIES SKELETON */}
      <section className="py-12 px-6 bg-background">
        <div className="flex flex-col items-center text-center">
            {/* Title & Subtitle */}
            <Skeleton className={`h-8 w-48 mb-4 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-full max-w-2xl mb-2 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-full max-w-lg mb-8 ${skeletonColor}`} />

            {/* Grid Button Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-auto py-4 flex flex-col items-center gap-2 border rounded-md">
                        <Skeleton className={`w-8 h-8 rounded-md mb-1 ${skeletonColor}`} />
                        <Skeleton className={`h-4 w-24 ${skeletonColor}`} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. COURSE LIST SKELETON (Mirip CourseCard) */}
      <div className="py-12 px-6 border-t space-y-8">
        {/* Title Section */}
        <div className="mb-8">
          <Skeleton className={`h-8 w-64 mb-2 ${skeletonColor}`} />
          <Skeleton className={`h-4 w-96 ${skeletonColor}`} />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col h-full border rounded-xl overflow-hidden bg-white shadow-sm">
               {/* A. Image Area (h-40) */}
               <Skeleton className={`h-40 w-full rounded-none ${skeletonColor}`} />

               {/* B. Content Area */}
               <div className="flex-1 p-4 flex flex-col gap-3">
                 {/* Title */}
                 <Skeleton className={`h-6 w-3/4 ${skeletonColor}`} />

                 {/* Badges (Level, Rating, Reviews) */}
                 <div className="flex items-center gap-2">
                   <Skeleton className={`h-5 w-16 rounded ${skeletonColor}`} />
                   <Skeleton className={`h-5 w-12 rounded ${skeletonColor}`} />
                   <Skeleton className={`h-4 w-20 rounded ${skeletonColor}`} />
                 </div>

                 {/* Description (3 baris) */}
                 <div className="space-y-2 mt-1">
                   <Skeleton className={`h-3 w-full ${skeletonColor}`} />
                   <Skeleton className={`h-3 w-[90%] ${skeletonColor}`} />
                   <Skeleton className={`h-3 w-[70%] ${skeletonColor}`} />
                 </div>
               </div>

               {/* C. Footer Area (Price & Button) */}
               <div className="p-4 pt-0 flex items-center justify-between mt-auto">
                 <Skeleton className={`h-7 w-24 ${skeletonColor}`} />
                 <Skeleton className={`h-9 w-24 rounded-md ${skeletonColor}`} />
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 4. INFO BOOTCAMP SKELETON */}
      <div className="px-6 py-8">
         <Skeleton className={`h-[200px] w-full rounded-2xl ${skeletonColor}`} />
      </div>

      {/* 5. BOOTCAMP LIST SKELETON (Sama strukturnya dgn Course List) */}
      <div className="py-12 px-6 border-t space-y-8">
         <div className="mb-8">
            <Skeleton className={`h-8 w-64 mb-2 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-96 ${skeletonColor}`} />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="flex flex-col h-full border rounded-xl overflow-hidden bg-white shadow-sm">
                  <Skeleton className={`h-40 w-full rounded-none ${skeletonColor}`} />
                  <div className="flex-1 p-4 flex flex-col gap-3">
                    <Skeleton className={`h-6 w-3/4 ${skeletonColor}`} />
                    <div className="flex items-center gap-2">
                      <Skeleton className={`h-5 w-16 rounded ${skeletonColor}`} />
                      <Skeleton className={`h-5 w-12 rounded ${skeletonColor}`} />
                      <Skeleton className={`h-4 w-20 rounded ${skeletonColor}`} />
                    </div>
                    <div className="space-y-2 mt-1">
                      <Skeleton className={`h-3 w-full ${skeletonColor}`} />
                      <Skeleton className={`h-3 w-[90%] ${skeletonColor}`} />
                      <Skeleton className={`h-3 w-[70%] ${skeletonColor}`} />
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between mt-auto">
                    <Skeleton className={`h-7 w-24 ${skeletonColor}`} />
                    <Skeleton className={`h-9 w-24 rounded-md ${skeletonColor}`} />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};