// services/homepageServices.ts

import { HomepageData } from "../types/home";
import handleApiError from "../utils/handleApiError";

const homeUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

const homepageServices = {
  getHomepageData: async (): Promise<HomepageData> => {
    try {
      const res = await fetch(`${homeUrl}/pages/home`);
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
