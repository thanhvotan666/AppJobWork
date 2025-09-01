import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { NavigationMainTabsProp } from '../config/setup';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { showError, showSalary } from '../config/func';
import {useEffect, useState} from 'react';
import axiosClient from '../config/axiosClient';

export const IntroducedJobsScreen = () => {
  const navigation = useNavigation<NavigationMainTabsProp>();
  const [introducedJobs, setIntroducedJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchIntroducedJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get('introduced-jobs', {
          params: { page },
        });
        const data = response.data;
        setIntroducedJobs(data);
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        showError(error); // Assuming showError is defined elsewhere
        setIntroducedJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIntroducedJobs();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Việc làm được giới thiệu</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Thanh tìm kiếm */}
        <View>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Tìm kiếm')}
          >
            <Icon name="search" size={20} color="#333" />
            <Text style={styles.searchText}>Tìm việc làm...</Text>
          </TouchableOpacity>
        </View>

        {/* Tiêu đề trang */}
        <Text style={styles.header}></Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : introducedJobs.length > 0 ? (
          introducedJobs.map(job => (
            <TouchableOpacity
              key={job.id}
              style={styles.jobCard}
              onPress={() => navigation.navigate('Công việc', {id: job.id})}>
              <Text style={styles.jobTitle}>{job.name}</Text>
              <Text style={styles.jobDetail}>💰 {showSalary(job)}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noJobsText}>
            Không có việc làm nào để hiển thị.
          </Text>
        )}
      </ScrollView>
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

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00e5ffff',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobDetail: {
    fontSize: 14,
    color: '#555',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noJobsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
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
