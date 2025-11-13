import BroucherBox from "@/components/Brouchers/broucherBox";
import InnerBanner from "@/components/common/InnerBanner";
import Contact from "@/components/home/Contact";
import SearchBar from "@/components/ui/SearchBar";
// import smghAcademy from "@/public/data/smghacademy.json";

interface NewsPageProps {
  searchParams: { page?: string; search?: string };
}

export default async function Brochures({ searchParams }: NewsPageProps) {
  searchParams = await searchParams;

  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/brochures`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch news");

  const { data: data1 } = await res.json();

  return (
    <>
      <InnerBanner data={data1?.content?.banner} />
      <section className="section-padding">
        <div className="container">
          <div className="mb-15">
            <h2 className="text-center text-foreground font-bold text-2xl mb-2">
              {data1?.content?.search?.heading}
            </h2>
            {/* <div className=" w-full max-w-217 mx-auto">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-secondary" />
                <Input
                  type="text"
                  placeholder={data1?.content?.search?.placeholder}
                  className="w-full d-block bg-primary/4 rounded-4xl pl-13 pr-18"
                />
                <span className="absolute top-1/2 right-5 text-xl font-medium -translate-y-1/2 capitalize text-tealgreen">
                  {data1?.content?.search?.buttonLabel}
                </span>
              </div>
            </div> */}
            <SearchBar
              placeholder={data1?.content?.search?.placeholder}
              buttonLabel={data1?.content?.search?.buttonLabel}
              initialSearch={searchQuery}
            />
          </div>
          <BroucherBox
            searchQuery={searchQuery}
            type="brochure"
            currentPage={currentPage}
          />
        </div>
      </section>
      {!!data1?.content?.contact && <Contact />}
    </>
  );
}
