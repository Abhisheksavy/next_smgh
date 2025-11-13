// services/formService.ts

import axios from "axios";
import handleApiError from "../utils/handleApiError";

const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

interface FormSubmissionResponse {
    success: boolean;
    message?: string;
    data?: any;
}

const formService = {
    submitForm: async (
        formType: string,
        formData: FormData
    ): Promise<FormSubmissionResponse> => {
        try {
            const response = await axios.post<FormSubmissionResponse>(
                `${baseUrl}/form/${formType}/store`,
                formData
            );

            return response.data;
        } catch (err) {
            throw handleApiError(err, false);
        }
    },
};

export default formService;

