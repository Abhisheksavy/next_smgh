'use client'

import { Droplet, Globe, Eye, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";




// Icon mapping
const iconMap: { [key: string]: any } = {
    dialysis: Droplet,
    international: Globe,
    ophthalmology: Eye,
    urology: Activity,
};

export default function FeaturedServices({
    data, isLoading, isError, error
}: any) {


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
                                    <div key={i} className="h-24 bg-gray-200 animate-pulse rounded" />
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
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-teal-600 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
                        {data.tagline}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-700">
                        {data.title}
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {data.heading}
                        </h3>

                        {/* Description Paragraphs */}
                        <div className="space-y-4">
                            {data.description.map((paragraph: any, index: any) => (
                                <p key={index} className="text-gray-600 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-2 gap-4 py-6">
                            {data.services.map((service: any) => {
                                const IconComponent = iconMap[service.icon] || Activity;

                                return (
                                    <div
                                        key={service.id}
                                        className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-teal-600 hover:shadow-md transition-all duration-300 cursor-pointer"
                                    >
                                        <IconComponent className="w-8 h-8 text-teal-600 mb-2" />
                                        <span className="text-sm font-semibold text-gray-800 text-center">
                                            {service.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Button with Avatars */}
                        <div className="flex items-center gap-4">
                            <Link
                                href={data.cta.href}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                            >
                                {data.cta.label}
                            </Link>


                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative space-y-6">
                        {/* Top Image */}
                        <div className="relative h-64 md:h-72 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={data.images.top}
                                alt="Medical Service 1"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Bottom Image */}
                        <div className="relative h-64 md:h-72 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={data.images.bottom}
                                alt="Medical Service 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}