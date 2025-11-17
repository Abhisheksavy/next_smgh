import React from "react";

export default function CategoriesSkeleton({ heading }: { heading?: string }) {
  return (
    <div className="p-5 border rounded-md border-primary/20">
      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4.5" />
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center py-3"
          >
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-7 w-7 bg-gray-200 animate-pulse rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

