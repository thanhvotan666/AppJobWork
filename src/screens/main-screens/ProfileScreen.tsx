import React, { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, View } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError } from "../../config/func";
import { storage } from "../../config/storage";
import { useUser } from "../../context/UserContext";
import { ProfileScreenMethod } from "../Logins/method";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NavigationMainTabsProp } from "../../config/setup";

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
  const { user, setUser } = useUser();
  const navigation = useNavigation<NavigationMainTabsProp>();

  const logout = async () => {
    try {
      await axiosClient.post("/logout");
      await storage.delete("token");
      setUser(null);
    } catch (error) {
      showError(error);
    }
  };

  const changePassword = () => {
    navigation.navigate("Đổi mật khẩu");
  };


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

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (!user) {
    return <ProfileScreenMethod />;
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!profile) {
    return <Text style={{ flex: 1, textAlign: "center" }}>Không có dữ liệu</Text>;
  }

  const fields = [
    { key: "name", label: "Họ và tên", value: profile.name, handle: () => navigation.navigate("Cập nhập tên") },
    { key: "date_of_birth", label: "Ngày sinh", value: profile.date_of_birth, handle: () => navigation.navigate("Cập nhập ngày sinh") },
    { key: "sex", label: "Giới tính", value: profile.sex == "male" ? "Nam" : "Nữ", handle: () => navigation.navigate("Cập nhập giới tính") },
    { key: "desired_location", label: "Nơi mong muốn", value: profile.desired_location, handle: () => navigation.navigate("Cập nhập nơi mong muốn") },
    { key: "job_search_status", label: "Trạng thái tìm việc", value: profile.job_search_status ? "Đang tìm việc" : "Không tìm việc", handle: () => navigation.navigate("Cập nhập trạng thái tìm việc") },
    { key: "email", label: "Email", value: profile.email, handle: () => {} },
    { key: "phone", label: "Số điện thoại", value: profile.phone, handle: () => navigation.navigate("Cập nhập số điện thoại") },
    { key: "address", label: "Địa chỉ", value: profile.address, handle: () => navigation.navigate("Cập nhập địa chỉ") },
    { key: "position", label: "Vị trí", value: profile.position, handle: () => navigation.navigate("Cập nhập vị trí") },
    { key: "degree", label: "Bằng cấp", value: profile.degree, handle: () => navigation.navigate("Cập nhập trình độ học vấn") },
    { key: "current_salary", label: "Lương hiện tại", value: profile.current_salary, handle: () => navigation.navigate("Cập nhập lương hiện tại") },
    { key: "desired_salary", label: "Lương mong muốn", value: profile.desired_salary, handle: () => navigation.navigate("Cập nhập lương mong muốn") },
  ];

  return (
    <ScrollView style={styles.container}>
      {fields.map((item) => (
        <TouchableOpacity key={item.key} style={styles.item} onPress={item.handle}>
          <Text style={styles.label}>{item.label}:</Text>
          <Text style={styles.value}>{item.value || "Chưa cập nhật"}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập giới thiệu bản thân")}>
          <Text style={styles.label}>Giới thiệu bản thân:</Text>
          <Text style={styles.value}>{profile.introduce || "Chưa cập nhật"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập địa điểm mong muốn")}>
          <Text style={styles.label}>Nơi làm việc mong muốn:</Text>
          <Text style={styles.value}>
            {profile.desired_locations && profile.desired_locations.length > 0 ? 
            profile.desired_locations.map( (dl)=> dl.desired_location ).join(", ")
            : "Chưa cập nhật"}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập sở thích")}>
          <Text style={styles.label}>Sở thích:</Text>
          <Text style={styles.value}>
            {profile.hobbies && profile.hobbies.length > 0 ? 
            profile.hobbies.map( (item)=> item.hobby ).join(", ")
            : "Chưa cập nhật"}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập trình độ ngôn ngữ")}>
          <Text style={styles.label}>Ngoại ngữ:</Text>
          <Text style={styles.value}>
            {profile.languages && profile.languages.length > 0 ? 
            profile.languages.map( (item)=> `${item.language}-${item.proficient}` ).join(", ")
            : "Chưa cập nhật"}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập kĩ năng chuyên môn")}>
          <Text style={styles.label}>Kỹ năng chuyên môn:</Text>
          <Text style={styles.value}>
            {profile.professional_skills && profile.professional_skills.length > 0 ? 
            profile.professional_skills.map( (item)=> `${item.professional_skill}-${item.year}` ).join(", ")
            : "Chưa cập nhật"}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Cập nhập kĩ năng mềm")}>
          <Text style={styles.label}>Kỹ năng mềm:</Text>
          <Text style={styles.value}>
            {profile.soft_skills && profile.soft_skills.length > 0 ? 
            profile.soft_skills.map( (item)=> `${item.soft_skill}-${item.proficient}` ).join(", ")
            : "Chưa cập nhật"}
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.changePasswordButton} onPress={changePassword}>
        <Text style={styles.changePasswordButtonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
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
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#f44336",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  changePasswordButton: {
    marginTop: 32,
    backgroundColor: "#e5ff00ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  changePasswordButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  }
});
