// queries/useHomepage.ts

import { useQuery } from "@tanstack/react-query";
import homepageServices from "../services/homepageServices";

export const useGetHomepageData = () => {
    return useQuery({
        queryKey: ["homepage-data"],
        queryFn: () => homepageServices.getHomepageData(),
        staleTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};