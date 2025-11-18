import React from "react";

export default function ApplicationFormLoading() {
  return (
    <div>
      {/* InnerBanner Skeleton */}
      <section className="min-h-[200px] md:min-h-[300px] bg-gray-200 animate-pulse relative overflow-hidden">
        <div className="py-19 container relative">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-2 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-2 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
          </div>
          {/* Title Skeleton */}
          <div className="h-12 w-96 bg-gray-300 rounded animate-pulse mb-4" />
          {/* Description Skeleton */}
          <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse" />
        </div>
      </section>

      {/* Form Section Skeleton */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
            {/* Form Title Skeleton */}
            <div className="text-center mb-12">
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>

            {/* Step Heading Skeleton */}
            <div className="mb-8">
              <div className="h-8 w-80 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Form Fields Grid Skeleton */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Regular fields (2 columns) */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-2">
                  {/* Label Skeleton */}
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  {/* Input Field Skeleton */}
                  <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>
              ))}
              {/* Full-width field (textarea) */}
              <div className="md:col-span-2 space-y-2">
                {/* Label Skeleton */}
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                {/* Textarea Skeleton */}
                <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>
              {/* More regular fields */}
              {[7, 8].map((i) => (
                <div key={i} className="space-y-2">
                  {/* Label Skeleton */}
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  {/* Input Field Skeleton */}
                  <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>
              ))}
              {/* File Upload Field Skeleton */}
              <div className="md:col-span-2 space-y-2">
                {/* Label Skeleton */}
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                {/* File Upload Area Skeleton */}
                <div className="h-24 w-full bg-gray-200 rounded-xl border-2 border-dashed border-gray-300 animate-pulse flex items-center justify-center">
                  <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                </div>
                {/* Helper Text Skeleton */}
                <div className="h-3 w-64 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Form Footer with Navigation Skeleton */}
            <div className="mt-20 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
                {/* Progress Indicator Skeleton */}
                <div className="w-full sm:w-auto space-y-2">
                  {/* Step Text Skeleton */}
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  {/* Progress Bar Skeleton */}
                  <div className="h-2 bg-gray-200 rounded-full w-full sm:w-32">
                    <div className="h-2 bg-gray-300 rounded-full w-1/3 animate-pulse" />
                  </div>
                </div>

                {/* Navigation Buttons Skeleton */}
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                  {/* Previous Button Skeleton */}
                  <div className="h-11 w-28 bg-gray-200 rounded-full animate-pulse" />
                  {/* Next Button Skeleton */}
                  <div className="h-11 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Email CTA Button Skeleton (first step) */}
              <div className="flex justify-end mt-7">
                <div className="h-11 w-40 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

