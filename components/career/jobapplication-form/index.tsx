import React from "react";
import stepfromdata from "@/public/data/stepform.json";
import MultistpeForm from "./multistepform";
const JobApplicationForm = async () => {
  const data = stepfromdata;
  console.log(data);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto py-10 px-15.5">
        <h2 className="text-[#006980] font-medium text-3xl">
          Job Application Form
        </h2>
        <MultistpeForm data={data} />
      </div>
    </section>
  );
};

export default JobApplicationForm;
