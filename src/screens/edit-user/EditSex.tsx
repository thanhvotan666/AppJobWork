import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const EditSexScreen = ({ navigation }: any) => {
  const [sex, setSex] = useState<"male" | "female" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/user");
        setSex(res.data.sex || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!sex) {
      Alert.alert("Lỗi", "Vui lòng chọn giới tính");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.put("/user/0", { new_sex: sex });
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
      <Text style={styles.label}>Chỉnh sửa giới tính</Text>

      {/* Radio chọn giới tính */}
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setSex("male")}
      >
        <View style={[styles.radio, sex === "male" && styles.radioSelected]} />
        <Text style={styles.radioText}>Nam</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setSex("female")}
      >
        <View style={[styles.radio, sex === "female" && styles.radioSelected]} />
        <Text style={styles.radioText}>Nữ</Text>
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

export default EditSexScreen;
