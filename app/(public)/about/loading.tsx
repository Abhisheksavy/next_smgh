import React from "react";

export default function AboutLoading() {
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
          <div className="h-12 w-64 bg-gray-300 rounded animate-pulse mb-4" />
          {/* Description Skeleton */}
          <div className="h-6 w-96 bg-gray-300 rounded animate-pulse" />
        </div>
      </section>

      {/* Health Section Skeleton */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-6 lg:gap-9.5 items-center">
            {/* Image Skeleton */}
            <div className="col-span-12 md:col-span-5">
              <div className="w-full h-96 bg-gray-200 animate-pulse rounded-sm" />
            </div>

            {/* Content Skeleton */}
            <div className="col-span-12 md:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full space-y-1">
                {/* Tagline Skeleton */}
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                {/* Title Skeleton */}
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded mb-1" />
                <div className="h-10 w-4/5 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Health Benefits Grid Skeleton */}
              <div className="grid grid-cols-12 mt-6 gap-x-4 md:gap-x-8 lg:gap-x-10 gap-y-4 mb-8 w-full">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="col-span-12 md:col-span-6 flex flex-row items-center gap-1"
                  >
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full" />
                    <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
                  </div>
                ))}
              </div>

              {/* Description Skeleton */}
              <div className="w-full space-y-2">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Care Section Skeleton */}
      <section className="section-padding relative bg-gray-300 min-h-[300px]">
        <div className="container relative">
          {/* Main Title Skeleton */}
          <div className="h-10 w-80 bg-gray-400 animate-pulse rounded mx-auto mb-4.5" />

          <div className="space-y-7">
            {/* First Item */}
            <div className="text-center flex flex-col gap-2.5">
              <div className="h-7 w-64 bg-gray-400 animate-pulse rounded mx-auto" />
              <div className="space-y-2">
                <div className="h-5 w-full max-w-2xl bg-gray-400 animate-pulse rounded mx-auto" />
                <div className="h-5 w-full max-w-xl bg-gray-400 animate-pulse rounded mx-auto" />
              </div>
            </div>

            {/* Second Item */}
            <div className="text-center flex flex-col gap-2.5">
              <div className="h-7 w-64 bg-gray-400 animate-pulse rounded mx-auto" />
              <div className="space-y-2">
                <div className="h-5 w-full max-w-2xl bg-gray-400 animate-pulse rounded mx-auto" />
                <div className="h-5 w-full max-w-xl bg-gray-400 animate-pulse rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section Skeleton */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-12 gap-3">
            {/* Mission Card Skeleton */}
            <div className="col-span-12 md:col-span-6 bg-primary/4 px-8 pt-8">
              <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mb-6" />
              <div className="flex justify-end">
                <div className="w-full max-w-65 h-64 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Vision Card Skeleton */}
            <div className="col-span-12 md:col-span-6 bg-primary/4 px-8 pt-8">
              <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mb-6" />
              <div className="flex justify-end">
                <div className="w-full max-w-65 h-64 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Values Card Skeleton */}
            <div className="col-span-12 bg-primary/4 px-8 pt-8">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-6 flex flex-col justify-between">
                  <div className="h-10 w-80 bg-gray-200 animate-pulse rounded mb-6" />
                  <div className="-ml-8">
                    <div className="w-full max-w-65 h-64 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col gap-y-6 pb-8">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex gap-x-3">
                      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded flex-shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section Skeleton */}
      <section className="section-padding">
        <div className="container">
          {/* Header Skeleton */}
          <div className="text-center mb-7">
            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mx-auto mb-1.5" />
            <div className="h-10 w-80 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
            <div className="space-y-2 max-w-2xl mx-auto">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mx-auto" />
            </div>
          </div>

          {/* Leaders Grid Skeleton */}
          <div className="grid grid-cols-12 gap-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-span-12 md:col-span-4 bg-primary">
                {/* Image Skeleton */}
                <div className="w-full h-80 bg-gray-300 animate-pulse" />
                {/* Content Skeleton */}
                <div className="text-center py-7 px-4 flex flex-col gap-2">
                  <div className="h-5 w-32 bg-gray-400 animate-pulse rounded mx-auto" />
                  <div className="h-5 w-48 bg-gray-400 animate-pulse rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button Skeleton */}
          <div className="flex justify-center mt-7">
            <div className="h-12 w-48 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Annual Report Section Skeleton */}
      <section className="section-padding">
        <div className="container">
          {/* Header Skeleton */}
          <div className="mb-7">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-1.5" />
            <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
          </div>

          <div className="grid grid-cols-12 2xl:gap-24 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Accordion List Skeleton */}
            <div className="col-span-12 md:col-span-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border-t py-8 border-[#EAECF0]"
                >
                  <div className="h-6 w-64 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </div>

            {/* Image Skeleton */}
            <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full h-96 max-w-107 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section Skeleton */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-4">
                <div className="w-full h-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
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
    </div>
  );
}

