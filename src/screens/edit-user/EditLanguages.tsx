import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const proficiencyOptions = [
  { value: "basic", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" },
  { value: "proficient", label: "Thành thạo" },
];

const EditLanguagesScreen = ({ navigation }: any) => {
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");

  // Load danh sách languages từ API
  const fetchLanguages = async () => {
    try {
      const res = await axiosClient.get("/user");
      setLanguages(res.data.languages || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Cập nhật proficient tạm thời trong state
  const updateProficient = (id: number, proficient: string) => {
    setLanguages(prev =>
      prev.map(lang => (lang.id === id ? { ...lang, proficient } : lang))
    );
  };

  // Thêm language mới
  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) {
      Alert.alert("Lỗi", "Tên ngôn ngữ không được để trống");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/user", { language: newLanguage, proficient: "basic" });
      toastSuccess("Thêm ngôn ngữ thành công!");
      setNewLanguage("");
      await fetchLanguages();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Lưu language cụ thể
  const handleSaveLanguage = async (id: number, proficient: string) => {
    try {
      setLoading(true);
      await axiosClient.put("/user/0", { language_id: id, proficient: proficient });
      toastSuccess("Cập nhật ngôn ngữ thành công!");
      fetchLanguages();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa language
  const handleDeleteLanguage = async (id: number) => {
    try {
      setLoading(true);
      await axiosClient.delete("/user/0", { params: { language_id: id } });
      toastSuccess("Xóa ngôn ngữ thành công!");
      fetchLanguages();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Danh sách ngôn ngữ</Text>

      {languages.length > 0 ? (
        <FlatList
          data={languages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.languageItem}>
              <Text style={styles.languageName}>{item.language}</Text>

              {/* Select 4 mức độ */}
              <View style={styles.proficiencyContainer}>
                {proficiencyOptions.map(opt => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.radioContainer}
                    onPress={() => updateProficient(item.id, opt.value)}
                  >
                    <View
                      style={[
                        styles.radio,
                        item.proficient === opt.value && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioText}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.saveButtonSmall}
                onPress={() => handleSaveLanguage(item.id, item.proficient)}
              >
                <Text style={styles.buttonTextSmall}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButtonSmall}
                onPress={() => handleDeleteLanguage(item.id)}
              >
                <Text style={styles.buttonTextSmall}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có ngôn ngữ nào</Text>
      )}

      {/* Thêm language mới */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm ngôn ngữ mới"
          value={newLanguage}
          onChangeText={setNewLanguage}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddLanguage}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  languageItem: { marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  languageName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  proficiencyContainer: { marginBottom: 10 },
  radioContainer: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 8,
  },
  radioSelected: { backgroundColor: "#007bff" },
  radioText: { fontSize: 14 },
  saveButtonSmall: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 6,
    marginTop: 5,
  },
  deleteButtonSmall: {
    backgroundColor: "#dc3545",
    padding: 6,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonTextSmall: { color: "#fff", fontSize: 12, fontWeight: "600", textAlign: "center" },
  addContainer: { flexDirection: "row", marginTop: 20, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
  addButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, marginLeft: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default EditLanguagesScreen;
