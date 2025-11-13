import { cn } from "@/utils/twMerge";
import React from "react";

const Programs = ({ data }: { data: any }) => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="space-y-6 col-span-6 max-w-165 text-center mx-auto mb-16">
          <p className="tagline mb-1.5">{data.tagline}</p>
          <h2 className="commonTitle ">{data.title}</h2>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-12 gap-11">
            {data?.programs.map((program: any, index: any) => {
              return (
                <div
                  className={cn(
                    "p-11 bg-[#00698008] flex col-span-6 flex-col gap-2",
                    index % 2 !== 0 && "mt-10 -mb-10",  
                  )}
                  key={index}
                >
                    {}
                  <h3 className="text-[#03AD92] font-medium text-2xl">
                    {program?.title}
                  </h3>
                  <p className="text-[#212124] text-base font-normal">
                    {program?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
