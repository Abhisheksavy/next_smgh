'use client'

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export default function About({ data, isLoading, isError, error }: any) {

    if (isLoading) {
        return (

            <div className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                            <div className="h-12 bg-gray-200 animate-pulse rounded" />
                            <div className="h-24 bg-gray-200 animate-pulse rounded" />
                            <div className="h-12 w-48 bg-gray-200 animate-pulse rounded" />
                        </div>
                        <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-red-500 text-center">
                    Failed to load about: {error?.message || "Unknown error"}
                </p>
            </div>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <p className="text-teal-600 font-semibold text-sm md:text-base uppercase tracking-wide">
                            {data.tagline}
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 leading-tight">
                            {data.title}
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            {data.description}
                        </p>
                        <Link
                            href={data.cta.href}
                            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold text-base md:text-lg group transition-colors"
                        >
                            {data.cta.label}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}