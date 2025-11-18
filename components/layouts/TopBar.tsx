// components/TopBar.tsx
"use client";
import CallIcon from "@/icons/home-icons/call-icon";
import Location from "@/icons/home-icons/location-icon";
import { useGetTopBarData } from "@/queries/useLayout";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function TopBar({ topbar }: { topbar?: any }) {
  const { data, isLoading, isError, error } = useGetTopBarData();
//   console.log(topbar);
  if (isLoading) {
    return (
      <div className="bg-background border-b border-gray-200 py-3 md:py-6.5 px-4 md:px-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-200 animate-pulse rounded" />
          <div className="flex flex-col sm:flex-row gap-3 md:gap-8 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-40 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 w-full sm:w-40 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="bg-background border-b border-gray-200 py-3 md:py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <p className="text-red-500 text-xs md:text-sm text-center">
            . Failed to load TopBar data: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background py-3 sm:px-4 md:px-6 md:py-6.5">
      <div className="container flex flex-row items-center justify-between gap-4 lg:gap-0">
        {/* Logo */}
        <div className="flex items-center justify-center sm:justify-start w-auto">
          <Image
            src={data.logo}
            alt={"SMGH Logo"}
            width={100}
            height={33}
            className="object-contain h-auto w-18 sm:w-20 md:w-24 "
          />
        </div>
        {/* Contact Info */}
        <div className="flex  flex-row items-center gap-2 sm:gap-6 lg:gap-8 w-auto lg:w-auto">
          {/* Emergency Contact */}
          <a href={`tel:${data.emergency.phone}`} className="flex items-center gap-2 w-full- sm:w-auto justify-center sm:justify-start">
            <div className="h-auto aspect-square w-7 sm:w-8 lg:w-10 flex items-center justify-center shrink-0">
              {/* <Phone className="w-4 h-4 md:w-5 md:h-5 text-teal-600" /> */}
              <CallIcon className="w-6 sm:w-7 lg:w-10 h-auto aspect-square" color1="#006980"  color2="#26D17D"  />
            </div>
            <div className="text-center sm:text-left hidden sm:inline-flex flex-col">
              <p className="text-xs text-primary uppercase tracking-wide font-medium">
                {data.emergency.label}
              </p>
              <p className="text-sm lg:text-base font-semibold text-secondary-green">
                {data.emergency.phone}
              </p>
            </div>
          </a>
          {/* Location */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <div className="h-auto aspect-square w-7 sm:w-8 lg:w-10 flex items-center justify-center shrink-0">
              <Location  className="w-6 sm:w-7 lg:w-10 h-auto aspect-square" color1="#006980" color2="#03AD92" />
            </div>
            <div className="text-left">
              <p className="text-xs text-primary uppercase tracking-wide font-medium">
                {data.location.label}
              </p>
              <p className="text-xs sm:text-sm lg:text-base font-semibold text-secondary">
                {data.location.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}