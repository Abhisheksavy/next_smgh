// services/homepageServices.ts

import { HomepageData } from "../types/home";
import handleApiError from "../utils/handleApiError";



const homepageServices = {
    getHomepageData: async (): Promise<HomepageData> => {
        try {
            const res = await fetch("/data/home.json");

            if (!res.ok) {
                throw new Error("Failed to fetch homepage data");
            }

            const data = await res.json();
            return data;
        } catch (err) {
            throw handleApiError(err);
        }
    },
};

export default homepageServices;