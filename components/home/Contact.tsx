import CallIcon from "@/icons/home-icons/call-icon";
import Location from "@/icons/home-icons/location-icon";
import { cn } from "@/utils/twMerge";
import React from "react";

const Contact = ({ data, isLoading, isError, error }: any) => {
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
  const icons = [CallIcon, Location];
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

        <div className="grid grid-cols-12 gap-7">
          {data.communicationWays.map((items: any, index: any) => {
            const IconComponent = icons[index % icons.length];
            return (
              <a
                key={index}
                href={items.href}
                className={cn(
                  "py-13 col-span-4 pl-6 pr-14 rounded-sm",
                  index === 1 ? "bg-[#006980]" : "bg-[#1F9F9E]"
                )}
              >
                <IconComponent className="mb-4  text-white" />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg text-white">
                    {items.communicationName}
                  </span>
                  <span className="text-base text-white font-normal">
                    {items.wayToCommunicate}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
