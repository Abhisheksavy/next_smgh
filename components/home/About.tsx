"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About({ data, isLoading, isError, error }: any) {
     if (isLoading) {
          return (
               <div className="section-padding">
                    <div className="container">
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
          <section className="section-padding bg-white">
               <div className="container">
                    <div className="flex flex-col items-center">
                         {/* Left Content */}
                         <div className="space-y-6 max-w-165 text-center mx-auto mb-16">
                              <p className="tagline mb-1.5">
                                   {data.tagline}
                              </p>
                              <h2 className="commonTitle ">
                                   {data.title}
                              </h2>
                              <p className="text-gray-600 text-base  leading-relaxed">
                                   {data.description}
                              </p>
                              <Link
                                   href={data?.cta?.href || "/"}
                                   className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold text-base md:text-lg group transition-colors"
                              >
                                   {data?.cta?.label}
                                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Link>
                         </div>

                         {/* Right Image */}
                         <div className="relative overflow-hidden shadow-xl  ">
                              <Image src={data.image} alt={data.title} width={1200}
                                   height={600} className="w-full  h-auto" />
                         </div>
                    </div>
               </div>
          </section>
     );
}
