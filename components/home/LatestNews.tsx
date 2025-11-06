import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BtnArrowIcon from "@/icons/home-icons/btnArrow";

const LatestNews = (
     { data, isLoading, isError, error }: any) => {
     
     if (isLoading) {
          return (
               <div className="section-padding">
                    <div className="container">
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
          <section className="section-padding bg-secondary/2">
               <div className="container">
                    <div className="text-center mb-12">
                         <p className="tagline mb-2">
                              {data.tagline}
                         </p>
                         <h2 className="text-3xl md:text-4xl font-bold text-teal-700 leading-[1.4]">
                              {data.title}
                         </h2>
                    </div>

                    <div className="grid grid-cols-12 gap-5 mb-7">
                         {data.newsData.map((item: any, index: number) => {
                              return (
                                   <div key={index} className="col-span-6 flex flex-row bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.05)]">

                                        {/* <Image /> */}
                                        <div className="flex-[0_0_auto] w-40">
                                             <Image width={160} height={160} className="w-full h-full object-cover block" src={item.img || ""} alt="" /> 
                                        </div>

                                        <div className="py-5 pl-5 pr-9 flex flex-col gap-6">
                                             <div className="flex flex-col gap-1">
                                                  <span className="text-[#1F9F9E] text-sm font-normal">
                                                       {item.published || "Monday 05, September 2021 | By Author"}
                                                  </span>
                                                  <p className="text-foreground  text-lg font-normal">
                                                       {item.newsTitle || "COLORS Donates to SMMC’s OBGYN Ward"}
                                                  </p>
                                             </div>

                                             <Link
                                                  className="text-secondary text-base font-medium mt-auto inline-flex items-center gap-2"
                                                  href={item.link || "#"}
                                             >
                                                  Read more <BtnArrowIcon className="text-primary w-3"  />
                                             </Link>
                                        </div>
                                   </div>

                              )
                         })}

                    </div>

                    <div className="text-center">
                         <Button variant="default" >View All Latest News   </Button>
                    </div>
               </div>
          </section>
     );
};

export default LatestNews;
