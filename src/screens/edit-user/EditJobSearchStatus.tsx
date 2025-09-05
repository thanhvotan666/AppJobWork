import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const EditJobSearchStatusScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState<0 | 1 | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/user");
        setStatus(res.data.job_search_status); // API trả về 0 hoặc 1
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (status === null) {
      Alert.alert("Lỗi", "Vui lòng chọn trạng thái tìm việc");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.put("/user/0", { new_job_search_status: status });
      toastSuccess(res.data.message);
      navigation.goBack();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chỉnh sửa trạng thái tìm việc</Text>

      {/* Radio chọn trạng thái */}
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setStatus(0)}
      >
        <View style={[styles.radio, status === 0 && styles.radioSelected]} />
        <Text style={styles.radioText}>Không tìm việc</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setStatus(1)}
      >
        <View style={[styles.radio, status === 1 && styles.radioSelected]} />
        <Text style={styles.radioText}>Đang tìm việc</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#007bff",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditJobSearchStatusScreen;
