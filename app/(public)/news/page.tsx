import InnerBanner from "@/components/common/InnerBanner";
import React from "react";
import NewsBox from "@/components/News/NewsBox";
import Contact from "@/components/home/Contact";
import { Search } from "lucide-react";
import Input from "@/components/ui/input";
import SubscriptionForm from "@/components/common/subscription";
import NewsTags from "@/components/News/NewsTags";
import RecentNews from "@/components/News/RecentNews";
import Categories from "@/components/News/Categories";

interface NewsPageProps {
  searchParams: { page?: string };
}

export default async function News({ searchParams }: NewsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/news`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch news");

  const { data } = await res.json();
  console.log(data);

  return (
    <>
      <InnerBanner data={data?.content?.banner} />
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-8 flex flex-col gap-15">
              <NewsBox type={"news"} currentPage={currentPage} />
            </div>

            <div className="col-span-4 flex flex-col gap-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={data?.content?.sidebar?.searchHeading}
                  className="w-full h-12.5 px-5 py-3.5 rounded-md border-0 bg-primary text-white"
                />
                <button className="absolute right-0 top-0 bottom-0 pr-5">
                  <Search className="text-secondary w-4 h-4" />
                </button>
              </div>

              <NewsTags
                type="news"
                heading={data?.content?.sidebar?.tagsHeading}
              />

              <RecentNews
                type="news"
                heading={data?.content?.sidebar?.recentHeading}
              />

              <Categories
                type="news"
                heading={data?.content?.sidebar?.categoriesHeading}
              />

              <div className="p-5 border rounded-md border-primary/20">
                <h2 className="text-primary font-medium text-2xl leading-none mb-4.5">
                  Subscription
                </h2>
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact
      // isLoading={isLoading}
      // isError={isError}
      // error={error}
      />
    </>
  );
}
