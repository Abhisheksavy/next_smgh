// queries/useFormSubmission.ts

import { useMutation } from "@tanstack/react-query";
import formService from "../services/formService";
import toast from "react-hot-toast";

interface FormSubmissionParams {
    formType: string;
    formData: FormData;
}

export const useFormSubmission = () => {
    return useMutation({
        mutationFn: async ({ formType, formData }: FormSubmissionParams) => {
            return await formService.submitForm(formType, formData);
        },
        onSuccess: (data) => {
            // Success message will be handled in component's onSuccess callback
            // This ensures form-specific messages can be displayed
        },
        onError: (error: any) => {
            const errorMessage =
                error.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        },
    });
};

