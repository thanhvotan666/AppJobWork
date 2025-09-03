import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationMainTabsProp } from '../../config/setup';

export default function MenuScreen() {
    const navigation = useNavigation<NavigationMainTabsProp>();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
      <Text style={styles.logo}>JobsWork</Text>

      {/* Các mục chính */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Việc đã ứng tuyển')}>
          <Text style={styles.cardText}>Việc đã ứng tuyển</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Việc đã lưu lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Việc gần bạn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Việc được giới thiệu</Text>
        </TouchableOpacity>
      </View></View>

      {/* Tin tức */}
      <View style={styles.newsSection}>
        <Text style={styles.newsTitle}>Tin tức</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Menu phụ */}
      <View style={styles.menu}>
        <Text style={styles.menuItem}>Giới thiệu JobsWork cho bạn bè</Text>
        <Text style={styles.menuItem}>Hỗ trợ</Text>
        <Text style={styles.menuItem}>Chính sách</Text>
        <Text style={styles.menuItem}>Ngôn ngữ</Text>
        <Text style={styles.menuItem}>Thông tin về ứng dụng</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffffff',
    padding: 16,
    width: '48%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 6,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  newsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  menu: {
    marginBottom: 32,
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navItem: {
    fontSize: 14,
    color: '#007AFF',
  },
});