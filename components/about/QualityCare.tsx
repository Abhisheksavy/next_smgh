import React from "react";

const QualityCare = ({ qualityCare }: any) => {
     return (
          <section
               className="section-padding relative before:bg-primary/60 before:inset-0 before:absolute before:z-1 bg-cover bg-no-repeat bg-center"
               style={{
                    backgroundImage: `url(${qualityCare?.backgroundImage})`,
               }}>
               <div className="container relative z-2">
                    <h2 className="commonTitle text-white! font-medium text-center mb-4.5!">
                         {qualityCare?.mainTitle}
                    </h2>
                    <div className="space-y-7">
                         <div className="text-center flex flex-col gap-2.5">
                              <h3 className="text-white font-semibold text-[1.375rem] leading-none">

                                   {qualityCare?.title1}
                              </h3>
                              <p className="text-white text-lg leading-[1.4] ">
                                   {qualityCare?.description1}
                              </p>
                         </div>
                         <div className="text-center flex flex-col gap-2.5">
                              <h3 className="text-white font-semibold text-[1.375rem] leading-none">
                                   {qualityCare?.title2}
                              </h3>
                              <p className="text-white text-lg leading-[1.4] ">   {qualityCare?.description2} </p>
                         </div>
                    </div>
               </div>
          </section>
     )
};

export default QualityCare;
