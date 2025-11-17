import React from "react";

export default function RecentNewsSkeleton({ heading }: { heading?: string }) {
  return (
    <div className="p-5 border rounded-md border-primary/20">
      <div className="h-6 w-36 bg-gray-200 animate-pulse rounded mb-4.5" />
      <div className="flex flex-wrap gap-2.5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex gap-2.5 w-full">
            <div className="w-15 h-15 bg-gray-200 animate-pulse rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-3.5 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

