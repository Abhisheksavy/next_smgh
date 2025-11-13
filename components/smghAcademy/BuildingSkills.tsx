import Image from "next/image";
import React from "react";

const BuildingSkills = ({ data }: { data: any }) => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-5">
            <Image src={data?.image} width={410} height={510} alt="people" className="w-full h-auto block max-w-full"/>
          </div>

          <div className="col-span-7">
            <div className="space-y-6 col-span-6 max-w-165 mx-auto mb-16">
              <p className="tagline mb-1.5">{data.tagline}</p>
              <h2 className="commonTitle ">{data.title}</h2>
              <p className="text-gray-600 text-base  leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingSkills;
