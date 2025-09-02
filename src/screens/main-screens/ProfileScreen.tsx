import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Loading } from "../../components/loading";
import { ProfileScreenMethod } from "../Logins/method";
import { useUser } from "../../context/UserContext";
import axiosClient from "../../config/axiosClient";
import { storage } from "../../config/storage";

export default function ProfileScreen() {
  const { user, loading, setUser } = useUser();
  const [profile, setProfile] = useState<any | null>(null);
  const [dashboard, setDashboard] = useState<any | null>(null);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  if (loading) return <Loading />;
  if (!user) return <ProfileScreenMethod />;

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/me");
        setProfile(res.data);

        // gọi thêm API dashboard (ví dụ /dashboard)
        // const dash = await axiosClient.get("/dashboard");
        // setDashboard(dash.data);

        // file upload
        // const attach = await axiosClient.get("/attachments");
        // setAttachments(attach.data);

        // job phù hợp
        // const jobsRes = await axiosClient.get("/jobs/suitable");
        // setJobs(jobsRes.data);

      } catch (err) {
        await storage.delete("token");
        setUser(null);
      }
    };
    fetchData();
  }, [user]);

  if (!profile) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: profile.image }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Cập nhật hồ sơ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.card}>
        <InfoRow label="Ngày sinh" value={profile.date_of_birth || "Chưa cập nhật"} />
        <InfoRow label="Giới tính" value={profile.sex || "Chưa cập nhật"} />
        <InfoRow label="Vị trí mong muốn" value={profile.desired_location || "Chưa cập nhật"} />
        <InfoRow label="Chức vụ" value={profile.position || "Chưa cập nhật"} />
        <InfoRow
          label="Trạng thái tìm việc"
          value={profile.job_search_status ? "Đang tìm việc" : "Tắt tìm việc"}
          valueStyle={{ color: profile.job_search_status ? "green" : "red" }}
        />
        <InfoRow label="Ngày cập nhật" value={profile.updated_at} />
      </View>

      {/* Dashboard */}
      {/* {dashboard && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
          <View style={styles.dashboardRow}>
            <DashItem label="Lượt xem" value={dashboard.views} />
            <DashItem label="Tin nhắn" value={dashboard.messages} />
            <DashItem label="Đã ứng tuyển" value={dashboard.applied_jobs} />
            <DashItem label="Đã lưu" value={dashboard.saved_jobs} />
          </View>
        </View>
      )} */}

      {/* CV Upload */}
      {/* {attachments.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>CV đã tải lên</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {attachments.map((a, i) => (
              <View key={i} style={styles.attachment}>
                <Image source={{ uri: a.thumbnail }} style={{ width: 80, height: 80 }} />
                <Text numberOfLines={1} style={styles.attachmentText}>
                  {a.attachment}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )} */}

      {/* Job phù hợp */}
      {/* {jobs.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Việc làm phù hợp</Text>
          {jobs.map((job, i) => (
            <TouchableOpacity key={i} style={styles.jobItem}>
              <Image source={{ uri: job.employer.image }} style={styles.jobImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{job.name}</Text>
                <Text style={styles.jobCompany}>{job.employer.name}</Text>
                <Text style={styles.jobLocation}>{job.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )} */}
    </ScrollView>
  );
}

const InfoRow = ({ label, value, valueStyle = {} } : { label: string; value: string; valueStyle?: any }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const DashItem = ({ label, value } : { label: string; value: number }) => (
  <View style={{ alignItems: "center", flex: 1 }}>
    <Text>{label}</Text>
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 12 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  btn: { backgroundColor: "#007bff", padding: 8, borderRadius: 5, marginTop: 8 },
  btnText: { color: "white" },
  card: { backgroundColor: "white", padding: 12, borderRadius: 10, marginBottom: 16 },
  sectionTitle: { fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", marginBottom: 6 },
  label: { width: 120, fontWeight: "bold" },
  value: { flex: 1 },
  dashboardRow: { flexDirection: "row", justifyContent: "space-around" },
  attachment: { alignItems: "center", marginRight: 12 },
  attachmentText: { maxWidth: 80, fontSize: 12 },
  jobItem: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderColor: "#eee" },
  jobImage: { width: 60, height: 60, marginRight: 8 },
  jobTitle: { fontWeight: "bold", color: "red" },
  jobCompany: { fontSize: 12, color: "gray" },
  jobLocation: { fontSize: 12, color: "blue" },
});
