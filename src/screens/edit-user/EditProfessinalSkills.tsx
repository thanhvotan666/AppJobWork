import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

// Các option số năm kinh nghiệm
const yearOptions = [
  { value: 0, label: "Không có kinh nghiệm" },
  { value: 1, label: "1 năm" },
  { value: 2, label: "2 năm" },
  { value: 3, label: "3 năm" },
  { value: 4, label: "4 năm" },
  { value: 5, label: "5 năm" },
  { value: 6, label: "Hơn 5 năm" },
];

const EditProfessionalSkillsScreen = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // Load danh sách kỹ năng từ API
  const fetchSkills = async () => {
    try {
      const res = await axiosClient.get("/user");
      setSkills(res.data.professional_skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Cập nhật số năm kinh nghiệm tạm thời trong state
  const updateYear = (id: number, year: number) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, year } : skill))
    );
  };

  // Thêm skill mới
  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      Alert.alert("Lỗi", "Tên kỹ năng không được để trống");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/user", {
        professional_skill: newSkill,
        year: 0, // mặc định là 0 năm
      });
      toastSuccess("Thêm kỹ năng thành công!");
      setNewSkill("");
      await fetchSkills();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Lưu skill cụ thể
  const handleSaveSkill = async (id: number, year: number) => {
    try {
      setLoading(true);
      await axiosClient.put("/user/0", { professional_skill_id: id, year: year });
      toastSuccess("Cập nhật kỹ năng thành công!");
      fetchSkills();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa skill
  const handleDeleteSkill = async (id: number) => {
    try {
      setLoading(true);
      await axiosClient.delete("/user/0", { params: { professional_skill_id: id } });
      toastSuccess("Xóa kỹ năng thành công!");
      fetchSkills();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Danh sách kỹ năng chuyên môn</Text>

      {skills.length > 0 ? (
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.skillItem}>
              <Text style={styles.skillName}>{item.professional_skill}</Text>

              {/* Chọn số năm kinh nghiệm */}
              <View style={styles.yearContainer}>
                {yearOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.radioContainer}
                    onPress={() => updateYear(item.id, opt.value)}
                  >
                    <View
                      style={[
                        styles.radio,
                        item.year === opt.value && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioText}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.saveButtonSmall}
                onPress={() => handleSaveSkill(item.id, item.year)}
              >
                <Text style={styles.buttonTextSmall}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButtonSmall}
                onPress={() => handleDeleteSkill(item.id)}
              >
                <Text style={styles.buttonTextSmall}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có kỹ năng nào</Text>
      )}

      {/* Thêm skill mới */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm kỹ năng mới"
          value={newSkill}
          onChangeText={setNewSkill}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  skillItem: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  skillName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  yearContainer: { marginBottom: 10 },
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
  buttonTextSmall: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  addContainer: { flexDirection: "row", marginTop: 20, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default EditProfessionalSkillsScreen;
