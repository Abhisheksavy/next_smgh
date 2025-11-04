import Banner from "@/components/home/Banner";
import About from "@/components/home/About";
import FeaturedServices from "@/components/home/Features";
import Patients from "@/components/home/Patients";
import VirtualTour from "@/components/home/VirtualTour";
import Contact from "@/components/home/Contact";
import Career from "@/components/home/Career";
import LatestNews from "@/components/home/LatestNews";

export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/home`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  // if(!res.ok) throw new Error("Failed to fetch homepage data");

  const { data } = await res.json();

  if (!data) return null;
  const homePageData = data.content;
  console.log(homePageData);

  return (
    <div>
      <Banner
        data={homePageData.banner}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      />
      <About
        data={homePageData.about}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      />

      <FeaturedServices
        data={homePageData.features}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      />
      <Patients
        data={homePageData.patients}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      />
      {/* <VirtualTour
        data={homePageData.virtualTour}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      /> */}
      {/* <Career
        data={homePageData.career}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      /> */}
      {/* <LatestNews
        data={homePageData.latestNews}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      /> */}

      {/* <Contact
        data={homePageData.contact}
        // isLoading={isLoading}
        // isError={isError}
        // error={error}
      /> */}
    </div>
  );
}
