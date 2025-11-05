import React from "react";
import stepfromdata from "@/public/data/stepform.json";
import MultistpeForm from "./multistepform";
import InnerBanner from "@/components/common/InnerBanner";
const JobApplicationForm = async () => {
     const data = stepfromdata;


     return (
          <>
               <InnerBanner data={data?.banner} />
               <section className="section-padding">
                    <div className="container mx-auto">
                         <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
                              <div className="text-center">
                                   <h2 className="commonTitle">Job Application Form</h2>
                              </div>
                              <MultistpeForm config={data} />
                         </div>
                    </div>
               </section>
          </>
     );
};

export default JobApplicationForm;
