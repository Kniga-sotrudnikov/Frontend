import axios, { type AxiosInstance } from "axios";
import { handleHttpError } from "./handle-http-error";

const apiUrl = import.meta.env.VITE_API_URL;
const baseURL = apiUrl ? `${apiUrl}/api/v1` : "";

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(handleHttpError(error));
    }
    return Promise.reject(error);
  },
);
