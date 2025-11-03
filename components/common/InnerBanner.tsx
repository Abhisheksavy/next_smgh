import React from "react";
import BreadCrumb from "../ui/breadCrumb";
import { cn } from "@/utils/twMerge";

const InnerBanner = ({ data }: { data: any }) => {
  return (
    <div
      //   className={cn(`bg-[url(${data?.backgroundImage})]`)}
      style={{ backgroundImage: `url(${data?.backgroundImage})` }}
    >
      <div className="py-19 pl-45">
        <BreadCrumb />
        <h1 className="text-[#006980] text-5xl font-bold">{data?.title}</h1>
        {data?.description && (
          <p className="text-[#212124] font-normal text-base">
            {data?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default InnerBanner;
