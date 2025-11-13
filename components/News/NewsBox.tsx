import React from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import PaginationWrapper from "../ui/PaginationWrapper";
interface NewsBoxProps {
  type?: string;
  currentPage: number;
}
export default async function NewsBox({ type, currentPage }: NewsBoxProps) {
  const perPage = 3;
  const secondRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/get-all-posts?page=${currentPage}&per_page=${perPage}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!secondRes.ok) throw new Error("Failed to fetch second API");

  const { data } = await secondRes.json();

  const posts = data?.data || [];
  const totalPages = data?.last_page || 1;
  const total = data?.total || 0;

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts?.map((data: any, index: any) => {
          return (
            <div key={index} className="flex flex-col items-start gap-5">
              <div className="w-full">
                <Image
                  src={data?.featured_image_url}
                  alt="image"
                  height={500}
                  width={400}
                  className="block w-full h-auto rounded"
                />
              </div>
              <div className="w-full">
                <div className="flex gap-6 mb-2">
                  <div className="flex gap-2 items-center justify-center">
                    <Calendar className="text-secondary w-4 h-4" />
                    <span> {data?.published_at_human}</span>
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <User className="text-secondary w-4 h-4" />
                    <span>By {data?.author?.name}</span>
                  </div>
                </div>
                <h2 className=" text-primary font-medium text-2xl leading-none">
                  {data?.title}
                </h2>
                <p className="text-[#000000] font-normal text-base leading-normal mt-2.5 line-clamp-4">
                  {data?.content}
                </p>
              </div>
              <Button href={data?.link} variant="default">
                Read More <ArrowRight />
              </Button>
            </div>
          );
        })}

      {totalPages > 1 && (
        <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}
