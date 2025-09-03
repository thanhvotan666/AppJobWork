import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SearchScreen from './screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/ionicons';

import HomeScreen from './screens/main-screens/HomeScreen';
import ProfileScreen from './screens/main-screens/ProfileScreen';
import UtilityScreen from './screens/main-screens/UtilityScreen';
import ChatScreen from './screens/main-screens/ChatScreen';
import MenuScreen from './screens/main-screens/MenuScreen';
import JobScreen from './screens/JobScreen';
import { AppliedJobsScreen } from './screens/AppliedJobsScreen';
import { SavedJobsScreen } from './screens/SaveJobsScreen';
export type RootStackParamList = {
  MainTabs: undefined;
  'Tìm kiếm': undefined;
  'Công việc': {id: number};
  'Việc đã lưu lại': undefined;
  'Việc đã ứng tuyển': undefined;

  'Cập nhập tên': undefined;
  'Cập nhập mật khẩu': undefined;
  'Cập nhập email': undefined;
  'Cập nhập số điện thoại': undefined;
  'Cập nhập địa chỉ': undefined;
  'Cập nhập giới tính': undefined;
  'Cập nhập ngày sinh': undefined;
  'Cập nhập ảnh đại diện': undefined;
  
  'Cập nhập địa điểm làm việc': undefined;
  'Cập nhập lương hiện tại': undefined;
  'Cập nhập lương mong muốn': undefined;
  'Cập nhập nơi làm việc': undefined;
  'Cập nhập trình độ học vấn': undefined;
  'Cập nhập tình trạng tìm việc': undefined;
  'Cập nhập giới thiệu bản thân': undefined;
  
  'Cập nhập quá trình học tập': undefined;
  'Cập nhập trình độ ngôn ngữ': undefined;
  'Cập nhập kinh nghiệm làm việc': undefined;
  'Cập nhập chứng chỉ': undefined;
  'Cập nhập sở thích': undefined;
  'Cập nhập kĩ năng chuyên môn': undefined;
  'Cập nhập kĩ năng mềm': undefined;
  'Cập nhập địa điểm mong muốn': undefined;
  'Cập nhập tệp đính kèm': undefined;
  };

export type TabParamList = {
  'Trang chủ': undefined;
  'Hồ sơ': undefined;
  'Tiện ích': undefined;
  'Chat': undefined;
  'Menu': undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        <Stack.Screen name="Tìm kiếm" component={SearchScreen} />
        <Stack.Screen name="Công việc" component={JobScreen} />
        <Stack.Screen name="Việc đã lưu lại" component={SavedJobsScreen} />
        <Stack.Screen name="Việc đã ứng tuyển" component={AppliedJobsScreen} />

        <Stack.Screen name="Cập nhập tên" component={JobScreen} />
        <Stack.Screen name="Cập nhập mật khẩu" component={JobScreen} />
        <Stack.Screen name="Cập nhập email" component={JobScreen} />
        <Stack.Screen name="Cập nhập số điện thoại" component={JobScreen} />
        <Stack.Screen name="Cập nhập địa chỉ" component={JobScreen} />
        <Stack.Screen name="Cập nhập giới tính" component={JobScreen} />
        <Stack.Screen name="Cập nhập ngày sinh" component={JobScreen} />
        <Stack.Screen name="Cập nhập ảnh đại diện" component={JobScreen} />
        <Stack.Screen name="Cập nhập địa điểm làm việc" component={JobScreen} />
        <Stack.Screen name="Cập nhập lương hiện tại" component={JobScreen} />
        <Stack.Screen name="Cập nhập lương mong muốn" component={JobScreen} />
        <Stack.Screen name="Cập nhập nơi làm việc" component={JobScreen} />
        <Stack.Screen name="Cập nhập trình độ học vấn" component={JobScreen} />
        <Stack.Screen name="Cập nhập tình trạng tìm việc" component={JobScreen} />
        <Stack.Screen name="Cập nhập giới thiệu bản thân" component={JobScreen} />

        <Stack.Screen name="Cập nhập quá trình học tập" component={JobScreen} />
        <Stack.Screen name="Cập nhập trình độ ngôn ngữ" component={JobScreen} />
        <Stack.Screen name="Cập nhập kinh nghiệm làm việc" component={JobScreen} />
        <Stack.Screen name="Cập nhập chứng chỉ" component={JobScreen} />
        <Stack.Screen name="Cập nhập sở thích" component={JobScreen} />
        <Stack.Screen name="Cập nhập kĩ năng chuyên môn" component={JobScreen} />
        <Stack.Screen name="Cập nhập kĩ năng mềm" component={JobScreen} />
        <Stack.Screen name="Cập nhập địa điểm mong muốn" component={JobScreen} />
        <Stack.Screen name="Cập nhập tệp đính kèm" component={JobScreen} />

        
      </Stack.Navigator>

    </NavigationContainer>
  );
}