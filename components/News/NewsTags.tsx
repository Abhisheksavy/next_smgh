export default async function NewsTags({
  type,
  heading,
}: {
  type: string;
  heading?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${type}/tags`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch tags");

  const { data } = await res.json();

  return (
    <div className="p-5 border rounded-md border-primary/20">
      <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-2">
        {data?.map((item: any, index: number) => {
          return (
            <a
              href={item?.link}
              key={index}
              className="px-3 py-2 border rounded-md border-black/14 text-dark/60 font-normal text-base leading-none hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
            >
              {item?.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
