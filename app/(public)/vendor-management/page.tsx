import InnerBanner from "@/components/common/InnerBanner";
import Contact from "@/components/home/Contact";
import React from "react";

export default async function VendorMangement() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/vendor-management`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch news");

  const {
    data: { content },
  } = await res.json();
  console.log(content);

  return (
    <>
      <InnerBanner data={content?.banner} />
      <section className="section-padding">
        <div className="container mx-auto">
          <h3 className="text-[#006980] text-medium text-3xl">
            {content?.intro?.heading}
          </h3>
          <p className="mt-2 font-medium text-base">
            {" "}
            {content?.intro?.description}
          </p>
          {content?.bulletPoints.length > 0 &&
            content?.bulletPoints.map((bullet: any, index: number) => {
              return (
                <div key={index}>
                  {/* <div>
                    
                  </div> */}
                  <p className="font-medium text-base mt-4">{bullet?.text}</p>
                </div>
              );
            })}

          <div className="mt-12.5 grid grid-cols-12 gap-7.5">
            {content?.resources &&
              content?.resources?.items.length > 0 &&
              content?.resources?.items.map((item: any, index: number) => {
                return (
                  <div
                    className="bg-[#006980]/3 col-span-4 flex justify-center  items-center p-7.5 text-center rounded-sm"
                    key={index}
                  >
                    <p className="font-medium text-xl text-[#000000]">
                      {item?.title}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {!!content?.contact && <Contact />}
    </>
  );
}
