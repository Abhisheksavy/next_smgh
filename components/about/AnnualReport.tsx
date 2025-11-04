"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
const AnnualReport = ({ annualReport }: any) => {
     const [activeIndex, setActiveIndex] = useState<number>(0);
     const [activeTab, setActiveTab] = useState<any | null>(null);

     const handleToggle = (tab: any, index: number) => {
          setActiveTab(tab);
          setActiveIndex(index);
     };

     useEffect(() => {
          if (annualReport?.reports?.length > 0) {
               setActiveTab(annualReport.reports[0]);
          } else {
               setActiveTab(annualReport?.reports[0]);
          }
     }, [annualReport]);

     return (
          <section className="section-padding ">
               <div className="container">
                    <div className="mb-7">
                         <p className="tagline mb-1.5">{annualReport?.year}</p>
                         <h2 className="commonTitle ">Annual Report </h2>
                    </div>
                    <div className="grid grid-cols-12 2xl:gap-24 gap-10">
                         <div className="col-span-6 ">
                              {annualReport?.reports.map(
                                   (content: any, index: number) => {
                                        return (
                                             <div
                                                  className="border-t py-8 border-[#EAECF0]"
                                                  key={index}
                                                  onClick={() => handleToggle(content, index)}
                                             >
                                                  <div className="flex flex-col gap-2">
                                                       {" "}
                                                       {/* this button will toggle like accordian */}
                                                       <h3 className="text-secondary text-lg font-medium">
                                                            {activeIndex === index ? "−" : "+"} Annual Report
                                                            2024 {content?.year}
                                                       </h3>
                                                       {content.file && <div className={`overflow-hidden transition-all duration-300 mt-2 ${activeIndex === index
                                                            ? "max-h-40 mt-3 opacity-100"
                                                            : "max-h-0 opacity-0" }`}>
                                                           <a href={content.file} download className="text-foreground flex gap-2">
                                                                 <Download className="text-secondary" />
                                                                 <span className="text-foreground text-base font-normal">
                                                                      Download Annual Report {content?.year}{" "}
                                                                      {/* {carrer.duration} */}
                                                                 </span>
                                                            </a> 
                                                       </div> }
                                                  </div>
                                             </div>
                                        );
                                   }
                              )}
                         </div>
                         <div className="col-span-6 ">
                              {/* image to change on cick of button? */}
                              <img
                                   src={activeTab?.reportImage}
                                   alt=""
                                   className="-rotate-6"
                              />
                         </div>
                    </div>
               </div>
          </section>
     )
};

export default AnnualReport;
