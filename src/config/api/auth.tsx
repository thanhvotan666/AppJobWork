import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../axiosClient";

const authApi = {
  login: async (email: string, password: string) => {
    const res = await axiosClient.post("/login", { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    return res.data;
  },

  getMe: async () => {
    const res = await axiosClient.get("/me");
    return res.data;
  },

  logout: async () => {
    await axiosClient.post("/logout");
    await AsyncStorage.removeItem("token");
  },
};

export default authApi;
