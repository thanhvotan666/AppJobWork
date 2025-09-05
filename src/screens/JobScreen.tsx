import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {axiosClient} from '../config/axiosClient';
import axios from 'axios';
import { showError, showSalary, toastSuccess } from '../config/func';
import { useRoute } from '@react-navigation/native';
import { Loading } from '../components/loading';

const JobScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [job, setJob] = useState<any>();
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosClient.get(`jobs/${id}`);
        const data = response.data;
        setJob(data);
        setLoading(false);
      } catch (error) {
        showError(error);
        console.log(error);
      }
    };
    const fetchRelatedJob = async () => {
      try {
        const response = await axiosClient.get(`jobs`,{params:{related_job_id:id}});
        const data = response.data;
        setRelatedJobs(data);
      } catch (error) {
        showError(error);
        console.log(error);
      }
    };

    fetchJob();
    fetchRelatedJob();
  }, [id]);

  const handleApply = async () => {
    if (job.is_applied) {
      return;
    }
    setLoading(true);
    try {
      const res = await axiosClient.post(`applied-jobs`,{job_id:id});
      setJob({ ...job, is_applied: true });
    } catch (error) {
        showError(error);
    }
    setLoading(false);
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.post(`saved-jobs`,{job_id:id});
      setJob({ ...job, is_saved: true });
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }
    const handleUnSave = async () => {
      setLoading(true);
    try {
      const res = await axiosClient.delete(`saved-jobs/${job.id}`);
      setJob({ ...job, is_saved: false });
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

 return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    {/* Nội dung có thể scroll */}
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{job.name}</Text>
      <Text style={styles.company}>{job.employer.name}</Text>
      <Text style={styles.detail}>💰 {showSalary(job)}</Text>
      <Text style={styles.detail}>📅 Hạn nộp: {job.expired}</Text>

      {/* <Text style={styles.detail}>
        👁️ {job.views} lượt xem • 📝 {job.applicants} ứng tuyển
      </Text> */}
<View style={{ marginBottom: 12 }}>
  <Text style={styles.label}>💻 Việc làm theo yêu cầu:</Text>
  <Text style={styles.value}>{job.demand}</Text>

  <Text style={styles.label}>👨‍💻 Vị trí / chức nghiệp:</Text>
  <Text style={styles.value}>{job.position}</Text>

  <Text style={styles.label}>🎓 Yêu cầu bằng cấp:</Text>
  <Text style={styles.value}>{job.degree}</Text>

  <Text style={styles.label}>🕑 Kinh nghiệm:</Text>
  <Text style={styles.value}>{job.experience}</Text>

  <Text style={styles.label}>📅 Ngày tạo:</Text>
  <Text style={styles.value}>{job.created_at}</Text>

  <Text style={styles.label}>🏢 Nghề nghiệp:</Text>
  <Text style={styles.value}>
    {job.professions.map((jobProfession: any) => jobProfession.profession.name).join(', ')}
  </Text>

  <Text style={styles.label}>🛠️ Kỹ năng:</Text>
  <Text style={styles.value}>
    {job.skills.map((skill: any) => skill.name).join(', ')}
  </Text>

  <Text style={styles.label}>📍 Địa điểm:</Text>
  <Text style={styles.value}>{job.address}</Text>
  <Text style={styles.value}>Việc làm {job.location}</Text>
</View>


      <Text style={styles.sectionTitle}>📄 Mô tả công việc</Text>
      <Text style={styles.description}>{job.description}</Text>

      <Text style={styles.sectionTitle}>✅ Yêu cầu công việc</Text>
      <Text style={styles.description}>{job.requirement}</Text>

      <Text style={styles.sectionTitle}>🎁 Quyền lợi</Text>
      <Text style={styles.description}>{job.benefits}</Text>

      <Text style={styles.sectionTitle}>🔍 Việc làm tương tự</Text>
      {relatedJobs &&
        relatedJobs.length > 0 &&
        relatedJobs.map((job, index) => (
          <View key={index} style={styles.relatedJob}>
            <Text style={styles.relatedTitle}>{job.name}</Text>
            <Text style={styles.relatedSalary}>{showSalary(job)}</Text>
          </View>
        ))}
    </ScrollView>

    {/* Footer cố định */}
    <View style={styles.footer}>
      <TouchableOpacity style={styles.saveButton} onPress={job.is_saved ? handleUnSave : handleSave}>
        <Text style={styles.saveButtonText} >{job.is_saved ? 'Hủy lưu' : 'Lưu việc làm'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton} onPress={job.is_applied ? ()=>{} : handleApply}>
        <Text style={styles.applyButtonText}>{job.is_applied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 100,

    marginLeft: 12,
    marginRight: 12,

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
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00e5ffff',
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
  footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 12,
  borderTopWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#fff',
},
saveButton: {
  flex: 1,
  marginRight: 8,
  borderWidth: 1,
  borderColor: '#007bff',
  paddingVertical: 10,
  borderRadius: 6,
  alignItems: 'center',
},
saveButtonText: {
  color: '#007bff',
  fontWeight: '600',
},
applyButton: {
  flex: 1,
  backgroundColor: '#007bff',
  paddingVertical: 10,
  borderRadius: 6,
  alignItems: 'center',
},
applyButtonText: {
  color: '#fff',
  fontWeight: '600',
},
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: '#444',
    marginLeft: 24, 
    marginBottom: 4,
  },
});

export default JobScreen;
