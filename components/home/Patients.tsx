"use client";
import HeartBeat from "@/icons/home-icons/heart-beat";
import { cn } from "@/utils/twMerge";
import { useState } from "react";

const Patients = ({ data, isLoading, isError, error }: any) => {
  const [selected, setSelected] = useState<string>("");
  if (isLoading) {
    return (
      <div className="secton-padding">
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
    <section className="secton-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-2">
          <p className="tagline mb-2">
            {data.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-700">
            {data.title}
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-center">{data.description}</p>
        </div>

        <div className="pt-16 grid grid-cols-12 ">
          {data &&
            data.visitorsInfo.map((info: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-span-3 border border-[#00000030] flex justify-center group hover:bg-[#006980] hover:rounded-sm hover:text-white! items-center py-14  transition-all duration-400 ease-in-out  "
                >
                  <div className="flex flex-col items-center  gap-2">
                    <HeartBeat
                      className={cn("text-secondary group-hover:text-white! transition-all duration-400 ease-in-out")}
                    />
                    <span className="text-base text-[#2112124] group-hover:text-white font-normal transition-all duration-400 ease-in-out">
                      {info}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Patients;
