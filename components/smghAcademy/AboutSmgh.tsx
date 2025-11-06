import Image from "next/image";
import React from "react";

const AboutSmgh = ({ data }: { data: any }) => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="space-y-6 col-span-6 max-w-165 text-center mx-auto mb-16">
            <p className="tagline mb-1.5">{data.tagline}</p>
            <h2 className="commonTitle ">{data.title}</h2>
            <p className="text-gray-600 text-base  leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="col-span-6">
            <Image src={data?.image} height={500} width={400} alt="abc" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSmgh;
