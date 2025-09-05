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
  ActivityIndicator,
} from 'react-native';
import { showError, showSalary } from '../config/func';
import { axiosClient } from '../config/axiosClient';
import { useNavigation } from '@react-navigation/native';
import { NavigationMainTabsProp } from '../config/setup';

const SearchResultsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationMainTabsProp>();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axiosClient.get('/jobs', {
        params: { key_word: searchTerm, page: page },
      });

      setJobs(res.data || []);
      setHasMore(res.data.meta?.hasMore ?? false);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  const renderJobItem = ({ item }: any) => (
    <TouchableOpacity onPress={()=>navigation.navigate('Công việc', {id: item.id})}>
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.name}</Text>
      <Text style={styles.company}>{item.employer?.name}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.salary}>💰 {showSalary(item)}</Text>
      <Text style={styles.deadline}>🗓️ Hạn nộp: {item.expired}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm việc làm..."
        value={searchTerm}
        onChangeText={text => {
          setPage(1); // reset về trang 1 khi thay đổi từ khóa
          setSearchTerm(text);
        }}
      />

      {/* Danh sách kết quả */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderJobItem}
          ListEmptyComponent={
            <Text style={styles.noResult}>Không tìm thấy công việc phù hợp.</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={page === 1 || isLoading}
          style={[
            styles.paginationButton,
            (page === 1 || isLoading) && styles.disabledButton,
          ]}>
          <Text style={styles.paginationText}>Trang trước</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumberText}>Trang {page}</Text>

        <TouchableOpacity
          onPress={handleNextPage}
          disabled={!hasMore || isLoading}
          style={[
            styles.paginationButton,
            (!hasMore || isLoading) && styles.disabledButton,
          ]}>
          <Text style={styles.paginationText}>Trang sau</Text>
        </TouchableOpacity>
      </View>
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
  pageNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
