import axios from "axios";
import env from "./env.config";

const api = axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default api;
