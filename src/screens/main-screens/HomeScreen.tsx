import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Loading } from '../../components/loading';
import { NavigationMainTabsProp } from '../../config/setup';
import {axiosClient} from '../../config/axiosClient';
import { showError, showSalary } from '../../config/func';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationMainTabsProp>();
  const [loading, setLoading] = useState(true);
  const [newJobs, setNewJobs] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<any|null>(null);

  useEffect(() => {
    const fetchNewJobs = async () => {
      try {
        const response = await axiosClient.get('/jobs');
        const data = response.data;
        setNewJobs(data);
        
        setLoading(false);
      } catch (error) {
        showError(error);
      }
    };

  const fetchRecommendedJobs = async () => {
    try {
      const response = await axiosClient.get('/jobs',{params:{recommended: true}});
      const data = response.data;
      setRecommendedJobs(data);
    
      setLoading(false);
    } catch (error) {
      showError(error);
    }
  };
    fetchNewJobs();
    fetchRecommendedJobs();
  }, []);

  if (loading) return <Loading/>
  
  const SectionNewJobs = (data: any) => {
    if (!data) {
      return <Loading/>
    }
    return (
      <ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Việc làm mới nhất</Text>
        {data.length > 0 &&
          data.map((job: any, index: number) => {
            return (<View key={job.id}>
              <TouchableOpacity
                style={styles.jobCard}
                onPress={() => navigation.navigate('Công việc', { id: job.id })}
              >
                <Text style={styles.jobTitle}>{job.name}</Text>
                <Text style={styles.jobEmployer}>
                   {job.employer.name} 
                </Text>
                <Text style={styles.jobDetail}>
                  💰 {showSalary(job)} 
                </Text>
              </TouchableOpacity>
              </View>)
          })}
      </View>
      </ScrollView>
    );
  };


  const SectionRecommendedJobs = (data: any) => {
    if (!data) {
      return <Loading/>
    }
    return(
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Việc làm đề xuất</Text>
        <TouchableOpacity
          style={styles.jobCard}
          onPress={() => navigation.navigate('Công việc', { id: data.id })}
        >
          <Text style={styles.jobTitle}>{data.name}</Text>
          <Text style={styles.jobEmployer}>{data.employer.name}</Text>
          
          <Text style={styles.jobDetail}>
            {data.professions > 0 &&
            data.professions.map((jp:any)=>jp.profession.name).join(', ')}
          </Text>
          <Text style={styles.jobDetail}>
          {data.skills > 0 &&
          data.skills.map((skill: any) => skill.name).join(', ')}
          </Text>
          <Text style={styles.jobDetail}>📍 {data.address}</Text>
          <Text style={styles.jobDetail}>💰 Lương: {showSalary(data)}</Text>
        </TouchableOpacity>
      </View>
      )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Text style={styles.header}>Trang chủ</Text>

      {/* Việc làm đề xuất */}
      {SectionRecommendedJobs(recommendedJobs)}

      {/* Việc làm mới nhất*/}
      {SectionNewJobs(newJobs)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
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
    backgroundColor: '#ffffffff',
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
  jobEmployer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
});
