import React from "react";

export const OrderHistorySkeleton = ({ count = 4 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-xl border bg-white p-4 animate-pulse"
        >
          {/* IMAGE */}
          <div className="h-20 w-28 rounded-lg bg-gray-200" />

          {/* CONTENT */}
          <div className="flex-1 space-y-3">
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
          </div>

          {/* STATUS */}
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
};
export default OrderHistorySkeleton;