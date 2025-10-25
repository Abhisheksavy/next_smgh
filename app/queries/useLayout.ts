// queries/useLayout.ts


import { useQuery } from "@tanstack/react-query";
import layoutServices from "../services/layoutService";

export const useGetLayoutData = () => {
    return useQuery({
        queryKey: ["layout-data"],
        queryFn: () => layoutServices.getLayoutData(),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

// Individual hooks for each section
export const useGetTopBarData = () => {
    const { data, isLoading, isError, error } = useGetLayoutData();

    return {
        data: data?.topbar,
        isLoading,
        isError,
        error,
    };
};

export const useGetHeaderData = () => {
    const { data, isLoading, isError, error } = useGetLayoutData();

    return {
        data: data?.header,
        isLoading,
        isError,
        error,
    };
};

export const useGetFooterData = () => {
    const { data, isLoading, isError, error } = useGetLayoutData();

    return {
        data: data?.footer,
        isLoading,
        isError,
        error,
    };
};