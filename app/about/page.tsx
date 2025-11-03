import Health from "@/components/about/Health";
import InnerBanner from "@/components/common/InnerBanner";

import aboutData from "@/public/data/aboutus.json";

const About = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/home`);
  console.log(aboutData);

  // const res = await fetch(`/data/aboutus.json`);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch layout data");
  // }
  // const { data } = await res.json();
  // if (!data) return null;
  // const homePageData = data.content;

  return (
    <div>
      <InnerBanner data={aboutData?.banner} />
      <Health data={aboutData?.health} />
    </div>
  );
};

export default About;
