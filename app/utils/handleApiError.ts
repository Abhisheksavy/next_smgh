import { AxiosError } from "axios";
// import { useStore } from "../stores";
import toast from "react-hot-toast";
// Define error response structure matching your backend
export interface ApiErrorResponse {
  success: boolean;
  message: string | string[];
  data: null;
  error: string;
  statusCode: number;
  path: string;
}
// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  isNetworkError: boolean;
  originalError: any;
  details?: string[];
  errorType: string;
  path?: string;
  constructor(
    message: string,
    statusCode = 500,
    isNetworkError = false,
    originalError: any = null,
    details?: string[],
    errorType = "UnknownError",
    path?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
    this.originalError = originalError;
    this.details = details;
    this.errorType = errorType;
    this.path = path;
    // This is needed in TypeScript to maintain proper prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
/**
 * Extracts error message from API response
 * @param error The error from axios
 * @returns Formatted error message
 */
export const extractErrorMessage = (error: any): string => {
  // Handle axios error objects
  if (error instanceof AxiosError) {
    const response = error.response;
    // No response from server (network error)
    if (!response) {
      return "Unable to connect to the server. Please check your internet connection.";
    }
    // Get error data from response
    const errorData = response.data as ApiErrorResponse;
    // Handle array of error messages
    if (Array.isArray(errorData.message)) {
      return errorData.message[0] || "An unexpected error occurred";
    }
    // Handle single error message
    if (errorData.message) {
      return errorData.message;
    }
    // Fallback to HTTP status text
    return response.statusText || `Error ${response.status}`;
  }
  // Handle ApiError instances
  if (error instanceof ApiError) {
    return error.message;
  }
  // Handle plain Error objects
  if (error instanceof Error) {
    return error.message;
  }
  // Handle string errors
  if (typeof error === "string") {
    return error;
  }
  // Fallback for unknown error types
  return "An unexpected error occurred";
};
/**
 * Main error handler function for API calls with toast notification
 * @param error The error from axios
 * @param showToast Whether to show a toast notification
 * @returns Standardized ApiError
 */
export const handleApiError = (error: any, showToast = true): ApiError => {
  if (error instanceof AxiosError) {
    const response = error.response;

    if (!response) {
      const apiError = new ApiError(
        "Network error: Unable to connect to the server",
        0,
        true,
        error
      );
      if (showToast) toast.error(apiError.message);
      return apiError;
    }

    const errorData: any = response.data as ApiErrorResponse;
    const statusCode = errorData.statusCode || response.status;
    const errorType = errorData.error || "UnknownError";

    // Extract message from errorData.errors if present
    let errorMessage = errorData.message || "An unexpected error occurred";
    let details: string[] | undefined;

    if (errorData.errors && typeof errorData.errors === "object") {
      const messagesSet = new Set<string>();
      for (const key in errorData.errors) {
        if (Array.isArray(errorData.errors[key])) {
          errorData.errors[key].forEach(msg => messagesSet.add(msg));
        }
      }
      details = Array.from(messagesSet);
      if (details.length > 0) {
        errorMessage = details.join(", ");
      }
    } else if (Array.isArray(errorData.message)) {
      details = errorData.message;
      errorMessage = errorData.message[0] || errorMessage;
    }

    const apiError = new ApiError(
      errorMessage,
      statusCode,
      false,
      error,
      details,
      errorType,
      errorData.path
    );

    if (showToast) toast.error(errorMessage);
    return apiError;
  }

  if (error instanceof ApiError) {
    if (showToast) toast.error(error.message);
    return error;
  }

  if (error instanceof Error) {
    const apiError = new ApiError(error.message, 500, false, error);
    if (showToast) toast.error(error.message);
    return apiError;
  }

  const message = typeof error === "string" ? error : "An unexpected error occurred";
  const apiError = new ApiError(message, 500, false, error);
  if (showToast) toast.error(message);
  return apiError;
};


export default handleApiError;
