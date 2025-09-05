import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { axiosClient } from "../config/axiosClient";
import { showError, toastSuccess } from "../config/func";


const ChangePasswordScreen = ({ navigation }: any) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    // Kiểm tra các trường không được để trống
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường");
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận có trùng nhau không
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu không trùng nhau");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.post("/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      toastSuccess(res.data.message);
      navigation.goBack();
    } catch (err) {
      showError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Đổi mật khẩu</Text>

      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Mật khẩu hiện tại"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Mật khẩu mới"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang lưu..." : "Đổi mật khẩu"}
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
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
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

export default ChangePasswordScreen;
