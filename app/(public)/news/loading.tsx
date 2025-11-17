import React from "react";

export default function NewsLoading() {
  return (
    <>
      {/* InnerBanner Skeleton */}
      <section className="min-h-[200px] md:min-h-[300px] bg-gray-200 animate-pulse relative overflow-hidden">
        <div className="py-19 container relative">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-2 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
          {/* Title Skeleton */}
          <div className="h-12 w-64 bg-gray-300 rounded animate-pulse mb-4" />
          {/* Description Skeleton */}
          <div className="h-6 w-96 bg-gray-300 rounded animate-pulse" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-12 gap-5">
            {/* Main Content Area (col-span-8) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
              {/* News Items Skeleton */}
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex flex-col items-start gap-5">
                    {/* Image Skeleton */}
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded" />
                    
                    {/* Content Skeleton */}
                    <div className="w-full space-y-2.5">
                      {/* Meta Info Skeleton */}
                      <div className="flex gap-6">
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
              </div>

              {/* Pagination Skeleton */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[1, 2, 3, 4, 5].map((page) => (
                  <div
                    key={page}
                    className="h-10 w-10 bg-gray-200 animate-pulse rounded"
                  />
                ))}
              </div>
            </div>

            {/* Sidebar (col-span-4) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              {/* Search Bar Skeleton */}
              <div className="p-5 border rounded-md border-primary/20">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4" />
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
              </div>

              {/* News Tags Skeleton */}
              <div className="p-5 border rounded-md border-primary/20">
                <div className="h-6 w-28 bg-gray-200 animate-pulse rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((tag) => (
                    <div
                      key={tag}
                      className="h-8 w-20 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Recent News Skeleton */}
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

              {/* Categories Skeleton */}
              <div className="p-5 border rounded-md border-primary/20">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4.5" />
                <div className="flex flex-col gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-8 w-full bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Subscription Form Skeleton */}
              <div className="p-5 border rounded-md border-primary/20">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4.5" />
                <div className="flex flex-col gap-4">
                  <div className="h-12.5 w-full bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-12.5 w-full bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-12 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
              <div className="h-24 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
              <div className="h-24 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

