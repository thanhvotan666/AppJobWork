import axios from "axios";
import { baseUrlApi } from "./setup";
import { storage } from "./storage";


const axiosClient = axios.create({
  baseURL: baseUrlApi,
  timeout: 5000,
  headers: {
    Accept: "application/json",
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

export default axiosClient;
