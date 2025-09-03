import axios from "axios";
import { baseUrlApi } from "./setup";
import { storage } from "./storage";

export const axiosClient = axios.create({
  baseURL: baseUrlApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await storage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.delete("token"); 
      // Có thể redirect về login screen
    }
    return Promise.reject(error);
  }
);

