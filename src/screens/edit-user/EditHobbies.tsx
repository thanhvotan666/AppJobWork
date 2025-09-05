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

const EditHobbiesScreen = ({ navigation }: any) => {
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newHobby, setNewHobby] = useState("");

  // Load danh sách sở thích từ API
  const fetchHobbies = async () => {
    try {
      const res = await axiosClient.get("/user");
      setHobbies(res.data.hobbies || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  // Thêm sở thích mới
  const handleAddHobby = async () => {
    if (!newHobby.trim()) {
      Alert.alert("Lỗi", "Tên sở thích không được để trống");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/user", { hobby: newHobby });
      toastSuccess("Thêm sở thích thành công!");
      setNewHobby("");
      await fetchHobbies();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa sở thích
  const handleDeleteHobby = async (id: number) => {
    try {
      setLoading(true);
      await axiosClient.delete("/user/0", { params: { hobby_id: id } });
      toastSuccess("Xóa sở thích thành công!");
      fetchHobbies();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Danh sách sở thích</Text>

      {hobbies.length > 0 ? (
        <FlatList
          data={hobbies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.hobbyItem}>
              <Text style={styles.hobbyName}>{item.hobby}</Text>

              <TouchableOpacity
                style={styles.deleteButtonSmall}
                onPress={() => handleDeleteHobby(item.id)}
              >
                <Text style={styles.buttonTextSmall}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có sở thích nào</Text>
      )}

      {/* Thêm sở thích mới */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm sở thích mới"
          value={newHobby}
          onChangeText={setNewHobby}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddHobby}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  hobbyItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hobbyName: { fontSize: 16, fontWeight: "500" },
  deleteButtonSmall: {
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonTextSmall: { color: "#fff", fontSize: 12, fontWeight: "600" },
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

export default EditHobbiesScreen;
