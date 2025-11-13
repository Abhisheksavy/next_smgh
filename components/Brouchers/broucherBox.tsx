import { cn } from "@/utils/twMerge";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import PaginationWrapper from "../ui/PaginationWrapper";

interface NewsBoxProps {
  type?: string;
  currentPage: number;
  searchQuery?: string;
}

export default async function BroucherBox({
  type,
  currentPage,
  searchQuery = "",
}: NewsBoxProps) {
  const secondRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_BASE_URL
    }/${type}/get-all-posts?page=${currentPage}&per_page=${"10"}&search=${searchQuery}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!secondRes.ok) throw new Error("Failed to fetch news");

  const { data: data1 } = await secondRes.json();
  const brochures = data1?.data || [];
  const totalPages = data1?.last_page || 1;
  console.log("searchQuery", searchQuery, brochures);

  return (
    <>
      <div className="grid grid-cols-12 gap-7">
        {brochures &&
          brochures.length > 0 &&
          brochures.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={cn(
                  " flex flex-col col-span-4 first:col-span-8 first:[&>div]:flex-col-reverse gap-6 bg-primary/3 p-3.5 pb-10 rounded "
                )}
              >
                <div className=" flex flex-col gap-4.5">
                  <div className="">
                    <h3 className="text-secondary text-lg font-medium mb-1.5">
                      {item?.title}
                    </h3>
                    <div className="flex gap-2 items-center justify-start">
                      <Calendar className="text-secondary w-4 h-4" />
                      <span className="text-xs">
                        {item?.published_at_human}
                      </span>
                    </div>
                  </div>
                  <a
                    download
                    href={"abc"}
                    className="h-50 w-full rounded overflow-hidden block"
                  >
                    <Image
                      alt=""
                      width={400}
                      height={400}
                      src={item?.featured_image_url}
                      className="w-full h-full object-cover object-center"
                    />
                  </a>
                </div>
                <a
                  download
                  href={item?.pdf_url || item?.featured_image_url}
                  className="text-primary text-sm inline-flex items-center gap-1"
                >
                  Click Image to Download Brochure{" "}
                  <ArrowRight className="w-4 h-4" />{" "}
                </a>
              </div>
            );
          })}
      </div>
      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationWrapper
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
