import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput } from "react-native";
import { axiosClient } from "../../config/axiosClient";
import { showError, toastSuccess } from "../../config/func";

const EditDesiredLocationsScreen = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  // Load danh sách nơi làm việc mong muốn từ API
  const fetchLocations = async () => {
    try {
      const res = await axiosClient.get("/user");
      setLocations(res.data.desired_locations || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Thêm nơi làm việc mong muốn
  const handleAddLocation = async () => {
    if (!newLocation.trim()) {
      Alert.alert("Lỗi", "Tên nơi làm việc không được để trống");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/user", { desired_location: newLocation });
      toastSuccess("Thêm nơi làm việc mong muốn thành công!");
      setNewLocation("");
      await fetchLocations();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  // Xóa nơi làm việc mong muốn
  const handleDeleteLocation = async (id: number) => {
    try {
      setLoading(true);
      await axiosClient.delete("/user/0", { params: { desired_location_id: id } });
      toastSuccess("Xóa nơi làm việc mong muốn thành công!");
      fetchLocations();
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nơi làm việc mong muốn</Text>

      {locations.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.locationItem}>
              <Text style={styles.locationName}>{item.desired_location}</Text>
              <TouchableOpacity
                style={styles.deleteButtonSmall}
                onPress={() => handleDeleteLocation(item.id)}
              >
                <Text style={styles.buttonTextSmall}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có nơi làm việc mong muốn nào</Text>
      )}

      {/* Thêm nơi làm việc mới */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm nơi làm việc mong muốn"
          value={newLocation}
          onChangeText={setNewLocation}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  locationItem: { marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  locationName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
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

export default EditDesiredLocationsScreen;
