"use client";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

interface Tag {
  name: string;
  slug: string;
  link?: string;
}
export default function NewsTags({
  type,
  heading,
  activeTag,
}: {
  type: string;
  heading?: string;
  activeTag?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/tags`,
  //   {
  //     next: { revalidate: 10 },
  //   }
  // );
  // if (!res.ok) throw new Error("Failed to fetch tags");

  // const { data } = await res.json();

  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/tags`
        );
        if (!res.ok) throw new Error("Failed to fetch tags");
        const { data } = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [type]);

  const handleTagClick = (tagSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeTag === tagSlug) {
      // If clicking active tag, remove it
      params.delete("tag");
    } else {
      params.set("tag", tagSlug);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="p-5 border rounded-md border-primary/20">
        <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
          {heading}
        </h2>
        <p className="text-sm text-gray-500">Loading tags...</p>
      </div>
    );
  }

  return (
    <div className="p-5 border rounded-md border-primary/20">
      <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags?.map((item: any, index: number) => {
          return (
            <button
              onClick={() => handleTagClick(item.slug)}
              key={index}
              className="px-3 py-2 border rounded-md border-black/14 text-dark/60 font-normal text-base leading-none hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
            >
              {item?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
