import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const EditDesiredSalary = ({ navigation }: any) => {
  const [desired_salary, setDesiredSalary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/user");
        setDesiredSalary(res.data.desired_salary);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!desired_salary.trim()) {
      Alert.alert("Lỗi", "Mức lương mong muốn không được để trống");
      return;
    }

    try {
      setLoading(true);
        const res = await axiosClient.put("/user/0", {
        new_desired_salary: desired_salary,
      });
      
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
      <Text style={styles.label}>Chỉnh sửa mức lương mong muốn</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={desired_salary}
        onChangeText={setDesiredSalary}
        placeholder="Nhập mức lương mong muốn"
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

export default EditDesiredSalary;