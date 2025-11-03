"use client";
import Health from "@/components/about/Health";
import InnerBanner from "@/components/common/InnerBanner";
import { Button } from "@/components/ui/button";

import data from "@/public/data/aboutus.json";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const About = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/home`);
  console.log(data);

  // const res = await fetch(`/data/aboutus.json`);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch layout data");
  // }
  // const { data } = await res.json();
  // if (!data) return null;
  // const homePageData = data.content;
  const [activeIndex, setActiveIndex] = useState<number>(0); // open first by default
  const [activeTab, setActiveTab] = useState<any | null>(null);

  const handleToggle = (tab: any, index: number) => {
    setActiveTab(tab);
    setActiveIndex(index);
  };
  useEffect(() => {
    if (data?.annualReport?.reports?.length > 0) {
      setActiveTab(data?.annualReport.reports[0]);
    } else {
      setActiveTab(data?.annualReport?.reports[0]);
    }
  }, [data]);

  console.log("about page", data);
  console.log("activeTab", activeTab);

  return (
    <div>
      <InnerBanner data={data?.banner} />
      <Health data={data?.health} />

      <div className="flex flex-col gap-2.5">
        <div className="text-center text-2xl font-medium leading-[100%] ">
          {" "}
          Cookie Preferences
        </div>
        <div className="mb-1">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="default">Accept All Cookies</Button>
          <Button variant="outline">Recect All</Button>
        </div>
      </div>
      {data.qualityCare && (
        <section
          className="section-padding relative before:bg-primary/60 before:inset-0 before:absolute before:z-1"
          style={{
            backgroundImage: `url(${data.qualityCare?.backgroundImage})`,
          }}
        >
          <div className="container relative z-2">
            <h2 className="commonTitle text-white! font-medium text-center mb-4.5!">
              {data.qualityCare?.title}
            </h2>
            <div className="space-y-7">
              <div className="text-center flex flex-col gap-2.5">
                <h3 className="text-white font-semibold text-[1.375rem] leading-none">
                  {" "}
                  SMMC is committed to the ongoing improvement of the quality
                  and safety of care provided to its patients.
                </h3>
                <p className="text-white text-lg leading-[1.4] ">
                  {" "}
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
      )}
      <section className="section-padding ">
        <div className="container relative z-2">
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-4 bg-[red]">sdsdsd</div>
            <div className="col-span-4 bg-[red]">sdsdsd</div>
            <div className="col-span-8 bg-[red]">sdsdsd</div>
          </div>
        </div>
      </section>

      {data?.leadership && (
        <section className="section-padding ">
          <div className="container">
            <div className="text-center">
              <p className="tagline mb-1.5">{data?.leadership?.tagline}</p>
              <h2 className="commonTitle ">{data?.leadership?.title}</h2>
              <p className="text-gray-600 text-base  leading-relaxed">
                {data?.leadership?.description}
              </p>
            </div>
          </div>
        </section>
      )}
      {data?.annualReport && (
        <section className="section-padding ">
          <div className="container">
            <div className="">
              <p className="tagline mb-1.5">{data?.annualReport?.year}</p>
              <h2 className="commonTitle ">Annual Report </h2>
            </div>
            <div className="grid grid-cols-12 2xl:gap-24 gap-10">
              <div className="col-span-6 ">
                {data.annualReport?.reports.map(
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
                          <h3 className="text-secondary text-lg font-medium mb-2">
                            {activeIndex === index ? "−" : "+"} Annual Report
                            2024 {content?.year}
                          </h3>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeIndex === index
                                ? "max-h-40 mt-3 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <a
                              href={content.url}
                              download
                              className="text-[#212124] flex gap-2 "
                            >
                              <Download className="text-secondary" />
                              <span className="text-[#212124] text-base font-normal">
                                Download Annual Report {content?.year}{" "}
                                {/* {carrer.duration} */}
                              </span>
                            </a>
                          </div>
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
      )}
    </div>
  );
};
export default About;
