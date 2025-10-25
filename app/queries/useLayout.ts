// queries/useTopBar.ts


import { useQuery } from "@tanstack/react-query";
import layoutServices from "../services/layoutService";

export const useGetTopBarData = () => {
    return useQuery({
        queryKey: ["topbar-data"],
        queryFn: () => layoutServices.getTopBarData(),
        staleTime: 1000 * 60 * 60, // 1 hour - data rarely changes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};



export const useGetHeaderData = () => {
    return useQuery({
        queryKey: ["header-data"],
        queryFn: () => layoutServices.getHeaderData(),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

export const useGetFooterData = () => {
    return useQuery({
        queryKey: ["footer-data"],
        queryFn: () => layoutServices.getFooterData(),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
        retry: 2,
    });
};