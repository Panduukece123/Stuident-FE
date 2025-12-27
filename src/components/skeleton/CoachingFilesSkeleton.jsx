import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CoachingFilesSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        {/* Title Placeholder */}
        <Skeleton className="h-7 w-40 mb-1.5" />
        {/* Description Placeholder */}
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-3">
          {/* Kita render 3 baris skeleton biar kelihatan seperti list */}
          {[1, 2, 3].map((index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 border rounded-xl bg-white"
            >
              <div className="flex items-center gap-4">
                {/* Icon Box Skeleton */}
                <Skeleton className="h-10 w-10 rounded-lg" />
                
                <div className="flex flex-col gap-2">
                   {/* Filename Skeleton */}
                   <Skeleton className="h-4 w-48" />
                   {/* Badge/Type Skeleton */}
                   <Skeleton className="h-3 w-16" />
                </div>
              </div>

              {/* Download Button Skeleton */}
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};