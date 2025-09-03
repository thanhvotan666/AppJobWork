// SearchResultsScreen.tsx

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { showError } from '../config/func';
import { axiosClient } from '../config/axiosClient';

// const jobList: Job[] = [
//   {
//     title: 'IT Supervisor',
//     company: 'Công Ty TNHH Red Bull (Việt Nam)',
//     location: 'Hồ Chí Minh',
//     salary: 'Thỏa thuận',
//     deadline: '25/07/2025',
//   },
//   {
//     title: 'Chuyên Viên IT',
//     company: 'Công ty CP Tập đoàn Hà Đô',
//     location: 'Hà Nội',
//     salary: '10 - 20 triệu',
//     deadline: '25/07/2025',
//   },
//   {
//     title: 'Estimating Engineer',
//     company: 'Công Ty TNHH Walker Design Solutions',
//     location: 'Hồ Chí Minh',
//     salary: '13 - 23 triệu',
//     deadline: '25/07/2025',
//   },
//   {
//     title: 'Chuyên Viên IT Web (NodeJS + NextJS)',
//     company: 'CÔNG TY CP HAVILAND HOUSE',
//     location: 'Đà Nẵng',
//     salary: '12 - 18 triệu',
//     deadline: '25/07/2025',
//   },
//   {
//     title: 'Software Engineer (Tiếng Nhật N2)',
//     company: 'Công Ty TNHH Kỹ Sư Công Nghệ Cao Việt',
//     location: 'Hà Nội',
//     salary: 'Tối đa 40 triệu',
//     deadline: '26/07/2025',
//   },
// ];



const SearchResultsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
const fetchJobs = async () => {
      try {
        const res = await axiosClient.get('/jobs',{params: {key_word: searchTerm}});
        setJobs(res.data);
      } catch (error) {
        showError(error);
      }
    }
  useEffect(() => {
    fetchJobs();
  },[searchTerm])

  const renderJobItem = ({ item }: any) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.salary}>💰 {item.salary}</Text>
      <Text style={styles.deadline}>🗓️ Hạn nộp: {item.deadline}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm việc làm..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Danh sách kết quả */}
      <FlatList
        data={jobs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderJobItem}
        ListEmptyComponent={
          <Text style={styles.noResult}>Không tìm thấy công việc phù hợp.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  jobCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  salary: {
    fontSize: 14,
    color: '#555',
  },
  deadline: {
    fontSize: 14,
    color: '#555',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 40,
  },
});