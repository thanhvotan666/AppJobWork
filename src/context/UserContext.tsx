import React, { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../config/axiosClient";

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
};


const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API /me
  const fetchUser = async () => {
    try {
      const res = await axiosClient.get("me");
      setUser(res.data); // Lưu dữ liệu user
    } catch (error) {
      console.log("Not logged in", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);