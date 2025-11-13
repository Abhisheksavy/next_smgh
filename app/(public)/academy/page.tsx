import InnerBanner from "@/components/common/InnerBanner";
import Banner from "@/components/home/Banner";
import Contact from "@/components/home/Contact";
import AboutSmgh from "@/components/smghAcademy/AboutSmgh";
import BuildingSkills from "@/components/smghAcademy/BuildingSkills";
import Programs from "@/components/smghAcademy/Programs";
// import smghAcademy from "@/public/data/smghacademy.json";

export default async function SmghAcademy() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/smgh-academy`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch homepage data");

  const { data } = await res.json();
  console.log(data?.content);
  const smghAcademy = data?.content;
  return (
    <section>
      <InnerBanner data={smghAcademy?.banner} />
      <AboutSmgh data={smghAcademy?.aboutSmgh} />
      <Programs data={smghAcademy?.opportunities} />
      <BuildingSkills data={smghAcademy?.building} />
      {!!smghAcademy?.contact && (
        <Contact

        // isLoading={isLoading}
        // isError={isError}
        // error={error}
        />
      )}
    </section>
  );
}
