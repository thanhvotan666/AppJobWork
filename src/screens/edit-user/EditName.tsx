import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { axiosClient } from "../../config/axiosClient";
import { toastSuccess } from "../../config/func";

const EditNameScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Lấy thông tin user hiện tại
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/user");
        setName(res.data.name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Tên không được để trống");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.put("/user", { new_name: name });

      toastSuccess("Cập nhật tên thành công");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể cập nhật tên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chỉnh sửa tên</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên mới"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Đang lưu..." : "Lưu thay đổi"}</Text>
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
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
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

export default EditNameScreen;