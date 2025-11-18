import React from "react";

export default function CareerLoading() {
  return (
    <div>
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
          <div className="h-12 w-48 bg-gray-300 rounded animate-pulse mb-4" />
          {/* Description Skeleton */}
          <div className="h-6 w-96 bg-gray-300 rounded animate-pulse" />
        </div>
      </section>

      {/* Main Content Section Skeleton */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            {/* Left Column - Vacancy List Skeleton */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-11">
              {/* Vacancy List Container Skeleton */}
              <div className="bg-primary/3 p-10">
                {/* Section Header Skeleton */}
                <div className="mb-7 space-y-3">
                  <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* Vacancy Items List Skeleton */}
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-md p-3.5 space-y-4"
                    >
                      {/* Image Skeleton */}
                      <div className="w-full h-48 bg-gray-200 rounded-sm animate-pulse" />
                      
                      {/* Content Skeleton */}
                      <div className="space-y-3">
                        {/* Title and Tags Row Skeleton */}
                        <div className="flex justify-between items-center">
                          <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
                          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                        
                        {/* Description Skeleton */}
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                        </div>
                        
                        {/* Footer with Date and Button Skeleton */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button Skeleton */}
              <div className="text-center">
                <div className="h-12 w-56 bg-gray-200 rounded-full animate-pulse mx-auto" />
              </div>
            </div>

            {/* Right Sidebar Skeleton */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              {/* Recent Vacancies Box Skeleton */}
              <div className="p-5 border rounded-md border-gray-200">
                {/* Title Skeleton */}
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4.5" />
                
                {/* Recent Vacancies List Skeleton */}
                <div className="flex flex-col gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 py-2"
                    >
                      {/* Image Skeleton */}
                      <div className="w-15 h-15 flex-shrink-0 rounded bg-gray-200 animate-pulse" />
                      
                      {/* Content Skeleton */}
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Box Skeleton */}
              <div className="p-5 border rounded-md border-gray-200">
                {/* Title Skeleton */}
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-4.5" />
                
                {/* Categories List Skeleton */}
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3"
                    >
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription Form Box Skeleton */}
              <div className="p-5 border rounded-md border-gray-200">
                {/* Title Skeleton */}
                <div className="h-8 w-52 bg-gray-200 rounded animate-pulse mb-4.5" />
                
                {/* Form Fields Skeleton */}
                <div className="flex flex-col gap-4">
                  {/* Name Input Skeleton */}
                  <div className="h-12.5 w-full bg-gray-200 rounded-md animate-pulse" />
                  
                  {/* Email Input Skeleton */}
                  <div className="h-12.5 w-full bg-gray-200 rounded-md animate-pulse" />
                  
                  {/* Subscribe Button Skeleton */}
                  <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>

          {/* Communication Ways Grid Skeleton */}
          <div className="grid grid-cols-12 gap-7">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="col-span-12 sm:col-span-6 md:col-span-4 py-13 pl-6 pr-14 rounded-sm bg-gray-200 animate-pulse"
              >
                <div className="h-12 w-12 bg-gray-300 rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
                  <div className="h-5 w-full bg-gray-300 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

