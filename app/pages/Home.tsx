'use client'


import { useGetHomepageData } from "@/app/queries/useHomepage";
import Banner from "../components/home/Banner";
import About from "../components/home/About";

export default function HomePage() {
    const { data, isLoading, isError, error }: any = useGetHomepageData();


    if (!data) return null;

    return (
        <div>
            <Banner
                data={data.banner}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />
            <About
                data={data.about}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />
        </div>
    )
}