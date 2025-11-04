

import RightArrowIcon from "@/icons/home-icons/arrowRight";
import { cn } from "@/utils/twMerge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Banner({ data, isLoading, isError, error }: any) {

     
     const bgColors = ["bg-secondary", "bg-primary", "bg-tealgreen", "bg-primaryGreen"];
     if (isLoading) {
          return (
               <div>
                    {/* Banner Skeleton */}
                    <div className="relative h-[600px] bg-gray-200 animate-pulse" />

                    {/* Quick Links Skeleton */}
                    <div className="container py-12">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {[1, 2, 3, 4].map((i) => (
                                   <div
                                        key={i}
                                        className="h-32 bg-gray-200 animate-pulse rounded-lg"
                                   />
                              ))}
                         </div>
                    </div>
               </div>
          );
     }

     if (isError || !data) {
          return (
               <div className="min-h-[400px] flex items-center justify-center">
                    <p className="text-red-500 text-center">
                         Failed to load homepage: {error?.message || "Unknown error"}
                    </p>
               </div>
          );
     }
     console.log(data);

     return (
          <div>
               {/* Hero Banner */}
               <section className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-teal-50 to-teal-100 overflow-hidden">
                    <div className="absolute inset-0">
                         <Image
                              src={data?.backgroundImage}
                              alt="Banner Background"
                              fill
                              className="object-cover opacity-90"
                              priority
                         />
                         {/* Decorative Circles */}
                         <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
                         <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full opacity-20 translate-x-1/3 translate-y-1/3" />
                    </div>

                    <div className="relative container h-full flex items-center">
                         <div className="max-w-xl">
                              <p className="tagline">
                                   {data.tagline}
                              </p>
                              <h1 className="mainTitle">
                                   {data.title}
                              </h1>
                              <Link
                                   href={"/"}
                                   className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-medium transition-all transform shadow-lg duration-300 ease-in-out"
                              >
                                   {data?.cta?.label}
                              </Link>
                         </div>
                    </div>
               </section>

               {/* Quick Links */}
               <section className="relative -mt-10 z-10">
                    <div className="container">
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                              {data.quickLinks.map((link: any, index: number) => (
                                   <Link
                                        key={index}
                                        // href={link?.href}
                                        href={"/"}
                                        className={cn("group bg-teal-600 hover:bg-teal-700 text-white px-5 py-7 rounded-lg transition-all transform  duration-300 ease-in-out shadow-lg flex items-center justify-between",
                                            bgColors[index % bgColors.length]
                                        )}
                                   >
                                        <span className="text-lg font-regular">{link.title}</span>
                                        <RightArrowIcon className="w-6  group-hover:translate-x-2 group-hover:rotate-405  transition-transform duration-300 ease-in-out" />
                                   </Link>
                              ))}
                         </div>
                    </div>
               </section>
          </div>
     );
}
