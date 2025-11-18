import InnerBanner from "@/components/common/InnerBanner";
import React, { Suspense } from "react";
import NewsBox from "@/components/News/NewsBox";
import Contact from "@/components/home/Contact";
import { Search } from "lucide-react";
import Input from "@/components/ui/input";
import SubscriptionForm from "@/components/common/subscription";
import NewsTags from "@/components/News/NewsTags";
import RecentNews from "@/components/News/RecentNews";
import Categories from "@/components/News/Categories";
import NewsSearchBar from "@/components/News/NewsSearchBar";
import NewsBoxSkeleton from "@/components/News/NewsBoxSkeleton";
import RecentNewsSkeleton from "@/components/News/RecentNewsSkeleton";
import CategoriesSkeleton from "@/components/News/CategoriesSkeleton";

interface NewsPageProps {
  searchParams: {
    page?: string;
    search?: string;
    tag?: string;
    category?: string;
  };
}

export default async function News({ searchParams }: NewsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";
  const tagSlug = searchParams.tag || "";
  const categorySlug = searchParams.category || "";
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
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
              <Suspense fallback={<NewsBoxSkeleton />}>
                <NewsBox type={"news"} currentPage={currentPage} />
              </Suspense>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <NewsSearchBar
                placeholder={data?.content?.sidebar?.searchHeading}
                initialSearch={searchQuery}
              />

              <NewsTags
                type="news"
                heading={data?.content?.sidebar?.tagsHeading}
              />

              <Suspense fallback={<RecentNewsSkeleton heading={data?.content?.sidebar?.recentHeading} />}>
                <RecentNews
                  type="news"
                  heading={data?.content?.sidebar?.recentHeading}
                />
              </Suspense>

              <Suspense fallback={<CategoriesSkeleton heading={data?.content?.sidebar?.categoriesHeading} />}>
                <Categories
                  type="news"
                  heading={data?.content?.sidebar?.categoriesHeading}
                />
              </Suspense>

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
