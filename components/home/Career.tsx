
import ClockIcon from "@/icons/home-icons/clock-icon";
import Link from "next/link";
import React from "react";
import Input from "../ui/input";
import ImageInput from "../ui/image";
import { Button } from "../ui/button";

const Career = ({ data, isLoading, isError, error }: any) => { 
  // if (isLoading) {
  //   return (
  //     <div className="section-padding">
  //       <div className="container">
  //         <div className="text-center mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
  //           <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
  //           <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
  //         </div>
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  //           <div className="space-y-6">
  //             <div className="h-8 bg-gray-200 animate-pulse rounded" />
  //             <div className="h-24 bg-gray-200 animate-pulse rounded" />
  //             <div className="grid grid-cols-2 gap-4">
  //               {[1, 2, 3, 4].map((i) => (
  //                 <div
  //                   key={i}
  //                   className="h-24 bg-gray-200 animate-pulse rounded"
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //           <div className="space-y-6">
  //             <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
  //             <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError || !data) {
  //   return (
  //     <div className="min-h-[400px] flex items-center justify-center">
  //       <p className="text-red-500 text-center">
  //         Failed to load features: {error?.message || "Unknown error"}
  //       </p>
  //     </div>
  //   );
  // } 

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-left mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
          <p className="tagline">
            {data.tagLine}
          </p>
          <h2 className="text-left commonTitle font-medium!">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-24 items-center">
          <div className="col-span-12 md:col-span-6 ">
            {data.careerOptions.map((carrer: any, index: number) => {
              return (
                <div className="border-t py-3 md:py-4 lg:py-5 2xl:py-8 border-[#EAECF0]" key={index}>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-secondary text-lg font-medium mb-0 md:mb-2">
                      {carrer.careerName}
                    </h4>
                    <p className="text-foreground text-base font-normal ">
                      {carrer.careerDescription}
                    </p>
                  </div>
                  <div className="flex flex-row mt-4 md:mt-6 gap-2 items-center">
                    <ClockIcon />
                    <span className="text-foreground text-base font-normal">
                      {carrer.duration}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2.5 mt-4">
              {/* <Link
                // href={data.jobsCta.href ?? "/"}
                href={data?.cta1.href ?? "/"}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {data?.cta1.label}
              </Link> */}
              <Button  href={data?.cta1.href ?? "/"}>{data?.cta1.label}</Button>
              <Button variant="outline" href={data?.cta2.href ?? "/"}>{data?.cta2.label}</Button>
              {/* <Link
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                // href={data.exploreCta.href ?? "/"}
                href={data?.cta2.href ?? "/"}
              >
                {data?.cta2.label}
              </Link> */}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 rounded-sm bg-[#1F9F9E] py-7 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16 px-4 lg:px-5 xl:px-7 2xl:px-8.5">
            <h6 className="text-3xl font-medium text-center text-white mb-7">
              {data?.jobApplyFormHeading}
            </h6>
            <div className="flex flex-col gap-6">
              <Input
                className="w-full bg-white/28 pl-4.5"
                placeholder={data?.jobApplyForm?.fullName?.placeholder}
              />
              <Input
                className="w-full bg-white/28 pl-4.5"
                placeholder={data.jobApplyForm.email.placeholder}
              />
              <Input
                className="w-full bg-white/28 pl-4.5"
                placeholder={data.jobApplyForm.phone.placeholder}
              />
              <Input
                className="w-full bg-white/28 pl-4.5"
                placeholder={data.jobApplyForm.location.placeholder}
              />
              <Input
                className="w-full bg-white/28 pl-4.5"
                placeholder={data.jobApplyForm.positionApplied.placeholder}
              />
              {/*  */}
              <ImageInput inline={true} acceptedTypes="images/*" text="Upload Resume / CV" label="" name="resume" previewUrl="" className="inline-flex w-auto px-7 py-5.5 [&>span]:text-black border-primary rounded-xl border-dashed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
