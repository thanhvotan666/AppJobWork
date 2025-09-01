import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axiosClient from '../config/axiosClient';
import axios from 'axios';
import { showError, showSalary } from '../config/func';

const JobScreen: React.FC = () => {
  const [job, setJob] = useState<any>();
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosClient.get(`job/1`);
        const data = response.data;
        setJob(data);
      } catch (error) {
        showError(error);
      }
    };
    fetchJob();
  }, []);

  useEffect(() => {
    const fetchRelatedJob = async () => {
      try {
        const response = await axiosClient.get(`job`, {
          params: { job_id: job.id },
        });
        const data = response.data;
        setRelatedJobs(data);
      } catch (error) {
        showError(error);
      }
      if (!job) {
        return;
      }
      fetchRelatedJob();
    };
  }, [job]);

  const handleApply = async () => {
    // Alert.alert('Bạn đã ứng tuyển!');
    // Thực hiện hành động ứng tuyển ở đây
    // ...
    try {
      const res = await axios.get('http://10.0.2.2:8000/api/user');
      console.log(res.data);
      Alert.alert(JSON.stringify(res.data));
    } catch (error) {
      Alert.alert('321');
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.employer.name}</Text>
      <Text style={styles.detail}>{job.address}</Text>
      <Text style={styles.detail}>📍 Việc làm {job.location}</Text>
      <Text style={styles.detail}>💰 {showSalary(job)}</Text>
      <Text style={styles.detail}>📅 Hạn nộp: {job.expired}</Text>
      {/* <Text style={styles.detail}>
        👁️ {job.views} lượt xem • 📝 {job.applicants} ứng tuyển
      </Text> */}

      <Text style={styles.sectionTitle}>📄 Mô tả công việc</Text>
      <Text style={styles.description}>{job.description}</Text>

      <Text style={styles.sectionTitle}>✅ Yêu cầu công việc</Text>
      <Text style={styles.description}>{job.requirement}</Text>

      <Text style={styles.sectionTitle}>🎁 Quyền lợi</Text>
      <Text style={styles.description}>{job.benefit}</Text>

      <TouchableOpacity style={styles.button} onPress={handleApply}>
        <Text style={styles.buttonText}>Ứng tuyển ngay</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>🔍 Việc làm tương tự</Text>
      {relatedJobs &&
        relatedJobs.length > 0 &&
        relatedJobs.map((job, index) => (
        <View key={index} style={styles.relatedJob}>
          <Text style={styles.relatedTitle}>• {job.title}</Text>
          <Text style={styles.relatedSalary}>{showSalary(job)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedJob: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  relatedTitle: {
    fontSize: 14,
    flex: 1,
  },
  relatedSalary: {
    fontSize: 14,
    color: '#007bff',
    textAlign: 'right',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default JobScreen;
