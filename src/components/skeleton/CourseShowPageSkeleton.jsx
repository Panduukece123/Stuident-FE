import React from "react";
import { Skeleton } from "../ui/skeleton";

export const CourseShowPageSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto pt-1 p-4 md:py-8 md:px-6 flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Main Page Skeleton */}
            <div className="basis-full">
                <Skeleton className="w-full h-6 rounded-2xl my-2" />

                <Skeleton className="w-full h-10 rounded-3xl my-4" />
                <Skeleton className="h-48 md:h-64 rounded-lg my-4" />
                <Skeleton className="h-6 w-full rounded-2xl" />
                <div className="grid grid-cols-2 mt-4 gap-2">
                    <Skeleton className="h-6 w-full rounded-2xl" />
                    <Skeleton className="h-6 w-full rounded-2xl" />
                    <Skeleton className="h-6 w-full rounded-2xl" />
                    <Skeleton className="h-6 w-full rounded-2xl" />
                </div>
                
                <Skeleton className="w-full h-96 mt-4 rounded-xl" />
            </div>

            {/* Side Page Skeleton */}
            <Skeleton className="md:basis-lg h-96 md:sticky md:top-23 rounded-xl" />
        </div>
    );
};