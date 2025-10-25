'use client'


import { useGetHomepageData } from "@/app/queries/useHomepage";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
    const { data, isLoading, isError, error }: any = useGetHomepageData();

    if (isLoading) {
        return (
            <div className="min-h-screen">
                {/* Banner Skeleton */}
                <div className="relative h-[600px] bg-gray-200 animate-pulse" />

                {/* Quick Links Skeleton */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-center">
                    Failed to load homepage: {error?.message || "Unknown error"}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-teal-50 to-teal-100 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={data.banner.backgroundImage}
                        alt="Banner Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full opacity-20 translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
                    <div className="max-w-2xl">
                        <p className="text-teal-600 font-semibold text-sm md:text-base mb-4 uppercase tracking-wide">
                            {data.banner.tagline}
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-800 mb-6 leading-tight">
                            {data.banner.title}
                        </h1>
                        <Link
                            href={data.banner.cta.href}
                            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            {data.banner.cta.label}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="relative -mt-16 z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {data.banner.quickLinks.map((link: any) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className="group bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-between"
                            >
                                <span className="text-lg font-semibold">{link.title}</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}