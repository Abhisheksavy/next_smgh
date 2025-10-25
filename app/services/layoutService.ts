// services/headerServices.ts

import axios from "axios";
import handleApiError from "../utils/handleApiError";
import { FooterData, HeaderData, TopBarData } from "../types/layout";

const layoutServices = {

    getTopBarData: async (): Promise<TopBarData> => {
        try {
            // Using Axios to fetch data
            const response = await axios.get<TopBarData>("/data/topBar.json");
            return response.data;
        } catch (err) {
            throw handleApiError(err);
        }
    },
    getHeaderData: async (): Promise<HeaderData> => {
        try {
            const response = await axios.get<HeaderData>("/data/header.json");
            return response.data;
        } catch (err) {
            throw handleApiError(err);
        }
    },

    getFooterData: async (): Promise<FooterData> => {
        try {
            const response = await axios.get<FooterData>("/data/footer.json");
            return response.data;
        } catch (err) {
            throw handleApiError(err);
        }
    },
};

export default layoutServices;
