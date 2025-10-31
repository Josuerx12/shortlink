import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "https://api-jcshortlink.jcdev.com.br/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token && config && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
