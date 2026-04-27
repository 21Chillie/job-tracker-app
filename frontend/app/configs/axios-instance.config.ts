import axios, { type AxiosResponse } from "axios";
import toast from "react-hot-toast";
import env from "./env.config";

interface ApiErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    stack?: string;
  };
}

const api = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data;
      const errorMessage =
        data?.error.message ||
        (data as any).message ||
        error?.message ||
        "An unexpected error occurred";

      if (typeof window !== "undefined") {
        if (status && status !== 401 && status !== 403) {
          toast.error(`${status}: ${errorMessage}`);
        }
      }

      return Promise.reject({
        status,
        message: errorMessage,
        data: data,
      });
    }

    return Promise.reject(error);
  },
);

export default api;
