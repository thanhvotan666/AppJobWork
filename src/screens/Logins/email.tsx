import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axiosClient from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";
import * as Keychain from 'react-native-keychain';
import { storage } from "../../config/storage";


export default function LoginWithEmailScreen({ clickMethod } : any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.post("/auth/login", { email, password });
      await storage.set('token', res.data.token);
      
    } catch (err: any) {
      console.log(err);
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => clickMethod()}>
        <Text style={styles.backButtonText}>← Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Đăng nhập bằng Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#999" }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Đang xử lý..." : "Đăng nhập"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
  position: "absolute",
  top: 40,
  left: 20,
  padding: 10,
  zIndex: 10,
},
backButtonText: {
  fontSize: 20,
  color: "#007AFF",
},
});
