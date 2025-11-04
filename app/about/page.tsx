import AnnualReport from "@/components/about/AnnualReport";
import Health from "@/components/about/Health";
import MissionVision from "@/components/about/MissionVision";
import QualityCare from "@/components/about/QualityCare";
import InnerBanner from "@/components/common/InnerBanner";
import { Button } from "@/components/ui/button";
import data from "@/public/data/aboutus.json";
import LeaderShip from "@/components/about/LeaderShip";
import LatestNews from "@/components/home/LatestNews";
import Contact from "@/components/home/Contact";

const About = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/home`);
  console.log(data);

  // const res = await fetch(`/data/aboutus.json`);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch layout data");
  // }
  // const { data } = await res.json();
  // if (!data) return null;
  // const homePageData = data.content;

  console.log("about page", data);

  return (
    <div>
      {/* Cookie code */}
      {/* <div className="flex flex-col gap-2.5">
               <div className="text-center text-2xl font-medium leading-[100%] "> 
                    Cookie Preferences
               </div>
               <div className="mb-1">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type.
                    </p>
               </div>
               <div className="flex gap-2">
                    <Button variant="default">Accept All Cookies</Button>
                    <Button variant="outline">Recect All</Button>
               </div>
               </div> */}
      {/* Cookie code */}
      <InnerBanner data={data?.banner} />
      <Health data={data?.health} />
      {data.qualityCare && <QualityCare qualityCare={data?.qualityCare} />}
      {data.mission && <MissionVision mission={data?.mission} />}

      {data?.leadership && <LeaderShip leadership={data?.leadership} />}
      {data?.annualReport && <AnnualReport annualReport={data?.annualReport} />}
      {data?.latestNews && <LatestNews data={data?.latestNews} />}
      {data?.contact && (
        <Contact
          data={data?.contact}
          // isLoading={isLoading}
          // isError={isError}
          // error={error}
        />
      )}
    </div>
  );
};
export default About;
