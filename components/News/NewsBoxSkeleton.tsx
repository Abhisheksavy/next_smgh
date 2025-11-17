import React from "react";
import { Calendar, User } from "lucide-react";

export default function NewsBoxSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex flex-col items-start gap-5">
          {/* Image Skeleton */}
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded" />

          {/* Content Skeleton */}
          <div className="w-full space-y-2.5">
            {/* Meta Info Skeleton */}
            <div className="flex gap-6 mb-2">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Title Skeleton */}
            <div className="h-7 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-7 w-4/5 bg-gray-200 animate-pulse rounded" />

            {/* Content Excerpt Skeleton */}
            <div className="space-y-2 mt-2.5">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Read More Button Skeleton */}
            <div className="h-12 w-32 bg-gray-200 animate-pulse rounded mt-5" />
          </div>
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {[1, 2, 3, 4, 5].map((page) => (
          <div
            key={page}
            className="h-10 w-10 bg-gray-200 animate-pulse rounded"
          />
        ))}
      </div>
    </>
  );
}

