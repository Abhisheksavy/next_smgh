import Image from "next/image";
import React from "react";

const Health = ({ data }: { data: any }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-16 md:py-24">
        <div className="grid grid-cols-12 gap-9.5">
          <div className="col-span-5 w-125 h-100 rounded-sm">
            <Image
              src={data?.image}
              className="object-cover w-full h-full"
              height={500}
              width={400}
              alt="image"
            />
          </div>

          <div className="col-span-7 mt-10.5">
            <div className="space-y-1">
              <p className="tagline">
                {data.tagline}
              </p>
              <h2 className="commonTitle">
                {data.title}
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-6 gap-x-10 gap-y-4 mb-8">
              {data?.healthBenefits.map((health: any, index: number) => {
                return (
                  <div key={index} className="col-span-6 flex flex-row items-center gap-1">
                    <div className="rounded-full bg-[#03AD92] h-4 w-4" />
                    <p className="text-[#000000] font-normal text-base leading-normal">
                      {health}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[#000000] font-normal text-base">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
