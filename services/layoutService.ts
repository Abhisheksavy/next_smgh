// services/layoutServices.ts

import { LayoutData } from "../types/layout";
import handleApiError from "../utils/handleApiError";

const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

const layoutServices = {
    getLayoutData: async (): Promise<LayoutData> => {
        try {
            const res = await fetch("/data/layout.json");

            if (!res.ok) {
                throw new Error("Failed to fetch layout data");
            }

            const data = await res.json();
            return data;
        } catch (err) {
            throw handleApiError(err);
        }
    },
    getPatientCareTabData: async () => {
        try {
            const res = await fetch(`${baseUrl}/pages/patient-care-tab`);

            if (!res.ok) {
                throw new Error("Failed to fetch patient care tab data");
            }

            const { data } = await res.json();
            return data;
        } catch (err) {
            throw handleApiError(err);
        }
    },
};

export default layoutServices;