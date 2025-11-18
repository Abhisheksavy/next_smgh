import React from "react";

export default function HomeLoading() {
  return (
    <div>
      {/* Banner Section Skeleton */}
      <section className="relative min-h-[600px] bg-gray-200 animate-pulse overflow-hidden">
        <div className="relative container h-full flex items-center py-42">
          <div className="max-w-xl space-y-6">
            {/* Tagline Skeleton */}
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
            {/* Title Skeleton */}
            <div className="h-16 w-full bg-gray-300 rounded animate-pulse" />
            {/* CTA Button Skeleton */}
            <div className="h-12 w-48 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Quick Links Skeleton */}
      <section className="relative -mt-10 z-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex flex-col items-center">
            {/* Content Skeleton */}
            <div className="space-y-6 max-w-165 text-center mx-auto mb-16">
              {/* Tagline Skeleton */}
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
              {/* Title Skeleton */}
              <div className="h-12 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-5 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-5 w-4/5 bg-gray-200 animate-pulse rounded mx-auto" />
              </div>
              {/* CTA Link Skeleton */}
              <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mx-auto" />
            </div>
            {/* Image Skeleton */}
            <div className="relative w-full max-w-1200 h-96 bg-gray-200 animate-pulse rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="section-padding bg-secondary/2">
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          {/* Services Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-20 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patients Section Skeleton */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="text-center mb-2">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
          </div>
          {/* Description Skeleton */}
          <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded mx-auto mb-16" />
          {/* Visitors Info Grid Skeleton */}
          <div className="pt-16 grid grid-cols-12 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="col-span-12 sm:col-span-6 lg:col-span-3 h-32 bg-gray-200 animate-pulse rounded-sm border border-gray-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section Skeleton */}
      <section className="section-padding bg-gray-200 animate-pulse bg-center bg-cover bg-no-repeat min-h-[400px]">
        <div className="container">
          <div className="rounded-sm bg-gray-300 text-center py-11 animate-pulse">
            <div className="mx-auto max-w-180.5 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                {/* Title Skeleton */}
                <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-4/5 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>
              </div>
              {/* CTA Button Skeleton */}
              <div className="h-12 w-48 bg-gray-200 rounded-full mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Career Section Skeleton */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* Section Header Skeleton */}
          <div className="text-left mb-12">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
          </div>

          <div className="grid grid-cols-12 2xl:gap-24 gap-4 sm:gap-6 md:8 lg:gap-10">
            {/* Left Column - Career Options Skeleton */}
            <div className="col-span-12 lg:col-span-6 space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-t border-gray-200 py-8">
                  <div className="space-y-4">
                    {/* Career Name Skeleton */}
                    <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                    {/* Career Description Skeleton */}
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                    </div>
                    {/* Duration Skeleton */}
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
              {/* CTA Buttons Skeleton */}
              <div className="flex flex-row gap-2.5">
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-full" />
              </div>
            </div>

            {/* Right Column - Form Skeleton */}
            <div className="col-span-12 lg:col-span-6 rounded-sm bg-gray-200 py-16 px-8.5">
              {/* Form Heading Skeleton */}
              <div className="h-10 w-64 bg-gray-300 rounded mx-auto mb-7 animate-pulse" />
              {/* Form Fields Skeleton */}
              <div className="flex flex-col gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 w-full bg-gray-300 rounded animate-pulse" />
                ))}
                {/* File Upload Skeleton */}
                <div className="h-16 w-full bg-gray-300 rounded-xl border-2 border-dashed border-gray-400 animate-pulse" />
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

