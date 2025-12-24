import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Outlet } from "react-router";

// ==========================================
// 1. LAYOUT SKELETON (Banner + Sidebar)
// ==========================================
export const ProfileLayoutSkeleton = () => {
  const skeletonColor = "bg-gray-200";

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-neutral-50 p-6">
      {/* HEADER / BANNER */}
      <div className="flex flex-col justify-between overflow-hidden rounded-xl bg-white p-8 shadow-md md:flex-row md:items-center border border-gray-100">
        <div className="flex flex-col items-center gap-6 md:flex-row w-full">
          <Skeleton className={`h-32 w-32 rounded-full ${skeletonColor}`} />
          <div className="flex flex-col space-y-3 text-center md:text-left w-full max-w-md">
            <Skeleton className={`h-8 w-64 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-48 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-32 ${skeletonColor}`} />
            <div className="mt-2 flex items-center justify-center md:justify-start">
               <Skeleton className={`h-6 w-20 rounded-full ${skeletonColor}`} />
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
           <Skeleton className={`h-10 w-32 rounded-md ${skeletonColor}`} />
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* SIDEBAR */}
        <aside className="w-full shrink-0 md:w-64">
          <div className="sticky top-20 flex flex-col gap-3 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm">
            <Skeleton className={`h-3 w-16 mb-2 ${skeletonColor}`} />
            <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
            <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
            <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
            <div className="my-2 h-px w-full bg-neutral-100" />
            <Skeleton className={`h-3 w-20 mb-2 mt-2 ${skeletonColor}`} />
            <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="w-full">
            {/* Placeholder kosong buat Outlet */}
            <div className="w-full h-full min-h-[500px]">
               <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 2. MY PROFILE CONTENT SKELETON
// ==========================================
export const MyProfileSkeleton = () => {
  const skeletonColor = "bg-gray-200";

  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="w-full flex items-center justify-center border-b-2 border-gray-200 p-2">
         <Skeleton className={`h-6 w-32 ${skeletonColor}`} />
      </div>

      <div className="w-full flex flex-row gap-6">
        {/* LEFT COLUMN */}
        <div className="w-3/5 flex flex-col gap-6">
          <div className="space-y-4"> {/* Bio */}
             <div className="flex justify-between items-center">
                <Skeleton className={`h-6 w-32 ${skeletonColor}`} />
                <Skeleton className={`h-8 w-20 rounded-full ${skeletonColor}`} />
             </div>
             <div className="bg-white p-4 border rounded-xl space-y-2">
                <Skeleton className={`h-4 w-full ${skeletonColor}`} />
                <Skeleton className={`h-4 w-[90%] ${skeletonColor}`} />
             </div>
          </div>
          <div className="space-y-4"> {/* Education */}
             <div className="flex justify-between items-center">
                <Skeleton className={`h-6 w-32 ${skeletonColor}`} />
                <Skeleton className={`h-8 w-20 rounded-full ${skeletonColor}`} />
             </div>
             <div className="bg-white p-4 border rounded-xl space-y-3">
                <Skeleton className={`h-6 w-1/2 ${skeletonColor}`} />
                <div className="space-y-2">
                    <Skeleton className={`h-4 w-1/3 ${skeletonColor}`} />
                    <Skeleton className={`h-4 w-1/4 ${skeletonColor}`} />
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-2/5 flex flex-col gap-6">
           <div className="bg-white rounded-2xl border p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                 <Skeleton className={`h-6 w-24 ${skeletonColor}`} />
                 <Skeleton className={`h-8 w-16 rounded-full ${skeletonColor}`} />
              </div>
              <div className="flex flex-col gap-3">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <Skeleton className={`h-4 w-24 ${skeletonColor}`} />
                       <Skeleton className={`h-4 flex-1 ${skeletonColor}`} />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. ENROLLED COURSE SKELETON (BARU!)
// ==========================================

// Helper Component: Card Skeleton (Internal)
const EnrolledCourseCardSkeleton = ({ skeletonColor }) => {
  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Header Image */}
      <Skeleton className={`h-40 w-full rounded-none ${skeletonColor}`} />

      {/* Body */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Title */}
        <Skeleton className={`h-6 w-3/4 ${skeletonColor}`} />

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Skeleton className={`h-5 w-16 rounded ${skeletonColor}`} />
          <Skeleton className={`h-5 w-12 rounded ${skeletonColor}`} />
          <Skeleton className={`h-4 w-20 rounded ${skeletonColor}`} />
        </div>

        {/* Progress Bar (Ciri khas Enrolled) */}
        <div className="flex flex-col gap-1 mt-2">
           <div className="flex justify-between">
              <Skeleton className={`h-3 w-20 ${skeletonColor}`} />
              <Skeleton className={`h-3 w-10 ${skeletonColor}`} />
           </div>
           <Skeleton className={`h-2 w-full rounded-full ${skeletonColor}`} />
        </div>

        {/* Desc */}
        <div className="space-y-2 mt-1">
          <Skeleton className={`h-3 w-full ${skeletonColor}`} />
          <Skeleton className={`h-3 w-[80%] ${skeletonColor}`} />
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 pt-0 mt-auto">
        <Skeleton className={`h-9 w-full rounded-md ${skeletonColor}`} />
      </div>
    </div>
  );
};

// Main Export Component
export const MyProfileEnrolledSkeleton = () => {
  const skeletonColor = "bg-gray-200";

  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Title */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-gray-200 p-2">
         <Skeleton className={`h-7 w-48 ${skeletonColor}`} />
      </div>

      {/* Search Input */}
      <div>
         <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
      </div>

      {/* Grid List */}
      <div className="bg-background">
         {/* Title Section */}
         <div className="mb-4 space-y-2">
             <Skeleton className={`h-8 w-64 ${skeletonColor}`} /> 
             <Skeleton className={`h-4 w-48 ${skeletonColor}`} />
         </div>
         
         {/* Grid 3 Kolom */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {[...Array(6)].map((_, i) => (
                 <EnrolledCourseCardSkeleton key={i} skeletonColor={skeletonColor} />
             ))}
         </div>
      </div>
    </div>
  );
};

// ... (Kode MyProfileSkeleton, ProfileLayoutSkeleton, dll yang sudah ada biarkan saja) ...

// ==========================================
// 4. ORDER HISTORY SKELETON (BARU!)
// ==========================================

// Helper: Card Skeleton
const OrderHistoryCardSkeleton = ({ skeletonColor }) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4">
      {/* A. Left: Image Placeholder */}
      <div className="flex flex-col items-center shrink-0">
         {/* Mengikuti ukuran gambar di card asli */}
         <Skeleton className={`h-28 w-28 rounded-lg ${skeletonColor}`} />
      </div>

      {/* B. Middle: Details */}
      <div className="flex-1 space-y-3">
         {/* Title & Code */}
         <div className="space-y-1">
            <Skeleton className={`h-6 w-3/4 ${skeletonColor}`} /> {/* Title */}
            <Skeleton className={`h-4 w-1/3 ${skeletonColor}`} /> {/* Code */}
         </div>

         {/* Meta Details (Instructor, Payment, Date, Price) */}
         <div className="space-y-2">
            <Skeleton className={`h-4 w-1/2 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-1/2 ${skeletonColor}`} />
            <Skeleton className={`h-4 w-1/3 ${skeletonColor}`} />
            <Skeleton className={`h-5 w-40 mt-1 ${skeletonColor}`} /> {/* Price (agak besar) */}
         </div>
      </div>

      {/* C. Right: Type & Status */}
      <div className="flex flex-row sm:flex-col justify-between items-end gap-4 sm:gap-0">
         {/* Type (Top Right) */}
         <Skeleton className={`h-4 w-24 ${skeletonColor}`} />
         
         {/* Status Pill (Bottom Right) */}
         <Skeleton className={`h-8 w-28 rounded-full ${skeletonColor}`} />
      </div>
    </div>
  );
};

// Main Export Component
export const MyProfileOrderSkeleton = () => {
  const skeletonColor = "bg-gray-200";

  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Title */}
      <div className="w-full flex items-center justify-center bg-transparent border-b-2 border-b-primary p-2">
         <Skeleton className={`h-7 w-48 ${skeletonColor}`} />
      </div>

      {/* Search Input */}
      <div>
         <Skeleton className={`h-10 w-full rounded-md ${skeletonColor}`} />
      </div>

      {/* List of Orders */}
      <div className="space-y-4">
         {[...Array(4)].map((_, i) => (
             <OrderHistoryCardSkeleton key={i} skeletonColor={skeletonColor} />
         ))}
      </div>
    </div>
  );
};