import axios, { type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
