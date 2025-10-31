
import ClockIcon from "@/icons/home-icons/clock-icon";
import Link from "next/link";
import React from "react";
import Input from "../ui/input";
import ImageInput from "../ui/image";

const Career = ({ data, isLoading, isError, error }: any) => {
  // if (isLoading) {
  //   return (
  //     <div className="secton-padding">
  //       <div className="max-w-7xl mx-auto px-4">
  //         <div className="text-center mb-12">
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
  console.log(data);

  return (
    <section className="secton-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-left mb-12">
          <p className="tagline">
            {data.tagLine}
          </p>
          <h2 className="text-left commonTitle font-medium!">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-12 2xl:gap-24 gap-10">
          <div className="col-span-6 ">
            {data.careerOptions.map((carrer: any, index: number) => {
              return (
                <div className="border-t py-8 border-[#EAECF0]" key={index}>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-secondary text-lg font-medium mb-2">
                      {carrer.careerName}
                    </h4>
                    <p className="text-[#212124] text-base font-normal ">
                      {carrer.careerDescription}
                    </p>
                  </div>
                  <div className="flex flex-row mt-6 gap-2 items-center">
                    <ClockIcon />
                    <span className="text-[#212124] text-base font-normal">
                      {carrer.duration}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-row gap-2.5">
              <Link
                // href={data.jobsCta.href ?? "/"}
                href={"/"}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {data?.jobsCta?.label}
              </Link>
              <Link
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                // href={data.exploreCta.href ?? "/"}
                href={"/"}
              >
                {data?.exploreCta?.label}
              </Link>
            </div>
          </div>

          <div className="col-span-6 rounded-sm bg-[#1F9F9E] py-16 px-8.5">
            <h6 className="text-3xl font-medium text-center text-white  mb-7">
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
              <ImageInput  label="Upload Resume / CV" name="resume" previewUrl="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
