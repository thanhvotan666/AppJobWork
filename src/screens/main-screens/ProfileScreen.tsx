import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {axiosClient} from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";
import { storage } from "../../config/storage";
import { useUser } from "../../context/UserContext";
import { ProfileScreenMethod } from "../Logins/method";
import axios from "axios";

interface UserProfile {
  id: number;
  name: string;
  date_of_birth: string;
  sex: string;
  desired_location: string;
  job_search_status: string;
  updated_at: string;
  email: string;
  introduce: string;
  phone: string;
  address: string;
  position: string;
  degree: string;
  current_salary: string;
  desired_salary: string;
  professional_skills: any[];
  work_experiences: any[];
  learning_processes: any[];
  languages: any[];
  soft_skills: any[];
  hobbies: any[];
  desired_locations: any[];
  attachments: any[];
  certificates: any[];
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null); 
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useUser();

  const logout = async () => {
    try {
      const res = await axiosClient.post("/logout");
      await storage.delete("token");
      setUser(null);
    } catch (error) {
      showError(error);
    }
  };


  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get(`user`);
        setProfile(res.data);
      } catch (error) {
        console.error("Lỗi tải profile:", error);
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if(!user){
    return <ProfileScreenMethod/>;
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!profile) {
    return <Text style={{ flex: 1, textAlign: "center" }}>Không có dữ liệu</Text>;
  }

  // Chuyển object thành mảng hiển thị
  const fields = [
    { key: "name", label: "Họ và tên", value: profile.name,handle: () => {} },
    { key: "date_of_birth", label: "Ngày sinh", value: profile.date_of_birth,handle: () => {} },
    { key: "sex", label: "Giới tính", value: profile.sex,handle: () => {} },
    { key: "desired_location", label: "Nơi mong muốn", value: profile.desired_location,handle: () => {} },
    { key: "job_search_status", label: "Trạng thái tìm việc", value: profile.job_search_status,handle: () => {} },
    { key: "email", label: "Email", value: profile.email,handle: () => {} },
    { key: "phone", label: "Số điện thoại", value: profile.phone,handle: () => {} },
    { key: "address", label: "Địa chỉ", value: profile.address,handle: () => {} },
    { key: "position", label: "Vị trí", value: profile.position,handle: () => {} },
    { key: "degree", label: "Bằng cấp", value: profile.degree,handle: () => {} },
    { key: "current_salary", label: "Lương hiện tại", value: profile.current_salary,handle: () => {} },
    { key: "desired_salary", label: "Lương mong muốn", value: profile.desired_salary,handle: () => {} },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {}}
    >
      <Text style={styles.label}>{item.label}:</Text>
      <Text style={styles.value}>{item.value || "Chưa cập nhật"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fields}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
      {/* Render thêm các phần có mảng riêng như kỹ năng, kinh nghiệm */}
      {/* <TouchableOpacity
        style={styles.section}
        onPress={() => {}}
      >
        <Text style={styles.sectionTitle}>Kỹ năng chuyên môn ({profile.professional_skills.length})</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => {}}
      >
        <Text style={styles.sectionTitle}>Kinh nghiệm làm việc ({profile.work_experiences.length})</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  label: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  value: { fontSize: 14, color: "#333" },
  section: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
});
