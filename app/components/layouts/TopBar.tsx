// components/TopBar.tsx
'use client'

import { useGetTopBarData } from "@/app/queries/useLayout";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
    const { data, isLoading, isError, error } = useGetTopBarData();

    if (isLoading) {
        return (
            <div className="bg-background border-b border-gray-200 py-3 md:py-4 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
                <div className="max-w-7xl mx-auto">
                    <p className="text-red-500 text-xs md:text-sm text-center">.
                        Failed to load TopBar data: {error?.message || "Unknown error"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background py-3 md:py-4 px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
                {/* Logo */}
                <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
                    <Image
                        src={data.logo}
                        alt={"SMGH Logo"}
                        width={100}
                        height={33}
                        className="object-contain md:w-[120px] md:h-[40px]"
                    />
                </div>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
                    {/* Emergency Contact */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {data.emergency.label}
                            </p>
                            <p className="text-sm md:text-base font-semibold text-teal-600">
                                {data.emergency.phone}
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {data.location.label}
                            </p>
                            <p className="text-sm md:text-base font-semibold text-gray-700">
                                {data.location.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}