import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const proficiencyOptions = [
  { value: "basic", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" },
  { value: "proficient", label: "Thành thạo" },
];

const EditSoftSkillsScreen = ({ navigation }: any) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");

  // Load danh sách skill từ API
  const fetchSkills = async () => {
    try {
      const res = await axiosClient.get("/user");
      setSkills(res.data.soft_skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Cập nhật proficient tạm thời trong state
  const updateProficient = (id: number, proficient: string) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, proficient } : skill))
    );
  };

  // Thêm skill mới
  const handleAddSkill = async () => {
    if (!newSkillName.trim()) {
      Alert.alert("Lỗi", "Tên kỹ năng không được để trống");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/user", {
        soft_skill: newSkillName,
        proficient: "basic",
      });
      toastSuccess("Thêm skill thành công!");
      setNewSkillName("");
      await fetchSkills();
    } catch (err) {
      showError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Lưu skill cụ thể
  const handleSaveSkill = async (id: number, proficient: string) => {
    try {
      setLoading(true);
      await axiosClient.put("/user/0", { soft_skill_id: id, proficient });
      toastSuccess("Lưu skill thành công!");
      fetchSkills();
    } catch (err) {
      showError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa skill
  const handleDeleteSkill = async (id: number) => {
    try {
      setLoading(true);
      await axiosClient.delete("/user/0", { params: { soft_skill_id: id } });
      toastSuccess("Xóa skill thành công!");
      fetchSkills();
    } catch (err) {
      showError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Danh sách kỹ năng</Text>

      {skills.length > 0 ? (
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.skillItem}>
              <Text style={styles.skillName}>{item.soft_skill}</Text>

              {/* Chọn mức proficient */}
              <View style={styles.proficiencyContainer}>
                {proficiencyOptions.map((opt) => (
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
                onPress={() => handleSaveSkill(item.id, item.proficient)}
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
          value={newSkillName}
          onChangeText={setNewSkillName}
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
  skillItem: { marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  skillName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
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

export default EditSoftSkillsScreen;
