import { Link } from "lucide-react";
import React from "react";

const VirtualTour = ({ data, isLoading, isError, error }: any) => {
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
          <section className="secton-padding  bg-center bg-cover bg-no-repeat" style={{backgroundImage:`url(https://placehold.co/1920x768)`}}>
               <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="rounded-sm bg-[#006980] text-center py-11">
                         <div className="mx-auto max-w-180.5 flex flex-col gap-8">
                              <div className="flex flex-col gap-2">
                                   <h2 className="commonTitle font-medium! text-white!">
                                        {data.title}
                                   </h2>
                                   <p className=" leading-relaxed text-[#FCFEFE]/80">{data.description}</p>
                              </div>
                              <div className="flex items-center justify-center gap-4">
                                   <Link
                                        href={data?.cta?.href || "/"}
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                                   >
                                        {data?.cta?.label}
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default VirtualTour;
