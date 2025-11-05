import React from "react";
import BreadCrumb from "../ui/breadCrumb";
import { cn } from "@/utils/twMerge";

const InnerBanner = ({ data }: { data: any }) => {
     return (
          <section className="innerBanner min-h-50 bg-cover bg-no-repeat bg-center relative overflow-hidden 
          before:content-[''] before:absolute before:inset-0 before:bg-white  before:opacity-50  before:z-0
          after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(268.24deg,rgba(229,228,232,0.8)_20.47%,rgba(235,234,239,0)_39.27%)] after:z-1 after:rotate-180" style={{ backgroundImage: `url(${data?.backgroundImage})` }} >
               <div className="absolute left-0 top-0 w-60 h-60 bg-secondary opacity-30 z-3 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute right-0 bottom-0 w-60 h-60 bg-primaryGreen opacity-50 z-3 rounded-full translate-x-1/2 translate-y-1/2"></div>
               <div className="py-19 container relative z-3">
                    <BreadCrumb />
                    <h1 className="mainTitle mb-0!">{data?.title}</h1>
                    {data?.description && (
                         <p className="text-foreground font-normal text-base">
                              {data?.description}
                         </p>
                    )}
               </div>
               <div className="imageBorderBottomAbs z-4!"></div>
          </section>
     );
};

export default InnerBanner;
