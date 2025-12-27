import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const NeedAssessmentSkeleton = () => {
  return (
    <Card className="animate-pulse">
      {/* Header Skeleton */}
      <CardHeader className="space-y-2 pb-6">
        <Skeleton className="h-6 w-48 bg-neutral-200" /> {/* Title */}
        <Skeleton className="h-4 w-64 bg-neutral-100" /> {/* Description */}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Field 1: Textarea (Situasi) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-neutral-200" /> {/* Label */}
          <Skeleton className="h-24 w-full bg-neutral-100 rounded-md" /> {/* Textarea box */}
        </div>

        {/* Field 2: Input (Goals) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-neutral-200" /> {/* Label */}
          <Skeleton className="h-10 w-full bg-neutral-100 rounded-md" /> {/* Input box */}
        </div>

        {/* Field 3: Input (Challenges) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 bg-neutral-200" /> {/* Label */}
          <Skeleton className="h-10 w-full bg-neutral-100 rounded-md" /> {/* Input box */}
          <Skeleton className="h-3 w-56 bg-neutral-50" /> {/* Helper text */}
        </div>

        {/* Field 4: Textarea (Expectations) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36 bg-neutral-200" /> {/* Label */}
          <Skeleton className="h-24 w-full bg-neutral-100 rounded-md" /> {/* Textarea box */}
        </div>

        {/* Button Skeleton */}
        <div className="pt-2">
          <Skeleton className="h-10 w-40 bg-neutral-200 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};