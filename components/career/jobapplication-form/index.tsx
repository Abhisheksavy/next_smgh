import React from "react";
import stepfromdata from "@/public/data/stepform.json";
import MultistpeForm from "./multistepform";
import InnerBanner from "@/components/common/InnerBanner";
export default async function JobApplicationForm() {
  const data1 = stepfromdata;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/careers`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch  data");

  const { data } = await res.json();

  const smghAcademy = data?.content;
  console.log(smghAcademy);

  return (
    <>
      <InnerBanner data={data?.banner} />
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="form-container bg-primary/3 section-padding spacing-x rounded-md">
            <div className="text-center">
              <h2 className="commonTitle">Job Application Form</h2>
            </div>
            <MultistpeForm config={smghAcademy} />
          </div>
        </div>
      </section>
    </>
  );
}
