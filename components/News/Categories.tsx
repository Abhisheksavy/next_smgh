import React from "react";
import CounterLink from "../common/counterLink";

export default async function Categories({
  type,
  heading,
}: {
  type: string;
  heading?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/categories`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch recents");

  const { data } = await res.json();

  return (
    <div className="p-5 border rounded-md border-primary/20">
      <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
        {heading}
      </h2>
      <div className="flex flex-col gap-2">
        {data &&
          data.length > 0 &&
          data?.map((item: any, index: number) => {
            return <CounterLink key={index} data={item} />;
          })}
      </div>
    </div>
  );
}
