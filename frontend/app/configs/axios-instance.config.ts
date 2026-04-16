import axios, { Axios, AxiosError, type AxiosResponse } from "axios";
import env from "./env.config";
import toast from "react-hot-toast";

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

      switch (status) {
        case 400:
          toast.error(`${status}: ${data?.error.message}`);
          break;

        case 401:
          toast.error(`${status}: ${data?.error.message}`);
          break;

        case 404:
          toast.error(`${status}: ${data?.error.message}`);
          break;

        case 500:
          toast.error(`${status}: Internal Server Error`);
          break;

        default:
          toast.error("Unexpected error occurred");
          break;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
