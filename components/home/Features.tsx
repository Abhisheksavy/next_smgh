"use client";
import DialysisIcon from "@/icons/home-icons/dialysis";
import InternationalMedicalIcon from "@/icons/home-icons/international";
import OphthalmologyIcon from "@/icons/home-icons/ophthalmology";
import UrologyIcon from "@/icons/home-icons/urology";
import { Droplet, Globe, Eye, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Icon mapping
const iconMap: { [key: string]: any } = {
  dialysis: DialysisIcon,
  international: InternationalMedicalIcon,
  ophthalmology: OphthalmologyIcon,
  urology: UrologyIcon,
};

const serviceIcon = [
     {label: "Dialysis" ,icon: DialysisIcon},
     {label: "International Medical" ,icon: InternationalMedicalIcon},
     {label: "Ophthalmology" ,icon: OphthalmologyIcon},
     {label: "Urology" ,icon: UrologyIcon},
]

export default function FeaturedServices({
  data,
  isLoading,
  isError,
  error,
}: any) {
  if (isLoading) {
    return (
      <div className="section-padding">
        <div className="container">
          <div className="text-center mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
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
    <section className="section-padding bg-secondary/2">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
          <p className="tagline">
            {data.tagline}
          </p>
          <h2 className="commonTitle font-medium!">
            {data.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7.5 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-xl md:text-[1.625rem] font-bold text-dark">
              {data.heading}
            </h3>

            {/* Description Paragraphs */}
            <div className="space-y-4">
              {data.description.map((paragraph: any, index: any) => (
                <p key={index} className="text-foreground leading-[1.4]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-4 gap-4 py-6">
              {data.services.map((service: any, index: number) => {
                const IconComponent = iconMap[service.title.split(" ")[0].toLowerCase()] || Activity;
                return (
                  <div
                    key={index}
                    className="flex flex-col col-span-4 min-[420px]:col-span-2 lg:col-span-1 items-center justify-center px-4 py-2.5 border  bg-white border-[#C6DFE3] rounded-lg hover:border-teal-600 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <IconComponent className="w-8 h-8 text-primary mb-2" />
                    <span className="text-base font-regular text-dark text-center">
                      {service.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button with Avatars */}
            <div className="flex items-center gap-4">
              <Link
                href={data?.cta?.href || "/"}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {data?.cta?.label}
              </Link>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative space-y-6">
            {/* Top Image */}
            <div className="relative h-64 md:h-72  overflow-hidden shadow-lg">
              <Image
                src={data.images.top}
                alt="Medical Service 1"
                fill
                className="object-cover"
              />
              <div className="imageBorderBottomAbs "></div>
            </div>

            {/* Bottom Image */}
            <div className="relative h-64 md:h-72  overflow-hidden shadow-lg">
              <Image
                src={data.images.bottom}
                alt="Medical Service 2"
                fill
                className="object-cover"
              />
               <div className="imageBorderBottomAbs "></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
