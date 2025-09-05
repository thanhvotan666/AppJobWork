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
import { AppliedJobsScreen } from './screens/menu/AppliedJobsScreen';
import { SavedJobsScreen } from './screens/menu/SavedJobsScreen';
import EditNameScreen from './screens/edit-user/EditName';
import EditPhoneScreen from './screens/edit-user/EditPhone';
import EditAddressScreen from './screens/edit-user/EditAddress';
import EditCurrentSalary from './screens/edit-user/EditCurrentSalary';
import EditDesiredSalary from './screens/edit-user/EditDesiredSalary';
import EditDateOfBirthScreen from './screens/edit-user/EditDateOfBirth';
import EditSexScreen from './screens/edit-user/EditSex';
import EditJobSearchStatusScreen from './screens/edit-user/EditJobSearchStatus';
import EditPositionScreen from './screens/edit-user/EditPosition';
import EditDegreeScreen from './screens/edit-user/EditDegree';
import EditIntroduceScreen from './screens/edit-user/EditIntroduce';
import EditDesiredLocationScreen from './screens/edit-user/EditDesiredLocation';
import ChangePasswordScreen from './screens/ChangePassword';
import EditSoftSkillsScreen from './screens/edit-user/EditSoftSkills';
import EditLanguagesScreen from './screens/edit-user/EditLanguages';
import EditHobbiesScreen from './screens/edit-user/EditHobbies';
import EditDesiredLocationsScreen from './screens/edit-user/EditDesiredLocations';
import EditProfessionalSkillsScreen from './screens/edit-user/EditProfessinalSkills';
import { NearJobsScreen } from './screens/menu/NearJobsScreen';
import { IntroducedJobsScreen } from './screens/menu/IntroducedJobsScreen';
export type RootStackParamList = {
  MainTabs: undefined;
  'Tìm kiếm': undefined;
  'Công việc': {id: number};
  'Việc đã lưu lại': undefined;
  'Việc đã ứng tuyển': undefined;
  'Việc gần bạn': undefined;
  'Việc được giới thiệu': undefined;
  
  'Đổi mật khẩu': undefined;

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
  'Cập nhập vị trí': undefined;
  'Cập nhập nơi mong muốn': undefined;
  'Cập nhập trạng thái tìm việc': undefined;
  
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
        <Stack.Screen name="Việc gần bạn" component={NearJobsScreen} />
        <Stack.Screen name="Việc được giới thiệu" component={IntroducedJobsScreen} />


        <Stack.Screen name="Cập nhập tên" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập vị trí" component={EditPositionScreen} />
        <Stack.Screen name="Cập nhập mật khẩu" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập email" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập số điện thoại" component={EditPhoneScreen} />
        <Stack.Screen name="Cập nhập địa chỉ" component={EditAddressScreen} />
        <Stack.Screen name="Cập nhập giới tính" component={EditSexScreen} />
        <Stack.Screen name="Cập nhập ngày sinh" component={EditDateOfBirthScreen} />
        <Stack.Screen name="Cập nhập ảnh đại diện" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập địa điểm làm việc" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập lương hiện tại" component={EditCurrentSalary} />
        <Stack.Screen name="Cập nhập lương mong muốn" component={EditDesiredSalary} />

        <Stack.Screen name="Cập nhập trình độ học vấn" component={EditDegreeScreen} />
        <Stack.Screen name="Cập nhập giới thiệu bản thân" component={EditIntroduceScreen} />
        <Stack.Screen name="Cập nhập nơi mong muốn" component={EditDesiredLocationScreen} />
        <Stack.Screen name="Cập nhập trạng thái tìm việc" component={EditJobSearchStatusScreen} />
        
        <Stack.Screen name="Cập nhập quá trình học tập" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập trình độ ngôn ngữ" component={EditLanguagesScreen} />
        <Stack.Screen name="Cập nhập kinh nghiệm làm việc" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập chứng chỉ" component={EditNameScreen} />
        <Stack.Screen name="Cập nhập sở thích" component={EditHobbiesScreen} />
        <Stack.Screen name="Cập nhập kĩ năng chuyên môn" component={EditProfessionalSkillsScreen} />
        <Stack.Screen name="Cập nhập kĩ năng mềm" component={EditSoftSkillsScreen} />
        <Stack.Screen name="Cập nhập địa điểm mong muốn" component={EditDesiredLocationsScreen} />
        <Stack.Screen name="Cập nhập tệp đính kèm" component={EditNameScreen} />

        <Stack.Screen name="Đổi mật khẩu" component={ChangePasswordScreen} />

        
      </Stack.Navigator>

    </NavigationContainer>
  );
}