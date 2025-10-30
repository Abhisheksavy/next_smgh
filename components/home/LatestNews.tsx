import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestNews = ({ data, isLoading, isError, error }: any) => {
  if (isLoading) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 animate-pulse rounded" />
              <div className="h-24 bg-gray-200 animate-pulse rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500 text-center">
          Failed to load features: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
            {data.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-700">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-row">
            {/* <Image /> */}
            <div className="py-5 pl-5 pr-9 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[#1F9F9E] text-sm font-normal">
                  {data.newsData[0].published}
                </span>
                <p className="text-[#212124]  text-lg font-normal">
                  {data.newsData[0].newsTitle}
                </p>
              </div>

              <Link
                className="text-[#03AD92] text-base font-medium"
                href={data.newsData[0].link || "/"}
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
