import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MyPortfolioSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      
      {/* HEADER SKELETON */}
      <div className="w-full flex items-center gap-2 border-b-2 border-b-neutral-100 py-2">
        <Skeleton className="h-6 w-6 rounded-full" /> {/* Arrow Back */}
        <Skeleton className="h-7 w-40 rounded-md" />   {/* Title "My Portfolio" */}
      </div>

      {/* --- SECTION 1: PROFILE INFO SKELETON --- */}
      <div className="bg-white border border-neutral-300 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        
        {/* Left: Bio & Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/3 rounded-md" /> {/* Name */}
            <Skeleton className="h-5 w-1/5 rounded-md" /> {/* Role */}
          </div>
          
          {/* Bio Lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        {/* Right: Contact Detail (Grey Box) */}
        <div className="w-full md:w-1/3 bg-neutral-50 rounded-xl p-5 border border-neutral-100 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
             <Skeleton className="h-4 w-4 rounded-full" />
             <Skeleton className="h-4 w-3/4" /> 
          </div>
          <div className="flex gap-3 items-center">
             <Skeleton className="h-4 w-4 rounded-full" />
             <Skeleton className="h-4 w-1/2" /> 
          </div>
          <div className="flex gap-3 items-start">
             <Skeleton className="h-4 w-4 rounded-full" />
             <Skeleton className="h-4 w-5/6" /> 
          </div>
          
          <div className="h-px bg-neutral-200 my-1" />
          
          <div className="flex gap-3 items-start">
             <Skeleton className="h-4 w-4 rounded-full mt-1" />
             <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-full" /> {/* Institution */}
                <Skeleton className="h-3 w-2/3" /> {/* Major */}
             </div>
          </div>
        </div>
      </div>

      {/* --- GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI (2/3) - Experience & Achievement */}
        <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Experience Skeleton */}
            <div className="flex flex-col gap-4 bg-white p-6 border border-neutral-300 rounded-2xl">
                <Skeleton className="h-7 w-64 rounded-md" /> {/* Title Section */}
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="space-y-2 w-3/4">
                                    <Skeleton className="h-6 w-1/2" /> {/* Job Title */}
                                    <div className="flex gap-2 items-center">
                                        <Skeleton className="h-4 w-24" /> {/* Company */}
                                        <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-32 rounded-md" /> {/* Date */}
                            </div>
                            <div className="space-y-2 mt-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievement Skeleton */}
            <div className="flex flex-col gap-4 bg-white p-6 border border-neutral-300 rounded-2xl">
                <Skeleton className="h-7 w-48 rounded-md" /> {/* Title Section */}
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-1/2" /> {/* Title */}
                                <Skeleton className="h-5 w-10" />  {/* Year */}
                            </div>
                            <Skeleton className="h-4 w-1/3" /> {/* Org */}
                            <Skeleton className="h-4 w-full mt-1" /> {/* Desc */}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* KOLOM KANAN (1/3) - Org, Courses, Mentoring, Scholarship */}
        <div className="flex flex-col gap-6">
            
            {/* Organization Skeleton */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                <Skeleton className="h-6 w-40" />
                <div className="flex flex-col gap-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Courses Skeleton */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex flex-col gap-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-8 rounded-md" />
                            </div>
                            <Skeleton className="h-1.5 w-full rounded-full" /> {/* Progress Bar */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mentoring Skeleton */}
            <div className="bg-white border border-neutral-300 rounded-xl p-5 flex flex-col gap-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col gap-3">
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-20 rounded-md" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-7 w-full rounded-md mt-1" /> {/* Button */}
                    </div>
                </div>
            </div>

            {/* Scholarship Skeleton */}
            <div className="bg-white border border-neutral-300 rounded-xl p-5 flex flex-col gap-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};