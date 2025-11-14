import Image from "next/image";
import React from "react";

export default async function RecentNews({
  type,
  heading,
}: {
  type: string;
  heading?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/recents`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch recents");

  const { data } = await res.json();
  console.log(data);

  return (
    <div className="p-5 border rounded-md border-primary/20">
      <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2">
        {data?.data.map((item: any, index: number) => {
          return (
            <a href={item?.link} key={index} className="flex gap-2.5">
              <div className="w-15 h-15 flex-[0_0_auto] rounded overflow-hidden">
                <Image
                  src={item?.featured_image_url}
                  alt="image"
                  height={500}
                  width={400}
                  className="block w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-secondary text-xs"> {item?.title}</h3>
                <p className="text-sm"> {item?.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
