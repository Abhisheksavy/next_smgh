import React from "react";

const QualityCare = ({ qualityCare }: any) => { 
     return (
          <section
               className="section-padding relative before:bg-primary/60 before:inset-0 before:absolute before:z-1"
               style={{
                    backgroundImage: `url(${qualityCare?.backgroundImage})`,
               }}>
               <div className="container relative z-2">
                    <h2 className="commonTitle text-white! font-medium text-center mb-4.5!">
                         {qualityCare?.title}
                    </h2>
                    <div className="space-y-7">
                         <div className="text-center flex flex-col gap-2.5">
                              <h3 className="text-white font-semibold text-[1.375rem] leading-none">

                                   SMMC is committed to the ongoing improvement of the quality
                                   and safety of care provided to its patients.
                              </h3>
                              <p className="text-white text-lg leading-[1.4] ">

                                   The hospital’s main focus is to reinforce a culture and
                                   environment where all employees are patient-focused and
                                   provide the highest quality care services in accordance with
                                   national and international best practices. By adopting the
                                   concept of Continuous Quality Improvement (CQI), the hospital
                                   strives to better meet client needs and exceed their
                                   expectations. Our patients and staff are central to our CQI.
                                   Through tracking key quality and safety indicators, we are
                                   dedicated to improved patient outcomes.
                              </p>
                         </div>
                         <div className="text-center flex flex-col gap-2.5">
                              <h3 className="text-white font-semibold text-[1.375rem] leading-none">
                                   {" "}
                                   JCI Accreditation
                              </h3>
                              <p className="text-white text-lg leading-[1.4] ">
                                   As we shift our organization towards a new General Hospital,
                                   we are aiming to become a Joint Commission International (JCI)
                                   accredited organization which is considered the gold standard
                                   in global health care. JCI-accredited organizations are
                                   rigorously evaluated and must demonstrate committed compliance
                                   to quality care delivery based on the most current
                                   evidence-based practice standards. This means SMMC is working
                                   to improve and implement high-quality care initiatives,
                                   patient-safe policies, practices, and procedures required to
                                   meet those standards.
                              </p>
                         </div>
                    </div>
               </div>
          </section>
     )
};

export default QualityCare;
